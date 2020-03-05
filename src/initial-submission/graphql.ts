import { gql } from 'apollo-boost';

export const saveDetailsPageMutation = gql`
    mutation SaveDetailsPage($id: ID!, $details: AuthorDetailsInput!) {
        saveDetailsPage(id: $id, details: $details) {
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
