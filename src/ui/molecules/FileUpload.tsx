import React, { useCallback, useMemo, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDropzone, DropEvent } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import UploadProgress from './UploadProgress';

interface Props {
    onUpload<T extends File>(acceptedFiles: T[], rejectedFiles: T[], event: DropEvent): void;
    state?: {
        uploadInProgress?: {
            progress: number;
            fileName: string;
        };
        error?: 'multiple' | 'size' | 'server';
        fileStored?: {
            fileName: string;
            previewLink: string;
        };
        // todo: update fileStored as object with filename and preview link
    };
}

const FileUpload: React.FC<Props> = ({ onUpload, state }: Props): JSX.Element => {
    const { t } = useTranslation();
    const onDrop = useCallback(onUpload, []);
    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ onDrop, noClick: true });

    const status = useMemo(() => {
        if (state.error && status !== 'ERROR') {
            return 'ERROR';
        }
        if (state.uploadInProgress && status !== 'UPLOADING') {
            return 'UPLOADING';
        }
        if (state.fileStored && status !== 'COMPLETE') {
            return 'COMPLETE';
        }
        if (status !== 'IDLE') {
            return 'IDLE';
        }
    }, [state]);

    return (
        <div className="file-upload">
            <div
                className={`file-upload__dropzone file-upload__dropzone--${status.toLowerCase()} ${
                    isDragActive ? 'file-upload__dropzone--drag-active' : ''
                }`}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <UploadProgress progress={state.uploadInProgress && state.uploadInProgress.progress} status={status} />
                <div className="file-upload__content">
                    {status === 'ERROR' ? (
                        <Fragment>
                            <span className="typography__body file-upload__description">
                                <span className="file-upload__error-prefix">
                                    {t('ui:file-upload.error-pre-content')}
                                </span>
                                {t('ui:file-upload.error-message.' + state.error)} Please{' '}
                                <button onClick={open} className="typography__body--button-link">
                                    {t('ui:file-upload.error-upload')}
                                </button>
                                .
                            </span>
                            <span className="typography__small typography__small--secondary file-upload__extra">
                                {t('ui:file-upload.error-extra.' + state.error)}
                                {state.error === 'server' ? (
                                    <Link to="/contact-us" className="typography__body--link">
                                        {t('ui:file-upload.error-extra.contact-us') + '.'}
                                    </Link>
                                ) : null}
                            </span>
                        </Fragment>
                    ) : status === 'UPLOADING' ? (
                        <Fragment>
                            <span className="typography__body file-upload__description">
                                {t('ui:file-upload.uploading-message')}
                                <span className="file-upload__progress-percentage">
                                    {state.uploadInProgress ? state.uploadInProgress.progress : 0}%
                                </span>
                            </span>
                            <span className="typography__small typography__small--secondary file-upload__extra">
                                {state.uploadInProgress.fileName}
                            </span>
                        </Fragment>
                    ) : status === 'COMPLETE' ? (
                        <Fragment>
                            <span className="typography__body file-upload__description">
                                {t('ui:file-upload.complete-prefix')}
                                <a className="typography__body--link" href={state.fileStored.previewLink}>
                                    {t('ui:file-upload.complete-preview')}
                                </a>
                                {t('ui:file-upload.complete-message')}
                                <button onClick={open} className="typography__body--button-link">
                                    {t('ui:file-upload.complete-replace')}
                                </button>
                                {t('ui:file-upload.complete-suffix')}
                            </span>
                            <span className="typography__small typography__small--secondary file-upload__extra">
                                {state.fileStored.fileName}
                            </span>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <span className="typography__body file-upload__description">
                                <button onClick={open} className="typography__body--button-link">
                                    {t('ui:file-upload.idle-upload')}
                                </button>
                                {t('ui:file-upload.idle-message')}
                            </span>{' '}
                            <span className="typography__small typography__small--secondary file-upload__extra">
                                {t('ui:file-upload.idle-extra')}
                            </span>
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
