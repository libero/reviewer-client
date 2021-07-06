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

    const [currentPage, setCurrentPage] = useState(0);

    const onNext = (): void => {
        let newPage: number = currentPage + 1;
        if (newPage >= pages.length){
            newPage = pages.length -1;
        }
        setCurrentPage(newPage);
    }

    const onPrevious = (): void => {
        let newPage: number = currentPage - 1;
        if (newPage < 0){
            newPage = 0;
        }
        setCurrentPage(newPage);
    }

    const pages = [
        <SurveyPart1 next={onNext} previous={onPrevious}/>,
        <SurveyPart2/>
    ]

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

    return (
        <div className="survey">
            <h2 className="typography__heading typography__heading--h2">{`${t(
                'title',
            )} (${currentPage + 1}/${pages.length})`}</h2>
            { pages[currentPage]}
        </div>
    );
};

export default Survey;
