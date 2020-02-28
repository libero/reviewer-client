import React from 'react';
import { useTranslation } from 'react-i18next';
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
