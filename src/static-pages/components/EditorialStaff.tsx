import React from 'react';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const EditorialStaff = (): JSX.Element => {
    const { t } = useTranslation('contact-us');

    return (
        <div className="contact-us-content">
            <h1>{t('editor.heading')}</h1>

            <Paragraph type="writing">{t('editor.paragraph-1')}</Paragraph>

            <div className="editor-grid">
                <div className="editor-grid-item">
                    <img alt={`${t('editor.editor-1.name')}'s profile image`} src={t('editor.editor-1.photo')} />
                    <p>{t('editor.editor-1.name')}</p>
                    <p>{t('editor.editor-1.position')}</p>
                    <p>{t('editor.editor-1.number')}</p>
                </div>

                <div className="editor-grid-item">
                    <img alt={`${t('editor.editor-2.name')}'s profile image`} src={t('editor.editor-2.photo')} />
                    <p>{t('editor.editor-2.name')}</p>
                    <p>{t('editor.editor-2.position')}</p>
                    <p>{t('editor.editor-2.number')}</p>
                </div>

                <div className="editor-grid-item">
                    <img alt={`${t('editor.editor-3.name')}'s profile image`} src={t('editor.editor-3.photo')} />
                    <p>{t('editor.editor-3.name')}</p>
                    <p>{t('editor.editor-3.position')}</p>
                    <p>{t('editor.editor-3.number')}</p>
                </div>

                <div className="editor-grid-item">
                    <img alt={`${t('editor.editor-4.name')}'s profile image`} src={t('editor.editor-4.photo')} />
                    <p>{t('editor.editor-4.name')}</p>
                    <p>{t('editor.editor-4.position')}</p>
                    <p>{t('editor.editor-4.number')}</p>
                </div>

                <div className="editor-grid-item">
                    <img alt={`${t('editor.editor-5.name')}'s profile image`} src={t('editor.editor-5.photo')} />
                    <p>{t('editor.editor-5.name')}</p>
                    <p>{t('editor.editor-5.position')}</p>
                    <p>{t('editor.editor-5.number')}</p>
                </div>

                <div className="editor-grid-item">
                    <img alt={`${t('editor.editor-6.name')}'s profile image`} src={t('editor.editor-6.photo')} />
                    <p>{t('editor.editor-6.name')}</p>
                    <p>{t('editor.editor-6.position')}</p>
                    <p>{t('editor.editor-6.number')}</p>
                </div>
            </div>
        </div>
    );
};

export default EditorialStaff;
