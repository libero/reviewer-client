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

export const getCurrentUserQuery = gql`
    query GetCurrentUser {
        getCurrentUser {
            id
            name
            role
            aff
            email
        }
    }
`;
