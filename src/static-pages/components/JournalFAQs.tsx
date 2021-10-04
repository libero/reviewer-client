import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import useScrollToAnchor from '../../ui/hooks/useScrollToAnchor';

const JournalFAQs = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    useScrollToAnchor();

    return (
        <div className="static-page__content">
            <h1 id={t('journal-faqs.anchor')} className="typography__heading typography__heading--h1">
                {t('journal-faqs.heading')}
            </h1>

            <h2 id={t('journal-faqs.scoop.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-faqs.scoop.heading')}
            </h2>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question1')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer1')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question2')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer2')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question3')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer3')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question4')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer4')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question5')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer5')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question6')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer6')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question7')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer7')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question8')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer8')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question9')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer9')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question10')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer10')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question11')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer11')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question12')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer12')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question13')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer13')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question14')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer14')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question15')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer15')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.scoop.question16')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.scoop.answer16')} />
            </Paragraph>

            <h2 id={t('journal-faqs.general.anchor')} className="typography__heading typography__heading--h2">
                {t('journal-faqs.general.heading')}
            </h2>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.general.question1')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.general.answer1')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.general.question2')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.general.answer2')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.general.question3')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.general.answer3')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.general.question4')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.general.answer4')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.general.question5')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.general.answer5')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.general.question6')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.general.answer6')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.general.question7')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.general.answer7')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.general.question8')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.general.answer8')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.general.question9')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.general.answer9')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">{t('journal-faqs.general.question10')}</h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.general.answer10')} />
            </Paragraph>

            <h2
                id={t('journal-faqs.revised-submissions.anchor')}
                className="typography__heading typography__heading--h2"
            >
                {t('journal-faqs.revised-submissions.heading')}
            </h2>

            <h3 className="typography__heading typography__heading--h3">
                {t('journal-faqs.revised-submissions.question1')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.revised-submissions.answer1')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">
                {t('journal-faqs.revised-submissions.question2')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.revised-submissions.answer2')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">
                {t('journal-faqs.revised-submissions.question3')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.revised-submissions.answer3')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">
                {t('journal-faqs.revised-submissions.question4')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.revised-submissions.answer4')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">
                {t('journal-faqs.revised-submissions.question5')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.revised-submissions.answer5')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">
                {t('journal-faqs.revised-submissions.question6')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.revised-submissions.answer6')} />
            </Paragraph>

            <h3 className="typography__heading typography__heading--h3">
                {t('journal-faqs.revised-submissions.question7')}
            </h3>
            <Paragraph type="reading">
                <Interweave content={t('journal-faqs.revised-submissions.answer7')} />
            </Paragraph>
        </div>
    );
};

export default JournalFAQs;
