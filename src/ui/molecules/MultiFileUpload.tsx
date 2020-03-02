import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import UploadProgress from './UploadProgress';
import Delete from '@material-ui/icons/Delete';

type UploadErrors = 'multiple' | 'size' | 'server';
type UploadInProgress = {
    progress?: number;
    fileName?: string;
};
type FileStored = {
    fileName?: string;
    previewLink?: string;
};

type FileState = {
    uploadInProgress?: UploadInProgress;
    error?: UploadErrors;
    fileStored?: FileStored;
};

interface Props {
    files?: FileState[];
}

const FileItem = ({ uploadInProgress, error, fileStored }: FileState) => {
    const status = useMemo(() => {
        if (error && status !== 'ERROR') {
            return 'ERROR';
        }
        if (uploadInProgress && status !== 'UPLOADING') {
            return 'UPLOADING';
        }
        if (fileStored && status !== 'COMPLETE') {
            return 'COMPLETE';
        }
        if (status !== 'IDLE') {
            return 'IDLE';
        }
    }, [uploadInProgress, error, fileStored]);

    return (
        <div className="multifile-upload__upload-list-item">
            <div className="multifile-upload__progress">
                <UploadProgress status={status} progress={uploadInProgress && uploadInProgress.progress} small />
            </div>
            <span className={`multfile-upload__file-name--${status.toLowerCase()}`}>
                {status === 'COMPLETE' ? fileStored.fileName : uploadInProgress.fileName}
                {status !== 'COMPLETE' ? (
                    <span
                        className={`multfile-upload__file-status typography__small typography__small--secondary multfile-upload__file-status--${status.toLowerCase()}`}
                    >
                        {' '}
                        - {status === 'UPLOADING' ? `uploading ${uploadInProgress.progress}%` : 'Error.'}
                    </span>
                ) : null}
            </span>
            <div>
                <Delete className="multifile-upload__delete" />
            </div>
        </div>
    );
};

const MultiFileUpload = ({ files = [] }: Props): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className="multifile-upload">
            <div className="multifile-upload__upload-list">
                {files.map((file, index) => {
                    return <FileItem key={index} {...file} />;
                })}
            </div>
            <label
                id="add-computer-button"
                htmlFor="multiFileUpload"
                className="multifile-upload__label typography__body--link"
            >
                {files.length ? t('ui:multifile-upload:label-files') : t('ui:multifile-upload:label-no-files')}
            </label>
            <input id="multiFileUpload" type="file" multiple={true} className="multifile-upload__input" />
        </div>
    );
};

export default MultiFileUpload;
