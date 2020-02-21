import React from 'react';
import { default as UploadIcon } from '../atoms/UploadIcon';

interface Props {
    progress?: number;
}
const UploadProgress = ({ progress = 50 }: Props): JSX.Element => {
    document.documentElement.style.setProperty('--progress', progress.toString());
    return (
        <div>
            <progress className="upload-progress" value={progress} max={100} />
        </div>
    );
};
export default UploadProgress;
