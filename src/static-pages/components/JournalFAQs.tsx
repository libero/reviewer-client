import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';

const JournalFAQs = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    return (
        <div className="static-page__content">
            <h1 className="typography__heading--h1">{t('journal-faqs.heading')}</h1>

            <h2 id="scoop_protection">{t('journal-faqs.scope.heading')}</h2>

            <h3>{t('journal-faqs.scope.question1')}</h3>
            <Paragraph type="writing">{t('journal-faqs.scope.answer1')}</Paragraph>

            <h3>{t('journal-faqs.scope.question2')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.scope.answer2')} />
            </Paragraph>

            <h3>{t('journal-faqs.scope.question3')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.scope.answer3')} />
            </Paragraph>

            <h3>{t('journal-faqs.scope.question4')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.scope.answer4')} />
            </Paragraph>

            <h3>{t('journal-faqs.scope.question5')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.scope.answer5')} />
            </Paragraph>

            <h3>{t('journal-faqs.scope.question6')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.scope.answer6')} />
            </Paragraph>

            <h3>{t('journal-faqs.scope.question7')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.scope.answer7')} />
            </Paragraph>

            <h3>{t('journal-faqs.scope.question8')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.scope.answer8')} />
            </Paragraph>

            <h2 id="scoop_protection">{t('journal-faqs.general.heading')}</h2>

            <h3>{t('journal-faqs.general.question1')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.general.answer1')} />
            </Paragraph>

            <h3>{t('journal-faqs.general.question2')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.general.answer2')} />
            </Paragraph>

            <h3>{t('journal-faqs.general.question3')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.general.answer3')} />
            </Paragraph>

            <h3>{t('journal-faqs.general.question4')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.general.answer4')} />
            </Paragraph>

            <h3>{t('journal-faqs.general.question5')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.general.answer5')} />
            </Paragraph>

            <h3>{t('journal-faqs.general.question6')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.general.answer6')} />
            </Paragraph>

            <h3>{t('journal-faqs.general.question7')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.general.answer7')} />
            </Paragraph>

            <h3>{t('journal-faqs.general.question8')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.general.answer8')} />
            </Paragraph>

            <h3>{t('journal-faqs.general.question9')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.general.answer9')} />
            </Paragraph>

            <h3>{t('journal-faqs.general.question10')}</h3>
            <Paragraph type="writing">
                <Interweave content={t('journal-faqs.general.answer10')} />
            </Paragraph>
        </div>
    );
};

export default JournalFAQs;
