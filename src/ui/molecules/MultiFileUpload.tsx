import React, { useMemo, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import UploadProgress from './UploadProgress';
import Delete from '@material-ui/icons/Delete';

type UploadErrors = 'multiple' | 'validation' | 'server';
type UploadInProgress = {
    progress?: number;
    fileName?: string;
};
type FileStored = {
    fileName: string;
    id: string;
};

export type FileState = {
    uploadInProgress?: UploadInProgress;
    error?: UploadErrors;
    fileStored?: FileStored;
};

interface Props {
    files?: FileState[];
    onUpload: (files: FileList) => void;
    onDelete: (index: number) => void;
    disableUpload?: boolean;
}

interface FileItemProps extends FileState {
    onDelete: () => void;
}

const FileItem = ({ uploadInProgress, error, fileStored, onDelete }: FileItemProps): JSX.Element => {
    const { t } = useTranslation('ui');
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
            <span
                className={`typography__body multifile-upload__file-name multifile-upload__file-name--${status.toLowerCase()}`}
            >
                {status === 'COMPLETE' ? fileStored.fileName : uploadInProgress.fileName}
                {status !== 'COMPLETE' ? (
                    <span
                        className={`multifile-upload__file-status multifile-upload__file-status--${status.toLowerCase()}`}
                    >
                        {' '}
                        {status === 'UPLOADING'
                            ? uploadInProgress.progress === 0
                                ? t('multifile-upload.status-queued')
                                : `${t('multifile-upload.status-uploading')} ${uploadInProgress.progress}%`
                            : `${t(`multifile-upload.status-error.${error}`)}`}
                    </span>
                ) : null}
            </span>
            {status === 'COMPLETE' || status === 'ERROR' ? (
                <div>
                    <Delete className="multifile-upload__delete" onClick={onDelete} />
                </div>
            ) : null}
        </div>
    );
};

const MultiFileUpload = ({ files = [], onUpload, onDelete, disableUpload }: Props): JSX.Element => {
    const { t } = useTranslation('ui');
    return (
        <div className="multifile-upload">
            {files.length ? (
                <div className="multifile-upload__upload-list">
                    {files.map((file, index) => {
                        return <FileItem key={index} {...file} onDelete={(): void => onDelete(index)} />;
                    })}
                </div>
            ) : null}
            {disableUpload ? null : (
                <Fragment>
                    <label
                        id="add-computer-button"
                        htmlFor="multiFileUpload"
                        className={`multifile-upload__label ${
                            files.length ? '' : 'multifile-upload__label--no-files '
                        }typography__body--link`}
                    >
                        {files.length ? t('multifile-upload.label-files') : t('multifile-upload.label-no-files')}
                    </label>
                    <input
                        id="multiFileUpload"
                        type="file"
                        multiple={true}
                        className="multifile-upload__input"
                        onChange={(event: React.FormEvent<HTMLInputElement>): void =>
                            onUpload(event.currentTarget.files)
                        }
                    />
                </Fragment>
            )}
        </div>
    );
};

export default MultiFileUpload;
