import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { getToken, clearToken } from '../../login/utils/tokenUtils';

interface Headers {
    authorization: string;
}
const getHeaders = (authenticationToken?: string): Record<string, Headers> => ({
    headers: {
        authorization: authenticationToken ? `Bearer ${authenticationToken}` : '',
    },
});

export default (host: string): ApolloClient<unknown> => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        uri: `${host}/graphql`,
        resolvers: {
            Query: {
                isAuthenticated(): boolean {
                    return getToken() !== null;
                },
            },
        },
        request: async (operation): Promise<void> => {
            await operation.setContext(getHeaders(getToken()));
        },
        // TODO: figure out generic handler for errors
        onError: ({ graphQLErrors = [], networkError }): void => {
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
            );
            if (networkError) console.log(`[Network error]: ${networkError}`);

            const authenticationError = graphQLErrors.some(
                error => error.extensions.code && error.extensions.code == 'UNAUTHENTICATED',
            );

            if (authenticationError) {
                clearToken();
                window.location.reload();
            }
        },
    });
};
