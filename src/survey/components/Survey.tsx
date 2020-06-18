import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Paragraph, TextField, Button } from '../../ui/atoms';
import Interweave from 'interweave';
import { useForm } from 'react-hook-form';
import { SurveyInput, SurveyResponse } from '../types';
import { saveSurvey } from '../graphql';
import { useMutation } from '@apollo/react-hooks';

const Survey = (): JSX.Element => {
    const { register, watch, formState } = useForm<SurveyInput>();
    const [saveCallback] = useMutation<SurveyResponse>(saveSurvey);
    const { t } = useTranslation('survey');
    const { id } = useParams();
    const answers = watch('answers');
    const onSave = (): void => {
        const response: SurveyInput = {
            surveyId: 'demographicSurvey',
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
    };

    return (
        <div className="survey">
            <h2 className="typography__heading typography__heading--h2">{t('title')}</h2>
            <Paragraph type="writing">
                <Interweave content={t('survey-info')} />
            </Paragraph>
            <Paragraph type="writing">
                <Interweave content={t('survey-info-2')} />
            </Paragraph>
            <TextField id="answers[0].answer" labelText={t('question1')} placeholder="enter here" register={register} />
            <TextField id="answers[1].answer" labelText={t('question2')} placeholder="enter here" register={register} />
            <TextField id="answers[2].answer" labelText={t('question3')} placeholder="enter here" register={register} />
            <Button
                type="primary"
                onClick={(): void => {
                    onSave();
                }}
            >
                {formState.dirty ? t('navigation.done') : t('navigation.skip')}
            </Button>
        </div>
    );
};

export default Survey;
