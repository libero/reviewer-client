import React from 'react';
import { useTranslation } from 'react-i18next';
import UploadProgress from './UploadProgress';
import Delete from '@material-ui/icons/Delete';

type File = {
    fileName: string;
};

interface Props {
    files?: File[];
}
const MultiFileUpload = ({ files = [] }: Props): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className="multifile-upload">
            <div className="multifile-upload__upload-list">
                {files.map(file => {
                    return (
                        <div key={file.fileName} className="multifile-upload__upload-list-item">
                            <div className="multifile-upload__progress">
                                <UploadProgress status="COMPLETE" />
                            </div>
                            <div>{file.fileName}</div>
                            <div>
                                <Delete className="multifile-upload__delete" />
                            </div>
                        </div>
                    );
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
