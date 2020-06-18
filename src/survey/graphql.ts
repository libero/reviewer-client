import gql from 'graphql-tag';

export const saveSurvey = gql`
    mutation SaveSurveyMutation($surveyId: String!, $submissionId: String!, $answers: [InputSurveyAnswer]!) {
        submitSurveyResponse(surveyId: $surveyId, submissionId: $submissionId, answers: $answers) {
            id
        }
    }
`;
