export interface SurveyInput {
    surveyId: string;
    answers: SurveyInputAnswer[];
    submissionId: string;
}

export interface SurveyInputAnswer {
    questionId: string;
    text: string;
    answer: string;
}

export interface SurveyResponse {
    id: string;
    created: Date;
    updated: Date;
    surveyId: string;
    submissionId: string;
    response: SurveyQuestionsAndAnswers;
}

interface SurveyQuestionsAndAnswers {
    questions: SurveyQuestion[];
    answers: SurveyAnswer[];
}

interface SurveyQuestion {
    id: string;
    question: string;
}

interface SurveyAnswer {
    questionId: string;
    answer: string;
}
