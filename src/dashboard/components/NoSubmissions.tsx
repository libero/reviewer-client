import React from 'react';
import { useTranslation } from 'react-i18next';
import { TwoColumnLayout, Paragraph, Button, ImageWithAttribution } from '../../ui/atoms';
import Image from '../../core/assets/before-you-start.jpg';

interface Props {
    onStartClick: () => void;
}

const NoSubmissions = ({ onStartClick }: Props): JSX.Element => {
    const { t } = useTranslation('no-submission');

    return (
        <div className="no-submissions">
            <TwoColumnLayout>
                <ImageWithAttribution
                    className="two-column-layout__left two-column-layout__full_column"
                    image={Image}
                    artistName={t('image-artist')}
                    artistUrl="http://www.davidebonazzi.com/"
                    align="right"
                />

                <h1 className="typography__heading typography__heading--h1 two-column-layout__right">{t('heading')}</h1>

                <div className="no-submissions__text two-column-layout__right">
                    <Paragraph type="writing">{t('new-system-1')}</Paragraph>
                    <Paragraph type="writing">
                        {t('new-system-2')}
                        <strong>{t('research-advance')}</strong>
                        {t('new-system-3')}
                        <a className="typography typography__body--link" href="https://submit.elifesciences.org">
                            {t('legacy')}
                        </a>
                    </Paragraph>
                    <Paragraph type="writing">
                        {t('new-system-4')}
                        <a className="typography typography__body--link" href="/contact-us/contact-elife">
                            {t('contact')}
                        </a>
                    </Paragraph>
                </div>
                <div className="no-submissions__buttons two-column-layout__right">
                    <Button id="new-submission-button" type="primary" onClick={(): void => onStartClick()}>
                        {t('new-submission')}
                    </Button>
                </div>
            </TwoColumnLayout>
        </div>
    );
};

export default NoSubmissions;
