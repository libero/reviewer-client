import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { split, ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { getToken, clearToken } from '../../login/utils/tokenUtils';
import { createUploadLink } from 'apollo-upload-client';

export default (host: string): ApolloClient<unknown> => {
    const apiLink = createUploadLink({
        uri: `${host}/graphql`, // use https for secure endpoint,
    });

    // get the authentication token from local storage if it exists
    const token = getToken();

    const authLink = setContext((_, { headers }) => {
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    });

    const onErrorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
            );

            const authenticationError = graphQLErrors.some(
                error => error.extensions.code && error.extensions.code == 'UNAUTHENTICATED',
            );

            if (authenticationError) {
                clearToken();
                window.location.reload();
            }
        }

        if (networkError) {
            console.log(`[Network error]: ${networkError}`);
        }
    });

    const httpLink = ApolloLink.from([onErrorLink, authLink, apiLink]);

    const wsLink = new WebSocketLink({
        uri: `${host}/graphql`.replace('http', 'ws'),
        options: {
            reconnect: true,
            connectionParams: {
                headers: {
                    Authorization: token ? `Bearer ${token}` : '',
                },
            },
        },
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
        // split based on operation type
        ({ query }) => {
            const definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        httpLink,
    );

    return new ApolloClient({
        cache: new InMemoryCache(),
        link,
        resolvers: {
            Query: {
                isAuthenticated(): boolean {
                    return getToken() !== null;
                },
            },
        },
    });
};
