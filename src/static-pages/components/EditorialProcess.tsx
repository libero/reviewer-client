import React from 'react';
import Interwave from 'interweave'
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const ContactUsElife = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    return (
        <div className="author-guide-content">
            <h1>{t('editorial.editorial.heading')}</h1>

            <Paragraph type="writing"><Interwave content={t('editorial.editorial.p1')} /></Paragraph>
            <Paragraph type="writing"><Interwave content={t('editorial.editorial.p2')} /></Paragraph>

            <div className="blue-box">
                <h2>{t('editorial.editorial.pre-print.heading')}</h2>
                <Paragraph type="writing">{t('editorial.editorial.pre-print.p2')}</Paragraph>
                <Paragraph type="writing"><Interwave content={t('editorial.editorial.pre-print.p2')} /></Paragraph>
            </div>

            <Paragraph type="writing"><Interwave content={t('editorial.editorial.p3')} /></Paragraph>
            <Paragraph type="writing"><Interwave content={t('editorial.editorial.p4')} /></Paragraph>

            <div className="blue-box">
                <Paragraph type="writing"><Interwave content={t('editorial.editorial.p5')} /></Paragraph>
            </div>

            <Paragraph type="writing"><Interwave content={t('editorial.editorial.p6')} /></Paragraph>

            <h2>{t('editorial.initial-sub.heading')}</h2>
            <Paragraph type="writing"><Interwave content={t('editorial.initial-sub.p1')} /></Paragraph>
            <ul>
                <li>{t('editorial.initial-sub.bullet1')}</li>
                <li>{t('editorial.initial-sub.bullet2')}</li>
                <li>{t('editorial.initial-sub.bullet3')}</li>
            </ul>

            <h2>{t('editorial.full-sub.heading')}</h2>
            <Paragraph type="writing"><Interwave content={t('editorial.full-sub.p1')} /></Paragraph>

            <h2>{t('editorial.revised-sub.heading')}</h2>
            <Paragraph type="writing"><Interwave content={t('editorial.revised-sub.p1')} /></Paragraph>

            <h2 id="scoop_protection">{t('editorial.faqs.heading')}</h2>

            <h3>{t('editorial.faqs.question1')}</h3>
            <Paragraph type="writing">{t('editorial.faqs.answer1')}</Paragraph>

            <h3>{t('editorial.faqs.question2')}</h3>
            <Paragraph type="writing"><Interwave content={t('editorial.faqs.answer2')} /></Paragraph>

            <h3>{t('editorial.faqs.question3')}</h3>
            <Paragraph type="writing">{t('editorial.faqs.answer3')}</Paragraph>

            <h3>{t('editorial.faqs.question4')}</h3>
            <Paragraph type="writing">{t('editorial.faqs.answer4')}</Paragraph>

            <h3>{t('editorial.faqs.question5')}</h3>
            <Paragraph type="writing">{t('editorial.faqs.answer5')}</Paragraph>

            <h3>{t('editorial.faqs.question6')}</h3>
            <Paragraph type="writing">{t('editorial.faqs.answer6')}</Paragraph>

            <h3>{t('editorial.faqs.question7')}</h3>
            <Paragraph type="writing">{t('editorial.faqs.answer7')}</Paragraph>

            <h3>{t('editorial.faqs.question8')}</h3>
            <Paragraph type="writing">{t('editorial.faqs.answer8')}</Paragraph>

            <div className="blue-box">
                <Paragraph type="writing"><Interwave content={t('editorial.faqs.p1')} /></Paragraph>
            </div>
        </div>
    );
};

export default ContactUsElife;
