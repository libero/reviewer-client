import React from 'react';
import Interweave from 'interweave';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '../../ui/atoms';
import useScrollToAnchor from '../../ui/hooks/useScrollToAnchor';

const DataAvailibility = (): JSX.Element => {
    const { t } = useTranslation('author-guide');

    useScrollToAnchor();

    return (
        <div className="static-page__content">
            <h1 id={t('data-availability.anchor')} className="typography__heading typography__heading--h1">
                {t('data-availability.heading')}
            </h1>

            <h2
                id={t('data-availability.general-principles.anchor')}
                className="typography__heading typography__heading--h2
            "
            >
                {t('data-availability.general-principles.heading')}
            </h2>

            <Paragraph type="reading">
                <Interweave content={t('data-availability.general-principles.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('data-availability.general-principles.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('data-availability.general-principles.p3')} />
            </Paragraph>

            <h2
                id={t('data-availability.timing-data-release.anchor')}
                className="typography__heading typography__heading--h2
            "
            >
                {t('data-availability.timing-data-release.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('data-availability.timing-data-release.p1')} />
            </Paragraph>

            <h2
                id={t('data-availability.data-availability-statement.anchor')}
                className="typography__heading typography__heading--h2
            "
            >
                {t('data-availability.data-availability-statement.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('data-availability.data-availability-statement.p1')} />
            </Paragraph>

            <h2
                id={t('data-availability.laws-ethical.anchor')}
                className="typography__heading typography__heading--h2
            "
            >
                {t('data-availability.laws-ethical.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('data-availability.laws-ethical.p1')} />
            </Paragraph>

            <h2
                id={t('data-availability.restrictions-data-access.anchor')}
                className="typography__heading typography__heading--h2
            "
            >
                {t('data-availability.restrictions-data-access.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('data-availability.restrictions-data-access.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('data-availability.restrictions-data-access.p2')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('data-availability.restrictions-data-access.p3')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('data-availability.restrictions-data-access.p4')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('data-availability.restrictions-data-access.p5')} />
            </Paragraph>

            <h2
                id={t('data-availability.external-unpublished-data.anchor')}
                className="typography__heading typography__heading--h2
            "
            >
                {t('data-availability.external-unpublished-data.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('data-availability.external-unpublished-data.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('data-availability.external-unpublished-data.p2')} />
            </Paragraph>

            <h2
                id={t('data-availability.mechanisms-data-sharing.anchor')}
                className="typography__heading typography__heading--h2
            "
            >
                {t('data-availability.mechanisms-data-sharing.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('data-availability.mechanisms-data-sharing.p1')} />
            </Paragraph>

            <Paragraph type="reading">
                <Interweave content={t('data-availability.mechanisms-data-sharing.p2')} />
            </Paragraph>

            <h2
                id={t('data-availability.requests-for-exceptions.anchor')}
                className="typography__heading typography__heading--h2
            "
            >
                {t('data-availability.requests-for-exceptions.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('data-availability.requests-for-exceptions.p1')} />
            </Paragraph>

            <h2
                id={t('data-availability.commitment-data-sharing.anchor')}
                className="typography__heading typography__heading--h2
            "
            >
                {t('data-availability.commitment-data-sharing.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('data-availability.commitment-data-sharing.p1')} />
            </Paragraph>

            <h2
                id={t('data-availability.data-repositories.anchor')}
                className="typography__heading typography__heading--h2
            "
            >
                {t('data-availability.data-repositories.heading')}
            </h2>
            <Paragraph type="reading">
                <Interweave content={t('data-availability.data-repositories.p1')} />
            </Paragraph>
            <ul>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('data-availability.data-repositories.bullet1')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('data-availability.data-repositories.bullet2')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('data-availability.data-repositories.bullet3')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('data-availability.data-repositories.bullet4')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('data-availability.data-repositories.bullet5')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('data-availability.data-repositories.bullet6')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('data-availability.data-repositories.bullet7')} />
                    </Paragraph>
                </li>
                <li>
                    <Paragraph type="reading">
                        <Interweave content={t('data-availability.data-repositories.bullet8')} />
                    </Paragraph>
                </li>
            </ul>
        </div>
    );
};

export default DataAvailibility;
