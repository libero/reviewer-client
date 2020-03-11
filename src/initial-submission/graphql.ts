import { gql } from 'apollo-boost';

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

export const saveAuthorPageMutation = gql`
    mutation SaveAuthorPage($id: ID!, $details: AuthorDetailsInput!) {
        saveAuthorPage(id: $id, details: $details) {
            id
            author {
                firstName
                lastName
                email
                institution
            }
        }
    }
`;

export const saveFilesPageMutation = gql`
    mutation SaveFilesPage($id: ID!, $coverLetter: String!) {
        saveFilesPage(id: $id, coverLetter: $coverLetter) {
            id
            coverLetter
        }
    }
`;
