import gql from 'graphql-tag';

export const getSubmissionsQuery = gql`
    query GetSubmissions {
        getSubmissions {
            id
            manuscriptDetails {
                title
            }
            updated
        }
    }
`;

export const startSubmissionMutation = gql`
    mutation StartSubmision($articleType: String!) {
        startSubmission(articleType: $articleType) {
            id
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
