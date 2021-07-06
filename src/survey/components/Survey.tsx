/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import { Paragraph, TextField, Button } from '../../ui/atoms';
import Interweave from 'interweave';
import { useForm } from 'react-hook-form';
import { SurveyInput, SurveyResponse } from '../types';
import { saveSurvey } from '../graphql';
import { useMutation } from '@apollo/react-hooks';
import SurveyPart1 from './SurveyPart1';
import SurveyPart2 from './SurveyPart2';

const Survey = (): JSX.Element => {
    const { register, watch, formState } = useForm<SurveyInput>();
    const [saveCallback] = useMutation<SurveyResponse>(saveSurvey);
    const { t } = useTranslation('survey');
    const { id } = useParams();
    const answers = watch();
    const history = useHistory();

    const numberOfPages = 2;
    const [currentPage, setCurrentPage] = useState(1);

    const onClick = (): void => {
        setCurrentPage(currentPage === 1 ? 2 : 1);
        /*if (formState.dirty) {
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
        */
    };

    let independentResearcherValue = watch('independentResearcher');
    const [showIndependentResearcherYear, setshowIndependentResearcherYear] = useState(false);

    useEffect(() => {
        setshowIndependentResearcherYear(independentResearcherValue === 'yes');
    }, [independentResearcherValue]);

    let genderIdentityValue = watch('genderIdentity');
    const [showGenderSelfDescribe, setShowGenderSelfDescribe] = useState(false);

    useEffect(() => {
        setShowGenderSelfDescribe(genderIdentityValue === 'self-describe');
    }, [genderIdentityValue]);

    return (
        <div className="survey">
            <h2 className="typography__heading typography__heading--h2">{`${t(
                'title',
            )} (${currentPage}/${numberOfPages})`}</h2>
            {currentPage === 1 ? (
                <SurveyPart1
                    showIndependentResearcherYear={showIndependentResearcherYear}
                    register={register}
                ></SurveyPart1>
            ) : (
                <SurveyPart2 showGenderSelfDescribe={showGenderSelfDescribe} register={register}></SurveyPart2>
            )}
            <Button type="primary" onClick={onClick}>
                {formState.dirty ? t('navigation.done') : t('navigation.skip')}
            </Button>
        </div>
    );
};

export default Survey;
