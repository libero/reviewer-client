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
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="manuscript-upload">
            <div className="manuscript-upload__dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <UploadProgress progress={progress} status={status} />
                <div className="manuscript-upload__content manuscript-upload__content--inactive">
                    <p> {t('ui:manuscript-upload.inactive-content')}</p>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
