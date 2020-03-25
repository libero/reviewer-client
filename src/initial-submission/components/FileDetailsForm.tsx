import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { CoverLetter, FileUpload, MultiFileUpload } from '../../ui/molecules';
import { FileState } from '../../ui/molecules/MultiFileUpload';
import { saveFilesPageMutation, uploadManuscriptMutation } from '../graphql';
import { AutoSaveDecorator } from '../utils/autosave-decorator';
import { Submission } from '../types';

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
    const { register, watch } = useForm({
        defaultValues: {
            coverLetter: initialValues.files ? initialValues.files.coverLetter : '',
        },
    });

    const [saveCallback] = useMutation(saveFilesPageMutation);

    const [uploadManuscriptFile] = useMutation(uploadManuscriptMutation);

    // this might be better placed in its own hook or wrapper component so changes don't cause whole page rerender
    const [manuscriptStatus, setManuscriptStatus] = useState<{
        fileStored?: {};
        uploadInProgress?: {};
        error?: 'multiple' | 'validation' | 'server';
    }>({});
    //TODO: We should set initialValueshere, not in useEffect.

    const getInitialSupportigFiles = (): FileState[] => {
        if (!initialValues.files || !initialValues.files.supportingFiles) return [];
        return initialValues.files.supportingFiles.map(file => ({
            fileStored: {
                fileName: file.filename,
            },
        }));
    };
    const [supportingFilesStatus, setSupportingFilesStatus] = useState<FileState[]>(getInitialSupportigFiles());

    const [supportingUploadDisabled, setSupportingUploadDisabled] = useState<boolean>(false);

    useEffect(() => {
        if (initialValues.files && initialValues.files.manuscriptFile) {
            setManuscriptStatus({
                fileStored: {
                    fileName: initialValues.files.manuscriptFile.filename,
                    previewLink: initialValues.files.manuscriptFile.url,
                },
            });
        }
    }, []);

    const onSupportingFileUpload = (files: FileList): void => {
        const filesListArray = Array.prototype.slice.call(files);
        const filesStoredCount = supportingFilesStatus.filter(fileStatus => !fileStatus.error).length;
        // disable upload while uploading
        setSupportingUploadDisabled(true);

        let filesToStore = filesListArray;
        if (filesListArray.length + filesStoredCount > maxSupportingFiles) {
            filesToStore = filesListArray.slice(0, maxSupportingFiles - filesStoredCount);
        }

        setSupportingFilesStatus([
            ...supportingFilesStatus,
            ...filesToStore.map((file: File) => ({
                uploadInProgress: {
                    progress: 0,
                    fileName: file.name,
                },
            })),
        ]);

        // call upload mutation
        // .then set files to returned successful files
        // .catch set files to error state
    };

    const onManuscriptUpload = (files: File[]): void => {
        if (!allowedManuscriptFileTypes.includes(files[0].type) || files[0].size > maxFileSize) {
            setManuscriptStatus({ error: 'validation' });
            return;
        }

        setManuscriptStatus({
            fileStored: manuscriptStatus.fileStored,
            uploadInProgress: {
                progress: 0,
                fileName: files[0].name,
            },
        });

        uploadManuscriptFile({
            variables: {
                id: initialValues.id,
                file: files[0],
                fileSize: files[0].size,
            },
        })
            .then(({ data }) => {
                const { filename: fileName, url: previewLink } = data.uploadManuscript.manuscriptFile;

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
                    onUpload={onSupportingFileUpload}
                    onDelete={(): void => {}}
                    files={supportingFilesStatus}
                    disableUpload={supportingUploadDisabled}
                />
            </div>
        </div>
    );
};

export default FileDetailsForm;
