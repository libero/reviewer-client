import React from 'react';
import Interwave from 'interweave'
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const FullSubmission = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    return (
        <div className="author-guide-content">
            <h1>{t('full-submission.heading')}</h1>

            <Paragraph type="writing"><Interwave content={t('full-submission.p1')} /></Paragraph>

            <h2>{t('full-submission.files.heading')}</h2>

            <Paragraph type="writing"><Interwave content={t('full-submission.files.p1')} /></Paragraph>
            <Paragraph type="writing"><Interwave content={t('full-submission.files.p2')} /></Paragraph>
            <Paragraph type="writing"><Interwave content={t('full-submission.files.p3')} /></Paragraph>

            <ol>
                <li>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.reporting.heading')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.reporting.p1')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.reporting.p2')} /></Paragraph>
                </li>

                <li>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.figures.heading')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.figures.p1')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.figures.p2')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.figures.p3')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.figures.p4')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.figures.p5')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.figures.p6')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.figures.p7')} /></Paragraph>
                </li>

                <li>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.data.heading')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.data.p1')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.data.p2')} /></Paragraph>
                </li>

                <li>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.file.heading')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.file.p1')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.file.p2')} /></Paragraph>
                </li>

                <li>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.code.heading')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.code.p1')} /></Paragraph>
                </li>

                <li>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.standards.heading')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.standards.p1')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.standards.p2')} /></Paragraph>
                </li>

                <li>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.supplementary-files.heading')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.supplementary-files.p1')} /></Paragraph>
                </li>

                <li>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.related.heading')} /></Paragraph>
                    <Paragraph type="writing"><Interwave content={t('full-submission.files.related.p1')} /></Paragraph>
                </li>
                
            </ol>


        </div>
    );
};

export default FullSubmission;
