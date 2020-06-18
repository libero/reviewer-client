import gql from 'graphql-tag';

export const saveSurvey = gql`
    mutation SaveSurveyMutation($surveyId: ID!, $submissionId: ID!, $answers: [InputSurveyAnswer]!) {
        submitSurveyResponse(surveyId: $surveyId, submissionId: $submissionId, answers: $answers) {
            id
        }
    }
`;

