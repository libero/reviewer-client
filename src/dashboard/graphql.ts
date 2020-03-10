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

export const getSubmissionQuery = gql`
    query GetSubmission($id: ID!) {
        getSubmission(id: $id) {
            id
            title
            updated
            author {
                firstName
                lastName
                email
                institution
            }
        }
    }
`;

export const startSubmissionMutation = gql`
    mutation StartSubmision($articleType: String!) {
        startSubmission(articleType: $articleType) {
            id
            title
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
