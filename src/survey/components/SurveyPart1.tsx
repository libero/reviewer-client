/* eslint-disable */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import { Paragraph, TextField, Button, RadioButton } from '../../ui/atoms';
import Interweave from 'interweave';
import { useForm } from 'react-hook-form';
import { SurveyInput, SurveyResponse } from '../types';
import { saveSurvey } from '../graphql';
import { useMutation } from '@apollo/react-hooks';

interface Props {
    register: () => void;
}

const SurveyPart1 = ({register}: Props): JSX.Element => {
    const { t } = useTranslation('survey');

    const q1Options = [
        { label: 'First Author (includes joint-first author)', value: 'first-author' },
        { label: 'Last author (includes joint-last author)', value: 'last-author' },
        { label: 'Neither of the above', value: 'neither' },
    ];

    const q2Options = [ 
        { "label": "Yes", "value": "yes" },
        { "label": "No", "value": "no" },
        { "label": "Prefer not to say", "value": "neither" }
    ];

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
            <RadioButton labelText={t('q1.label')} name='q1' options={q1Options} register={register}></RadioButton>
            <RadioButton labelText={t('q2.label')} name='q2' options={q2Options} register={register}></RadioButton>
        </div>
    );
};

export default SurveyPart1;
