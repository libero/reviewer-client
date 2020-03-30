import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { CoverLetter, FileUpload, MultiFileUpload } from '../../ui/molecules';
import { FileState } from '../../ui/molecules/MultiFileUpload';
import { saveFilesPageMutation, uploadManuscriptMutation, uploadSupportingFileMutation } from '../graphql';
import { AutoSaveDecorator } from '../utils/autosave-decorator';
import { Submission } from '../types';
import { ExecutionResult } from 'graphql';

//TODO: these should live in config
const allowedManuscriptFileTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
];
const maxSupportingFiles = 10;

const maxFileSize = 104857600;

interface Props {
    initialValues?: Submission;
}

const FileDetailsForm = ({ initialValues }: Props): JSX.Element => {
    const { files } = initialValues;
    const { register, watch } = useForm({
        defaultValues: {
            coverLetter: files ? files.coverLetter : '',
        },
    });

    const [saveCallback] = useMutation(saveFilesPageMutation);

    const [uploadManuscriptFile] = useMutation(uploadManuscriptMutation);
    const [uploadSupportingFile] = useMutation(uploadSupportingFileMutation);

    // this might be better placed in its own hook or wrapper component so changes don't cause whole page re-render.
    // TODO: Manual Test - when done check that the state is not overwritten when re-rendered.
    const [manuscriptStatus, setManuscriptStatus] = useState<{
        fileStored?: {};
        uploadInProgress?: {};
        error?: 'multiple' | 'validation' | 'server';
    }>({
        fileStored: {
            fileName: files && files.manuscriptFile ? files.manuscriptFile.filename : undefined,
            previewLink: files && files.manuscriptFile ? files.manuscriptFile.url : undefined,
        },
    });

    const getInitialSupportingFiles = (): FileState[] => {
        if (!files || !files.supportingFiles) return [];
        return files.supportingFiles.map(file => ({
            fileStored: {
                fileName: file.filename,
            },
        }));
    };
    const [supportingFilesStatus, setSupportingFilesStatus] = useState<FileState[]>(getInitialSupportingFiles());

    const [supportingUploadDisabled, setSupportingUploadDisabled] = useState<boolean>(false);

    /*
interface FileList {
    readonly length: number;
    item(index: number): File | null;
    [index: number]: File;
} */
    function* fileUploadInitializer(
        fileToStore: { file: File; id: string }[],
    ): Generator<{ uploadPromise: Promise<ExecutionResult>; itemId: string }> {
        for (let fileIndex = 0; fileIndex < fileToStore.length; ) {
            yield {
                uploadPromise: uploadSupportingFile({
                    variables: {
                        id: initialValues.id,
                        file: fileToStore[fileIndex].file,
                        fileSize: fileToStore[fileIndex].file.size,
                    },
                }),
                itemId: fileToStore[fileIndex].id,
            };
            fileIndex += 1;
        }
    }

    // fileUploadInitializer - Generator function that iterates over the file list - starting the upload process.
    // uploadSupportingFiles - This is responsible for iterating over the list (using the generator) and
    //                           maintaining the state of the files.

    const uploadSupportingFiles = (filesToStore: { file: File; id: string }[], localFilesStatus: FileState[]): void => {
        const iterator = fileUploadInitializer(filesToStore);

        const loop = (result: IteratorResult<{ uploadPromise: Promise<ExecutionResult>; itemId: string }>): void => {
            if (result.done) {
                setSupportingUploadDisabled(false);
            } else {
                result.value.uploadPromise.then(() => {
                    const stateClone = [...localFilesStatus];

                    const thisFilesIndex = localFilesStatus.findIndex(
                        (state: FileState) =>
                            state.uploadInProgress && state.uploadInProgress.id === result.value.itemId,
                    );

                    stateClone[thisFilesIndex] = {
                        fileStored: {
                            fileName: stateClone[thisFilesIndex].uploadInProgress.fileName,
                        },
                    };
                    setSupportingFilesStatus(stateClone);
                    loop(iterator.next());
                });
            }
        };
        loop(iterator.next());
    };

    const onSupportingFilesUpload = (filesList: FileList): void => {
        const filesListArray = Array.prototype.slice.call(filesList);
        const filesStoredCount = supportingFilesStatus.filter(fileStatus => !fileStatus.error).length;
        // disable upload while uploading
        setSupportingUploadDisabled(true);

        let trimmedFilesArray = filesListArray;
        if (filesListArray.length + filesStoredCount > maxSupportingFiles) {
            trimmedFilesArray = filesListArray.slice(0, maxSupportingFiles - filesStoredCount);
        }

        const filesToStore = trimmedFilesArray.map((file: File) => ({
            file,
            id: new Date().toISOString(),
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
        // create a queue of individual uploadSupportingFile requests to be executed synchronously.
        // call upload mutation
        // .then set files to returned successful files
        // .catch set files to error state
    };

    const onManuscriptUpload = (filesList: File[]): void => {
        if (!allowedManuscriptFileTypes.includes(filesList[0].type) || filesList[0].size > maxFileSize) {
            setManuscriptStatus({ error: 'validation' });
            return;
        }

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
            })
            .catch(() => {
                setManuscriptStatus({ error: 'server' });
            });
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
    };

    useEffect(() => {
        AutoSaveDecorator(onSave);
    }, [coverLetter]);

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
            <FileUpload onUpload={onManuscriptUpload} state={manuscriptStatus} />
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
                    onDelete={(): void => {}}
                    files={supportingFilesStatus}
                    disableUpload={supportingUploadDisabled}
                />
            </div>
        </div>
    );
};

export default FileDetailsForm;
