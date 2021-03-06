import React, { useCallback, useMemo, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDropzone, DropEvent } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import UploadProgress from './UploadProgress';

type UploadErrors = 'multiple' | 'validation' | 'server' | 'empty';
type UploadInProgress = {
    progress?: number;
    fileName?: string;
};
type FileStored = {
    fileName?: string;
    previewLink?: string;
};

interface FileUploadContentProps {
    status: 'IDLE' | 'UPLOADING' | 'COMPLETE' | 'ERROR' | 'PROCESSING';
    open: () => void;
    error?: UploadErrors;
    uploadInProgress?: UploadInProgress;
    fileStored?: FileStored;
}

const FileUploadContent = ({
    status,
    open,
    error,
    uploadInProgress = {},
    fileStored = {},
}: FileUploadContentProps): JSX.Element => {
    const { t } = useTranslation('ui');
    switch (status) {
        case 'ERROR':
            return (
                <Fragment>
                    <span className="typography__body file-upload__description">
                        <span className="file-upload__error-prefix">{t('file-upload.error-pre-content')}</span>
                        {t('file-upload.error-message.' + error)} Please{' '}
                        <button onClick={open} className="typography__body--button-link">
                            {t('file-upload.error-upload')}
                        </button>
                        .
                    </span>
                    <span className="typography__small typography__small--secondary file-upload__extra">
                        {t('file-upload.error-extra.' + error)}
                        {error === 'server' ? (
                            <Link to="/contact-us" className="typography__body--link">
                                {t('file-upload.error-extra.contact-us') + '.'}
                            </Link>
                        ) : null}
                    </span>
                </Fragment>
            );
        case 'UPLOADING':
        case 'PROCESSING':
            return (
                <Fragment>
                    <span className="typography__body file-upload__description">
                        {uploadInProgress.progress === 100
                            ? t('file-upload.processing-message')
                            : t('file-upload.uploading-message')}
                        <span className="file-upload__progress-percentage">
                            {uploadInProgress.progress === 0 || uploadInProgress.progress === 100
                                ? ''
                                : `${uploadInProgress.progress}%`}
                        </span>
                    </span>

                    <span className="typography__small typography__small--secondary file-upload__extra">
                        {uploadInProgress.fileName}
                    </span>
                </Fragment>
            );
        case 'COMPLETE':
            return (
                <Fragment>
                    <span className="typography__body file-upload__description">
                        {t('file-upload.complete-prefix')}
                        <a className="typography__body--link" href={fileStored.previewLink}>
                            {t('file-upload.complete-preview')}
                        </a>
                        {t('file-upload.complete-message')}
                        <button onClick={open} className="typography__body--button-link">
                            {t('file-upload.complete-replace')}
                        </button>
                        {t('file-upload.complete-suffix')}
                    </span>
                    <span className="typography__small typography__small--secondary file-upload__extra">
                        {fileStored.fileName}
                    </span>
                </Fragment>
            );
        default:
            return (
                <Fragment>
                    <span className="typography__body file-upload__description">
                        <button onClick={open} className="typography__body--button-link">
                            {t('file-upload.idle-upload')}
                        </button>
                        {t('file-upload.idle-message')}
                    </span>{' '}
                    <span className="typography__small typography__small--secondary file-upload__extra">
                        {t('file-upload.idle-extra')}
                    </span>
                </Fragment>
            );
    }
};

interface Props {
    onUpload<T extends File>(acceptedFiles: T[], rejectedFiles: T[], event: DropEvent): void;
    state?: {
        uploadInProgress?: UploadInProgress;
        error?: UploadErrors;
        fileStored?: FileStored;
    };
    validationError?: string;
}

const FileUpload = ({ onUpload, state = {}, validationError }: Props): JSX.Element => {
    const onDrop = useCallback(onUpload, []);
    const acceptedFiles = 'application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
        onDrop,
        noClick: true,
        accept: acceptedFiles,
    });

    const status = useMemo(() => {
        if ((validationError || state.error) && !state.uploadInProgress) {
            return 'ERROR';
        }
        if (
            state.uploadInProgress &&
            (state.uploadInProgress.progress === 0 || state.uploadInProgress.progress === 100)
        ) {
            return 'PROCESSING';
        }
        if (state.uploadInProgress) {
            return 'UPLOADING';
        }
        if (state.fileStored && state.fileStored.fileName) {
            return 'COMPLETE';
        }
        return 'IDLE';
    }, [state, validationError]);

    return (
        <div className="file-upload">
            <div
                className={`file-upload__dropzone file-upload__dropzone--${status.toLowerCase()} ${
                    isDragActive ? 'file-upload__dropzone--drag-active' : ''
                }`}
                {...(status !== 'UPLOADING' && getRootProps())}
            >
                {status !== 'UPLOADING' && <input {...getInputProps()} />}
                <UploadProgress progress={state.uploadInProgress && state.uploadInProgress.progress} status={status} />
                <div className="file-upload__content">
                    <FileUploadContent
                        status={status}
                        open={open}
                        error={validationError && !state.error ? 'empty' : state.error}
                        uploadInProgress={state.uploadInProgress}
                        fileStored={state.fileStored}
                    />
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
