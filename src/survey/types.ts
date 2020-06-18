export interface SurveyResponse {
    surveyId: string;
    answers: SurveyAnswer[];
    submissionId: string;
}

export interface SurveyAnswer {
    questionId: string;
    text: string;
    answer: string;
}
