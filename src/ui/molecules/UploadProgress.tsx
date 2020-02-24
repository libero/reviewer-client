import React from 'react';
import { default as UploadIcon } from '../atoms/UploadIcon';

interface Props {
    progress?: number;
}
const UploadProgress = ({ progress = 0 }: Props): JSX.Element => {
    return (
        <div
            className={`upload-progress progress--${progress}`}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
        >
            <div className="upload-progress__content">
                <UploadIcon />
            </div>
        </div>
    );
};
export default UploadProgress;
