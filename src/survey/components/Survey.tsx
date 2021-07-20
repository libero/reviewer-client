import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useHistory } from 'react-router-dom';
import { SurveyInput, SurveyResponse } from '../types';
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

    let pages = [];

    const onNext = (answers: SurveyPage1Answers | SurveyPage2Answers): void => {
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

    const onSubmit = (answers: SurveyPage1Answers | SurveyPage2Answers): void => {
        const reponses = { ...currentAnswers, ...answers };

        // If there are any answers, then post them to the backend.
        if (Object.keys(reponses).length > 0) {
            const surveyResponse: SurveyInput = {
                surveyId: 'ediSurvey',
                answers: [],
                submissionId: id,
            };

            for (const [key, value] of Object.entries(reponses)) {
                surveyResponse.answers.push({
                    // Note: SelectFields return the value as an object, hence we need to extract the value from that object.
                    answer: typeof value === 'object' ? value.value : value,
                    text: t(`${key}.label`),
                    questionId: key,
                });
            }

            saveCallback({ variables: surveyResponse });
        }

        // Redirect them to the thank you page
        history.push(`/thankyou/${id}`);
    };

    // Resets the view to the top of the page on page change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    pages = [
        <SurveyPart1 key="0" next={onNext} previous={onPrevious} defaultValues={currentAnswers} />,
        <SurveyPart2 key="1" next={onSubmit} previous={onPrevious} defaultValues={currentAnswers} />,
    ];

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
