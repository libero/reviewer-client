import { gql } from 'apollo-boost';

export const getSubmissionsQuery = gql`
    query GetSubmissions {
        getSubmissions {
            id
            title
            updated
        }
    }
`;

export const startSubmissionMutation = gql`
    mutation StartSubmision($articleType: String!) {
        startSubmission(articleType: $articleType) {
            id
            title
            updated
        }
    }
`;

export const deleteSubmissionMutation = gql`
    mutation DeleteSubmission($id: ID!) {
        deleteSubmission(id: $id)
    }
`;
