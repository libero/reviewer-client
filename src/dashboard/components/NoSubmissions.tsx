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
                    image={Image}
                    artistName={t('image-artist')}
                    artistUrl="http://www.davidebonazzi.com/"
                    align="right"
                />
                <div>
                    <h1 className="typography__heading typography__heading--h1">{t('heading')}</h1>

                    <div className="no-submissions__text">
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
                            <a
                                className="typography typography__body--link"
                                href="https://reviewer.elifesciences.org/contact-us/contact-elife"
                            >
                                {t('contact')}
                            </a>
                        </Paragraph>
                    </div>
                    <div className="no-submissions__buttons">
                        <Button id="new-submission-button" type="primary" onClick={(): void => onStartClick()}>
                            {t('new-submission')}
                        </Button>
                    </div>
                </div>
            </TwoColumnLayout>
        </div>
    );
};

export default NoSubmissions;
