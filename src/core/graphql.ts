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

export const configQuery = gql`
    query getConfig {
        config @client(always: true)
    }
`;

export const SET_LOGOUT_ERROR = gql`
    mutation SetLogoutError {
        setLogoutError @client
    }
`;

export const APPLICATION_ERROR = gql`
    query ApplicationError {
        feedback @client
    }
`;
