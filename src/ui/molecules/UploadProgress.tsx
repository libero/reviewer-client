import React from 'react';
import { default as UploadIcon } from '../atoms/UploadIcon';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

interface Props {
    progress?: number;
    status?: 'IDLE' | 'UPLOADING' | 'PROCESSING' | 'COMPLETE' | 'ERROR';
    small?: boolean;
}
const UploadProgress = ({ progress = 0, status = 'IDLE', small }: Props): JSX.Element => {
    const iconRenderer = (): JSX.Element => {
        switch (status) {
            case 'COMPLETE':
                return <Check className="upload-progress__icon--success" />;
            case 'ERROR':
                return <Close className="upload-progress__icon--error" />;
            case 'PROCESSING':
                return null;
            default:
                return <UploadIcon />;
        }
    };
    const className = `upload-progress upload-progress--${status.toLowerCase()} progress--${
        status === 'PROCESSING' ? 25 : status === 'UPLOADING' ? progress : status === 'IDLE' ? 0 : 100
    } ${small ? 'upload-progress--small' : ''}`;

    return (
        <div
            className={className}
            role="progressbar"
            aria-busy={status === 'UPLOADING'}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
        >
            <div className="upload-progress__content">{iconRenderer()}</div>
        </div>
    );
};
export default UploadProgress;
