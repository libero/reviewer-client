import React, { useCallback } from 'react';
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
                className={`file-upload__dropzone ${isDragActive ? 'file-upload__dropzone--drag-active' : ''}`}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <UploadProgress progress={progress} status={status} />
                <div className="file-upload__content">
                    <p>
                        <button onClick={open} className="typography typography__body--button-link">
                            {t('ui:file-upload.idle-upload')}
                        </button>
                        {t('ui:file-upload.idle-content')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
