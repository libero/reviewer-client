import React, { useCallback, Fragment } from 'react';
import { useDropzone, DropEvent } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import UploadProgress from './UploadProgress';

interface Props {
    onUpload<T extends File>(acceptedFiles: T[], rejectedFiles: T[], event: DropEvent): void;
    progress?: number;
    status?: 'IDLE' | 'UPLOADING' | 'COMPLETE' | 'ERROR';
}

const FileUpload: React.FC<Props> = ({ onUpload, progress, status }: Props): JSX.Element => {
    const { t } = useTranslation();
    const onDrop = useCallback(onUpload, []);
    const { getRootProps, getInputProps, open, isDragActive } = useDropzone({ onDrop, noClick: true });

    return (
        <div className="file-upload">
            <div
                className={`file-upload__dropzone file-upload__dropzone--${status.toLowerCase()} ${
                    isDragActive ? 'file-upload__dropzone--drag-active' : ''
                }`}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <UploadProgress progress={progress} status={status} />
                <div className="file-upload__content">
                    <span className="typography__body file-upload__description">
                        {status === 'ERROR' ? (
                            <Fragment>
                                <span className="file-upload__error-prefix">
                                    {t('ui:file-upload.error-pre-content')}
                                </span>
                                Some dynamic message relating to error state. Please{' '}
                                <button onClick={open} className="typography__body--button-link">
                                    {t('ui:file-upload.error-upload')}
                                </button>
                                .
                            </Fragment>
                        ) : (
                            <Fragment>
                                <button onClick={open} className="typography__body--button-link">
                                    {t('ui:file-upload.idle-upload')}
                                </button>
                                {t('ui:file-upload.idle-content')}
                            </Fragment>
                        )}
                    </span>
                    <span className="typography__small typography__small--secondary file-upload__extra">
                        {t('ui:file-upload.idle-description')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
