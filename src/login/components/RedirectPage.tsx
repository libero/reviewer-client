import React from 'react';
import { useTranslation } from 'react-i18next';
import { TwoColumnLayout, Paragraph, Button, ImageWithAttribution } from '../../ui/atoms';
import Image from '../../core/assets/redirect.jpg';

const RedirectPage = (): JSX.Element => {
    const { t } = useTranslation('redirect');
    return (
        <div className="redirect-page">
            <TwoColumnLayout>
                <h1 className="typography__heading typography__heading--h1 two-column-layout__left">{t('heading')}</h1>

                <div className="redirect-page__text two-column-layout__left">
                    <Paragraph type="writing">{t('p1')}</Paragraph>
                    <Paragraph type="writing">{t('p2')}</Paragraph>
                    <Paragraph type="writing">{t('p3')}</Paragraph>
                </div>

                <div className="redirect-page__buttons two-column-layout__left">
                    <a className="redirect-page__buttons--orcid" href="/login">
                        <Button type="primary">{t('button')}</Button>
                    </a>
                </div>
                <ImageWithAttribution
                    className="two-column-layout__right two-column-layout__full_column"
                    image={Image}
                    artistName={t('image-artist')}
                    artistUrl="http://www.davidebonazzi.com/"
                    align="left"
                />
            </TwoColumnLayout>
        </div>
    );
};

export default RedirectPage;
