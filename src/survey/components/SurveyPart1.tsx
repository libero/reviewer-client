/* eslint-disable */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import { Paragraph, TextField, Button } from '../../ui/atoms';
import Interweave from 'interweave';
import { useForm } from 'react-hook-form';
import { SurveyInput, SurveyResponse } from '../types';
import { saveSurvey } from '../graphql';
import { useMutation } from '@apollo/react-hooks';

interface Props {
    register: () => void;
}

const SurveyPart1 = (props: Props): JSX.Element => {
    const { t } = useTranslation('survey');

    return (
        <div className="survey">
            <Paragraph type="writing">
                <Interweave content={t('p1')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interweave content={t('p2')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interweave content={t('p3')} />
            </Paragraph>
        </div>
    );
};

export default SurveyPart1;
