import gql from 'graphql-tag';

export const getSubmissionsQuery = gql`
    query GetSubmissions {
        getSubmissions {
            id
            lastStepVisited
            manuscriptDetails {
                title
            }
            updated
            articleType
        }
    }
`;

export const startSubmissionMutation = gql`
    mutation StartSubmision($articleType: String!) {
        startSubmission(articleType: $articleType) {
            id
            lastStepVisited
            manuscriptDetails {
                title
            }
            updated
            articleType
        }
    }
`;

export const deleteSubmissionMutation = gql`
    mutation DeleteSubmission($id: ID!) {
        deleteSubmission(id: $id)
    }
`;
