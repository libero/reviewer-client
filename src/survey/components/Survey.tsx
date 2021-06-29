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
import SurveyPart1 from './SurveyPart1';

const Survey = (): JSX.Element => {
    const { register, watch, formState } = useForm<SurveyInput>();
    const [saveCallback] = useMutation<SurveyResponse>(saveSurvey);
    const { t } = useTranslation('survey');
    const { id } = useParams();
    const answers = watch('answers');
    const history = useHistory();

    const onClick = (): void => {
        if (formState.dirty) {
            const response: SurveyInput = {
                surveyId: 'ediSurvey',
                answers: answers.map((answer, index) => {
                    if (answer.answer) {
                        return {
                            answer: answer.answer,
                            text: t(`question${index + 1}`),
                            questionId: `question${index + 1}`,
                        };
                    }
                }),
                submissionId: id,
            };
            saveCallback({ variables: response });
        }
        history.push(`/thankyou/${id}`);
    };

    return (
        <div className="survey">
            <h2 className="typography__heading typography__heading--h2">{t('title')}</h2>
            <SurveyPart1 register={register}></SurveyPart1>
            <Button type="primary" onClick={onClick}>
                {formState.dirty ? t('navigation.done') : t('navigation.skip')}
            </Button>
        </div>
    );
};

export default Survey;
