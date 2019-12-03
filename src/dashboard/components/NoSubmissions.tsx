import React from 'react';
import { useTranslation } from 'react-i18next';
import { TwoColumnLayout, Paragraph, Button, ImageWithAttribution } from '../../ui/atoms';
import Image from '../../core/assets/before-you-start.jpg';

const NoSubmissions = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className="no-submissions site-content__centered">
            <TwoColumnLayout>
                <ImageWithAttribution
                    image={Image}
                    artistName={t('no-submission:image-artist')}
                    artistUrl="http://www.davidebonazzi.com/"
                    align="right"
                />
                <div>
                    <h1 className="typography__heading typography__heading--h1">{t('no-submission:heading')}</h1>

                    <div className="no-submissions__text">
                        <Paragraph type="writing">{t('no-submission:new-system-1')}</Paragraph>
                        <Paragraph type="writing">
                            {t('no-submission:new-system-2')}
                            <strong>{t('no-submission:research-advance')}</strong>
                            {t('no-submission:new-system-3')}
                            <a className="typography typography__body--link" href="https://submit.elifesciences.org">
                                {t('no-submission:legacy')}
                            </a>
                        </Paragraph>
                        <Paragraph type="writing">
                            {t('no-submission:new-system-4')}
                            <a
                                className="typography typography__body--link"
                                href="https://reviewer.elifesciences.org/contact-us/contact-elife"
                            >
                                {t('no-submission:contact')}
                            </a>
                        </Paragraph>
                    </div>
                    <div className="no-submissions__buttons">
                        <Button type="primary">{t('no-submission:new-submission')}</Button>
                    </div>
                </div>
            </TwoColumnLayout>
            <Paragraph type="footer">
                {t('login:footer-text-1')}
                <a
                    className="typography typography__small--link"
                    href="https://elifesciences.org/terms"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {t('login:footer-link-1')}
                </a>
                {t('login:footer-text-2')}
                <a
                    className="typography typography__small--link"
                    href="https://elifesciences.org/privacy"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {t('login:footer-link-2')}
                </a>
                .
            </Paragraph>
        </div>
    );
};

export default NoSubmissions;
