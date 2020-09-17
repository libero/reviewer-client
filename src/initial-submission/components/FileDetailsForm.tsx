import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import Interweave from 'interweave';
import { CoverLetter, FileUpload, MultiFileUpload } from '../../ui/molecules';
import { fileUploadProgressSubscription, saveFilesPageMutation, uploadManuscriptMutation } from '../graphql';
import useAutoSave from '../hooks/useAutoSave';
import { FileDetails, UploadInProgressData } from '../types';
import useSupportingFileHook from '../hooks/useSupportingFileHook';
import { StepProps } from './SubmissionWizard';

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

const FileDetailsForm = ({ initialValues, schemaFactory, ButtonComponent, toggleErrorBar }: StepProps): JSX.Element => {
    const { t } = useTranslation('wizard-form');
    const { files } = initialValues;
    // this might be better placed in its own hook or wrapper component so changes don't cause whole page re-render.
    // TODO: Manual Test - when done check that the state is not overwritten when re-rendered.
    const [manuscriptStatus, setManuscriptStatus] = useState<{
        fileStored?: {};
        uploadInProgress?: UploadInProgress;
        error?: 'multiple' | 'validation' | 'server';
    }>({
        fileStored: {
            fileName: files && files.manuscriptFile ? files.manuscriptFile.filename : undefined,
            previewLink: files && files.manuscriptFile ? files.manuscriptFile.downloadLink : undefined,
        },
    });
    const schema = schemaFactory(t);

    const { register, watch, errors, triggerValidation, setValue } = useForm<FileDetails>({
        defaultValues: {
            coverLetter: files && files.coverLetter ? files.coverLetter : '',
            manuscriptFile:
                files && files.manuscriptFile && files.manuscriptFile.filename ? files.manuscriptFile : null,
        },
        mode: 'onBlur',
        validationSchema: schema,
    });

    register({ name: 'coverLetter', type: 'custom' });
    register({ name: 'manuscriptFile', type: 'custom' });
    register({ name: 'uploadingSupportingFiles', type: 'custom' });

    const [saveCallback] = useMutation(saveFilesPageMutation);
    const [uploadManuscriptFile] = useMutation(uploadManuscriptMutation);

    const { data: uploadProgressData, loading } = useSubscription<UploadInProgressData>(
        fileUploadProgressSubscription,
        {
            variables: { submissionId: initialValues.id },
        },
    );

    const [
        onSupportingFilesUpload,
        deleteSupportingFileCallback,
        supportingFilesStatus,
        supportingUploadDisabled,
        filesStoredCount,
    ] = useSupportingFileHook(initialValues, maxSupportingFiles, maxFileSize, uploadProgressData);

    const isUploadingSupportingFile = (): boolean =>
        uploadProgressData &&
        uploadProgressData.fileUploadProgress &&
        uploadProgressData.fileUploadProgress.type === 'SUPPORTING_FILE';

    useEffect(() => {
        if (supportingFilesStatus.length > 0 && isUploadingSupportingFile()) {
            const uploadInPogress = supportingFilesStatus.some(
                filestatus =>
                    typeof filestatus.uploadInProgress !== 'undefined' && typeof filestatus.error === 'undefined',
            );
            setValue('uploadingSupportingFiles', uploadInPogress);
            if (!uploadInPogress && errors && errors.uploadingSupportingFiles) {
                triggerValidation();
            }
        }
    }, [JSON.stringify(supportingFilesStatus)]);

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
                const { filename: fileName, downloadLink: previewLink } = data.uploadManuscript.files.manuscriptFile;
                setManuscriptStatus({
                    fileStored: {
                        fileName,
                        previewLink,
                    },
                });
                setValue('manuscriptFile', data.uploadManuscript.files.manuscriptFile, true);
            })
            .catch(() => {
                setManuscriptStatus({ error: 'server' });
            });
    };

    const coverLetter = watch('coverLetter');
    const onSave = async (): Promise<void> => {
        const vars = {
            variables: {
                id: initialValues.id,
                coverLetter,
            },
        };
        await saveCallback(vars);
    };
    useAutoSave(onSave, [coverLetter]);

    useEffect(() => {
        if (toggleErrorBar && Object.keys(errors).length === 0) {
            toggleErrorBar(false);
        }
    }, [coverLetter, manuscriptStatus, errors]);

    return (
        <div className="files-step">
            <h2 className="typography__heading typography__heading--h2 files-step__title">
                {t('files.coverletter-title')}
            </h2>
            <Interweave content={t('files.coverletter-guidance')} />
            <CoverLetter
                id="coverLetter"
                coverLetter={
                    initialValues.files && initialValues.files.coverLetter ? initialValues.files.coverLetter : ''
                }
                onChange={(val: string): void => setValue('coverLetter', val, true)}
                invalid={errors && errors.coverLetter !== undefined}
                helperText={errors && errors.coverLetter ? errors.coverLetter.message : null}
            />
            <h2 className="typography__heading typography__heading--h2 files-step__title">
                {t('files.manuscript-title')}
            </h2>
            <Interweave content={t('files.manuscript-guidance')} />
            <FileUpload
                validationError={
                    errors && errors.manuscriptFile
                        ? ((errors.manuscriptFile as unknown) as { message: string }).message
                        : undefined
                }
                onUpload={onManuscriptUpload}
                state={manuscriptStatus}
            />
            <h2 className="typography__heading typography__heading--h2 files-step__title">
                {t('files.supporting-title')}
            </h2>
            <Interweave content={t('files.supporting-guidance')} />
            <div className="supporting-files">
                <MultiFileUpload
                    onUpload={onSupportingFilesUpload}
                    onDelete={deleteSupportingFileCallback}
                    files={supportingFilesStatus}
                    disableDelete={supportingUploadDisabled}
                    disableUpload={supportingUploadDisabled || filesStoredCount === maxSupportingFiles}
                    extraMessage={filesStoredCount === maxSupportingFiles && t('files.supporting-files-max')}
                />
                {errors && errors.uploadingSupportingFiles && (
                    <span className={'typography__label typography__label--helper-text typography__label--error'}>
                        {((errors.uploadingSupportingFiles as unknown) as { message: string }).message}
                    </span>
                )}
            </div>
            {ButtonComponent && <ButtonComponent saveFunction={onSave} triggerValidation={triggerValidation} />}
        </div>
    );
};

export default FileDetailsForm;
