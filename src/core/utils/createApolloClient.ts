import ApolloClient from 'apollo-boost';
import { getToken } from '../../login/utils/tokenUtils';

interface Headers {
    authorization: string;
}
const getHeaders = (authenticationToken?: string): Record<string, Headers> => ({
    headers: {
        authorization: authenticationToken ? `Bearer ${authenticationToken}` : '',
    },
});

export default (host: string): ApolloClient<unknown> =>
    new ApolloClient({
        uri: `${host}/graphql`,
        request: async (operation): Promise<void> => {
            await operation.setContext(getHeaders(getToken()));
        },
    });
