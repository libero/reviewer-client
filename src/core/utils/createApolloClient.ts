import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { split, ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { getToken, clearToken } from '../../login/utils/tokenUtils';

interface Config {
    client: {
        majorSubjectAreas: { [key: string]: string };
    };

    login: {
        url: string;
        enableMock: boolean;
        signupUrl: string;
        legacySubmissionUrl: string;
    };

    fileUpload: {
        maxSizeMB: number;
    };

    newrelic: {
        licenseKey: string;
        applicationId: string;
    };

    googleAnalytics: {
        trackingId: string;
    };

    hotJar: {
        enabled: boolean;
        snippetVersion: number;
    };

    titles: { [key: string]: string };
}

export default (host: string): ApolloClient<unknown> => {
    let config: Config;
    const apiLink = new HttpLink({
        uri: `${host}/graphql`, // use https for secure endpoint,
    });

    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = getToken();
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
                async getConfig(): Promise<Config> {
                    if (typeof config === 'undefined') {
                        const response = await fetch(`${CONFIG.API_HOST}/config`);
                        config = await response.json();
                    }
                    return config;
                },
            },
        },
    });
};
