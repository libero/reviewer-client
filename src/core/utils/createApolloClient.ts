import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { getToken } from '../../login/utils/tokenUtils';

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
    });
};
