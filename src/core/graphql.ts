import gql from 'graphql-tag';

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

export const isUserAuthenticatedQuery = gql`
    query isUserAuthenticated {
        isAuthenticated @client(always: true)
    }
`;
