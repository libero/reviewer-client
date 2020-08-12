import React, { useMemo, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import UploadProgress from './UploadProgress';
import Delete from '@material-ui/icons/Delete';

type UploadErrors = 'multiple' | 'validation' | 'server';
type UploadInProgress = {
    id?: string;
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
    onDelete: (fileId: string) => void;
    disableDelete?: boolean;
    disableUpload?: boolean;
    extraMessage?: string;
}

interface FileItemProps extends FileState {
    onDelete: (fileId: string) => void;
    disableDelete?: boolean;
}

const FileItem = ({ uploadInProgress, error, fileStored, onDelete, disableDelete }: FileItemProps): JSX.Element => {
    const { t } = useTranslation('ui');
    const progress = uploadInProgress ? uploadInProgress.progress : null;
    const status = useMemo(() => {
        if (error) {
            return 'ERROR';
        }
        // give us the spinner
        if (uploadInProgress && uploadInProgress.progress === null) {
            return 'IDLE';
        }
        if (uploadInProgress && uploadInProgress.progress !== null) {
            return 'UPLOADING';
        }
        if (fileStored) {
            return 'COMPLETE';
        }
        return 'IDLE';
    }, [progress]);

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
                        {status === 'UPLOADING' || status === 'IDLE'
                            ? uploadInProgress.progress === null
                                ? t('multifile-upload.status-queued')
                                : `${t('multifile-upload.status-uploading')} ${uploadInProgress.progress}%`
                            : `${t(`multifile-upload.status-error.${error}`)}`}
                    </span>
                ) : null}
            </span>
            {!disableDelete && (status === 'COMPLETE' || status === 'ERROR') ? (
                <div>
                    <Delete
                        className="multifile-upload__delete"
                        onClick={(): void => onDelete(fileStored ? fileStored.id : uploadInProgress.id)}
                    />
                </div>
            ) : null}
        </div>
    );
};

const MultiFileUpload = ({
    files = [],
    onUpload,
    onDelete,
    disableUpload,
    disableDelete,
    extraMessage,
}: Props): JSX.Element => {
    const { t } = useTranslation('ui');
    return (
        <div className="multifile-upload">
            {files.length ? (
                <div className="multifile-upload__upload-list">
                    {files.map((file, index) => {
                        return <FileItem key={index} {...file} onDelete={onDelete} disableDelete={disableDelete} />;
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
            {extraMessage ? <span className="multifile-upload__extra-message">{extraMessage}</span> : null}
        </div>
    );
};

export default MultiFileUpload;
