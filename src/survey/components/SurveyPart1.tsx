/* eslint-disable */
import React, { useState } from 'react';
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
    showQuestion3?: boolean;
}

const SurveyPart1 = ({ showQuestion3 = false, register }: Props): JSX.Element => {
    const { t } = useTranslation('survey');

    const q1Options = [
        { label: 'First Author (includes joint-first author)', value: 'first-author' },
        { label: 'Last author (includes joint-last author)', value: 'last-author' },
        { label: 'Neither of the above', value: 'neither' },
    ];

    const q2Options = [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
        { label: 'Prefer not to say', value: 'neither' },
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
            <h3 className="typography__heading typography__heading--h3">{t('q1.label')}</h3>
            <RadioButton id="answers[1].answer" name="q1" options={q1Options} register={register}></RadioButton>
            <h3 className="typography__heading typography__heading--h3">{t('q2.label')}</h3>
            <RadioButton id="answers[2].answer" name="q2" helperText={t('q2.helper')} options={q2Options} register={register}></RadioButton>
            {showQuestion3 && <TextField
                name="q3"
                id="answers[3].answer"
                labelText={t('q3.label')}
                placeholder="Enter text"
                helperText={t('q3.helper')}
                register={register}
            />}
        </div>
    );
};

export default SurveyPart1;
