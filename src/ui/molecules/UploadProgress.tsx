import React from 'react';
import { default as UploadIcon } from '../atoms/UploadIcon';
import Check from '@material-ui/icons/Check';

interface Props {
    progress?: number;
    status?: 'IDLE' | 'COMPLETE' | 'ERROR';
}
const UploadProgress = ({ progress = 0, status }: Props): JSX.Element => {
    const iconRenderer = (): JSX.Element => {
        switch (status) {
            case 'COMPLETE':
                return <Check />;
            default:
                return <UploadIcon />;
        }
    };
    return (
        <div
            className={`upload-progress progress--${progress}`}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
        >
            <div className="upload-progress__content">{iconRenderer()}</div>
        </div>
    );
};
export default UploadProgress;
