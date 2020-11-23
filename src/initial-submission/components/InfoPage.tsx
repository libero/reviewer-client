import React from 'react';
import { useParams, RouteComponentProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Interweave from 'interweave';
import { Button } from '../../ui/atoms';

const InfoPage = ({ history }: RouteComponentProps<{}>): JSX.Element => {
    const { t } = useTranslation('wizard-form');
    const { id } = useParams<{ id: string }>();
    return (
        <div className="article-type">
            <h1 className="typography__heading typography__heading--h1">{t('info.heading')}</h1>
            <div className="article-type__content">
                <Interweave content={t('info.content')} />
            </div>
            <div className="infoStep__buttons">
                <Button type="primary" onClick={(): void => history.push(`/submit/${id}/author`)}>
                    {t('navigation.next')}
                </Button>
            </div>
        </div>
    );
};

export default InfoPage;
