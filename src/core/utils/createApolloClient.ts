import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { getToken, clearToken } from '../../login/utils/tokenUtils';
import { useHistory } from 'react-router-dom';

interface Headers {
    authorization: string;
}
const getHeaders = (authenticationToken?: string): Record<string, Headers> => ({
    headers: {
        authorization: authenticationToken ? `Bearer ${authenticationToken}` : '',
    },
});

export default (host: string): ApolloClient<unknown> => {
    const historyManager = useHistory();
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
        onError: ({ graphQLErrors = [], networkError }): void => {
            const authenticationError = graphQLErrors.some(
                error => error.extensions.code && error.extensions.code == 'UNAUTHENTICATED',
            );

            if (authenticationError) {
                clearToken();
                historyManager.push('/');
            }
        },
    });
};
