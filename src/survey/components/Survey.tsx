/* eslint-disable */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import { SurveyResponse } from '../types';
import { saveSurvey } from '../graphql';
import { useMutation } from '@apollo/react-hooks';
import SurveyPart1, { SurveyPageAnswers as SurveyPage1Answers } from './SurveyPart1';
import SurveyPart2, { SurveyPageAnswers as SurveyPage2Answers } from './SurveyPart2';

const Survey = (): JSX.Element => {
    const [saveCallback] = useMutation<SurveyResponse>(saveSurvey);
    const { t } = useTranslation('survey');
    const { id } = useParams();
    const history = useHistory();

    const [currentPage, setCurrentPage] = useState(0);
    const [currentAnswers, setCurrentAnswers] = useState({});

    console.log(currentAnswers);

    const onNext = (answers: SurveyPage1Answers | SurveyPage2Answers): void => {
        console.log(answers);
        setCurrentAnswers({ ...currentAnswers, ...answers });
        let newPage: number = currentPage + 1;
        if (newPage >= pages.length) {
            newPage = pages.length - 1;
        }
        setCurrentPage(newPage);
    };

    const onPrevious = (): void => {
        let newPage: number = currentPage - 1;
        if (newPage < 0) {
            newPage = 0;
        }
        setCurrentPage(newPage);
    };

    const pages = [
        <SurveyPart1 next={onNext} previous={onPrevious} defaultValues={currentAnswers} />,
        <SurveyPart2 next={onNext} previous={onPrevious} defaultValues={currentAnswers} />,
    ];

    const onSubmit = (): void => {
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

    return (
        <div className="survey">
            <h2 className="typography__heading typography__heading--h2">{`${t('title')} (${currentPage + 1}/${
                pages.length
            })`}</h2>
            {pages[currentPage]}
        </div>
    );
};

export default Survey;
