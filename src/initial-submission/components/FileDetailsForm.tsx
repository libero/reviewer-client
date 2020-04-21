import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { CoverLetter, FileUpload, MultiFileUpload } from '../../ui/molecules';
import { FileState } from '../../ui/molecules/MultiFileUpload';
import {
    deleteSupportingFileMutation,
    fileUploadProgressSubscription,
    getSubmissionQuery,
    saveFilesPageMutation,
    uploadManuscriptMutation,
    uploadSupportingFileMutation,
} from '../graphql';
import useAutoSave from '../hooks/useAutoSave';
import { File as ReviewerFile, Submission } from '../types';
import { v4 } from 'uuid';

//TODO: these should live in config
const allowedManuscriptFileTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
];
const maxSupportingFiles = 10;

const maxFileSize = 104857600;

type UploadInProgress = {
    progress?: number;
    fileName?: string;
};

interface Props {
    initialValues?: Submission;
    setIsSaving?: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileDetailsForm = ({ initialValues, setIsSaving }: Props): JSX.Element => {
    const { t } = useTranslation('wizard-form');
    const [supportingUploadDisabled, setSupportingUploadDisabled] = useState<boolean>(false);
    const [manuscriptUploadDisabled, setManuscriptUploadDisabled] = useState<boolean>(false);
    const { files } = initialValues;
    const { register, watch, reset, getValues, formState } = useForm({
        defaultValues: {
            coverLetter: files ? files.coverLetter : '',
        },
    });

    useEffect(() => {
        if (!setIsSaving) {
            return;
        }
        if (formState.dirty) {
            setIsSaving(true);
        } else {
            setIsSaving(false);
        }
    }, [formState.dirty, setIsSaving]);

    useEffect(() => {
        if (!setIsSaving) {
            return;
        }
        if (supportingUploadDisabled) {
            setIsSaving(true);
        } else {
            setIsSaving(false);
        }
    }, [supportingUploadDisabled]);

    useEffect(() => {
        if (!setIsSaving) {
            return;
        }
        if (manuscriptUploadDisabled) {
            setIsSaving(true);
        } else {
            setIsSaving(false);
        }
    }, [manuscriptUploadDisabled]);

    const getInitialSupportingFiles = (): FileState[] => {
        if (!files || !files.supportingFiles) return [];
        return files.supportingFiles.map(file => ({
            fileStored: {
                fileName: file.filename,
                id: file.id,
            },
        }));
    };
    const [supportingFilesStatus, setSupportingFilesStatus] = useState<FileState[]>(getInitialSupportingFiles());
    const [saveCallback] = useMutation(saveFilesPageMutation);
    const [uploadManuscriptFile] = useMutation(uploadManuscriptMutation);
    const [uploadSupportingFile] = useMutation(uploadSupportingFileMutation);
    const [deleteSupportingFile] = useMutation(deleteSupportingFileMutation, {
        update(cache, { data: { deleteSupportingFile } }) {
            const { getSubmission } = cache.readQuery({
                query: getSubmissionQuery,
                variables: { id: initialValues.id },
            });
            getSubmission.files.supportingFiles = getSubmission.files.supportingFiles.filter(
                (file: ReviewerFile) => file.id !== deleteSupportingFile,
            );
            const newSupportingFilesStatus = supportingFilesStatus.filter(
                (file: FileState) =>
                    (file.fileStored && file.fileStored.id !== deleteSupportingFile) || !file.fileStored,
            );
            setSupportingFilesStatus(newSupportingFilesStatus);
            cache.writeQuery({
                query: getSubmissionQuery,
                data: { getSubmission: getSubmission },
            });
        },
    });

    const { data: uploadProgressData, loading } = useSubscription(fileUploadProgressSubscription, {
        variables: { submissionId: initialValues.id },
    });

    // this might be better placed in its own hook or wrapper component so changes don't cause whole page re-render.
    // TODO: Manual Test - when done check that the state is not overwritten when re-rendered.
    const [manuscriptStatus, setManuscriptStatus] = useState<{
        fileStored?: {};
        uploadInProgress?: UploadInProgress;
        error?: 'multiple' | 'validation' | 'server';
    }>({
        fileStored: {
            fileName: files && files.manuscriptFile ? files.manuscriptFile.filename : undefined,
            previewLink: files && files.manuscriptFile ? files.manuscriptFile.url : undefined,
        },
    });

    function* fileUploadInitializer(
        fileToStore: { file: File; id: string }[],
    ): Generator<{ uploadPromise: {}; itemId: string }> {
        for (let fileIndex = 0; fileIndex < fileToStore.length; ) {
            yield {
                uploadPromise: {
                    variables: {
                        id: initialValues.id,
                        file: fileToStore[fileIndex].file,
                        fileSize: fileToStore[fileIndex].file.size,
                    },
                },
                itemId: fileToStore[fileIndex].id,
            };
            fileIndex += 1;
        }
    }

    // fileUploadInitializer - Generator function that iterates over the file list - starting the upload process.
    // uploadSupportingFiles - This is responsible for iterating over the list (using the generator) and
    //                           maintaining the state of the files.

    function setSupportingFileState(
        data: ReviewerFile,
        result: IteratorResult<{ uploadPromise: {}; itemId: string }>,
        fileStates: FileState[],
    ): void {
        const thisFilesIndex = fileStates.findIndex(
            (state: FileState) => state.uploadInProgress && state.uploadInProgress.id === result.value.itemId,
        );
        fileStates[thisFilesIndex] = {
            fileStored: {
                id: data.id,
                fileName: fileStates[thisFilesIndex].uploadInProgress.fileName,
            },
        };
        setSupportingFilesStatus(fileStates);
    }

    const uploadSupportingFiles = (
        filesToStore: { file: File; id: string }[],
        newSupportedFilesList: FileState[],
    ): void => {
        const iterator = fileUploadInitializer(filesToStore);

        const loop = (result: IteratorResult<{ uploadPromise: {}; itemId: string }>, fileStates: FileState[]): void => {
            if (result.done) {
                setSupportingUploadDisabled(false);
            } else {
                //diff state and returned
                uploadSupportingFile(result.value.uploadPromise)
                    .then(data => setSupportingFileState(data.data.uploadSupportingFile, result, fileStates))
                    .then(() => loop(iterator.next(), fileStates));
            }
        };
        loop(iterator.next(), newSupportedFilesList);
    };

    useEffect(() => {
        if (
            !loading &&
            uploadProgressData &&
            uploadProgressData.fileUploadProgress !== null &&
            typeof manuscriptStatus.uploadInProgress !== 'undefined'
        ) {
            if (
                manuscriptStatus.uploadInProgress.fileName === uploadProgressData.fileUploadProgress.filename &&
                uploadProgressData.fileUploadProgress.type === 'MANUSCRIPT_SOURCE'
            ) {
                setManuscriptStatus({
                    fileStored: manuscriptStatus.fileStored,
                    uploadInProgress: {
                        ...manuscriptStatus.uploadInProgress,
                        progress: parseInt(uploadProgressData.fileUploadProgress.percentage),
                    },
                });
            }
        }
    }, [uploadProgressData, loading]);

    const filesStoredCount = useMemo(() => supportingFilesStatus.filter(fileStatus => !fileStatus.error).length, [
        supportingFilesStatus,
    ]);

    const onSupportingFilesUpload = (filesList: FileList): void => {
        const filesListArray = Array.prototype.slice.call(filesList);

        // disable upload while uploading
        setSupportingUploadDisabled(true);

        let trimmedFilesArray = filesListArray;
        if (filesListArray.length + filesStoredCount > maxSupportingFiles) {
            trimmedFilesArray = filesListArray.slice(0, maxSupportingFiles - filesStoredCount);
        }

        const filesToStore = trimmedFilesArray.map((file: File) => ({
            file,
            id: v4(),
        }));

        const newSupportingFilesStatus = [
            ...supportingFilesStatus,
            ...filesToStore.map((fileToStore: { file: File; id: string }) => ({
                uploadInProgress: {
                    progress: 0,
                    fileName: fileToStore.file.name,
                    id: fileToStore.id,
                },
            })),
        ];
        setSupportingFilesStatus(newSupportingFilesStatus);
        uploadSupportingFiles(filesToStore, newSupportingFilesStatus);
    };

    const onManuscriptUpload = (filesList: File[]): void => {
        if (!allowedManuscriptFileTypes.includes(filesList[0].type) || filesList[0].size > maxFileSize) {
            setManuscriptStatus({ error: 'validation' });
            return;
        }

        setManuscriptUploadDisabled(true);

        setManuscriptStatus({
            fileStored: manuscriptStatus.fileStored,
            uploadInProgress: {
                progress: 0,
                fileName: filesList[0].name,
            },
        });

        uploadManuscriptFile({
            variables: {
                id: initialValues.id,
                file: filesList[0],
                fileSize: filesList[0].size,
            },
        })
            .then(({ data }) => {
                const { filename: fileName, url: previewLink } = data.uploadManuscript.files.manuscriptFile;
                setManuscriptStatus({
                    fileStored: {
                        fileName,
                        previewLink,
                    },
                });
                setManuscriptUploadDisabled(false);
            })
            .catch(() => {
                setManuscriptStatus({ error: 'server' });
                setManuscriptUploadDisabled(false);
            });
    };

    const deleteSupportingFileCallback = async (fileId: string): Promise<string> => {
        const stringExecutionResult = await deleteSupportingFile({
            variables: { fileId: fileId, submissionId: initialValues.id },
        });
        return stringExecutionResult.data;
    };

    const coverLetter = watch('coverLetter');
    const onSave = (): void => {
        const vars = {
            variables: {
                id: initialValues.id,
                coverLetter,
            },
        };
        saveCallback(vars);
        if (setIsSaving) {
            reset(getValues());
        }
    };

    useAutoSave(onSave, [coverLetter]);

    return (
        <div>
            <h2 className="typography__heading typography__heading--h2 files-step__title">Your cover letter</h2>
            <span className="typography__small typography__small--secondary">
                Enter your cover letter below. Please help us evaluate your work by answering the following questions:
            </span>
            <ul className="cover-letter__list typography__small">
                <li>How will your work make others in the field think differently and move the field forward?</li>
                <li>How does your work relate to the current literature on the topic?</li>
                <li>Who do you consider to be the most relevant audience for this work?</li>
                <li>What do you think the work has achieved or not achieved?</li>
            </ul>
            <CoverLetter id="coverLetter" register={register} />
            <h2 className="typography__heading typography__heading--h2 files-step__title">Your manuscript file</h2>
            <span className="typography__small typography__small--secondary">
                Please include figures in your manuscript file. You do not need to upload figures separately.{' '}
                <a className="typography__small typography__small--link files-step__link--nested">Learn more</a>
            </span>
            <FileUpload
                onUpload={onManuscriptUpload}
                state={manuscriptStatus}
                disabledUpload={manuscriptUploadDisabled}
            />
            <h2 className="typography__heading typography__heading--h2 files-step__title">
                Supporting files (optional)
            </h2>
            <span className="typography__small typography__small--secondary">
                Any videos, audio clips or interactive files you believe will assist in the initial assessment of your
                submission should be uploaded as supporting files. You will be able to upload additional files at the
                full submission stage if necessary.
            </span>
            <div className="supporting-files">
                <MultiFileUpload
                    onUpload={onSupportingFilesUpload}
                    onDelete={deleteSupportingFileCallback}
                    files={supportingFilesStatus}
                    disableUpload={supportingUploadDisabled || filesStoredCount === maxSupportingFiles}
                    extraMessage={filesStoredCount === maxSupportingFiles && t('files.supporting-files-max')}
                />
            </div>
        </div>
    );
};

export default FileDetailsForm;
