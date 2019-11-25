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
    mutation StartSubmision {
        startSubmission {
            id
            title
            updated
        }
    }
`;
