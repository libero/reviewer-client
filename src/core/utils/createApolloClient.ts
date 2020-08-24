import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { split, ApolloLink } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { getToken, clearToken } from '../../login/utils/tokenUtils';
import { createUploadLink } from 'apollo-upload-client';
import { APPLICATION_ERROR } from '../../initial-submission/graphql';

export default (): ApolloClient<unknown> => {
    // eslint-disable-next-line prefer-const
    let client: ApolloClient<unknown>;
    const host = `${window.location.protocol}//${window.location.host}`;
    const apiLink = createUploadLink({
        uri: `${host}/graphql`, // use https for secure endpoint,
        // Adding the line below causes logs of CORS issues which prevents
        // the dashboard from being rendered. This needs reinstating along
        // with adding headers for Access-Control-Allow-Origin
        //
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSNotSupportingCredentials
        // credentials: 'include',
    });
    const authLink = setContext((_, { headers }) => {
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: getToken() ? `Bearer ${getToken()}` : '',
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
                window.location.href = `${window.location.protocol}//${window.location.host}/login?loginTimeout=true`;
            } else {
                client.writeQuery({
                    query: APPLICATION_ERROR,
                    data: {
                        feedback: {
                            error: true,
                            dismissable: false,
                            message: 'feedback.submission-error',
                        },
                    },
                });
            }
        }

        if (networkError) {
            client.writeQuery({
                query: APPLICATION_ERROR,
                data: {
                    feedback: {
                        dismissable: false,
                        error: true,
                        message: 'feedback.server-lost',
                    },
                },
            });
            console.log(`[Network error]: ${networkError}`);
        }
    });

    const httpLink = ApolloLink.from([onErrorLink, authLink, apiLink]);

    const wsLink = new WebSocketLink({
        uri: `${host}/graphql`.replace('http', 'ws'),
        options: {
            reconnect: true,
            connectionParams: (): {} => ({
                Authorization: `Bearer ${getToken()}`,
            }),
            lazy: true,
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

    client = new ApolloClient({
        cache: new InMemoryCache(),
        link,
        resolvers: {
            Mutation: {
                clearError(): void {
                    client.writeQuery({
                        query: APPLICATION_ERROR,
                        data: {
                            feedback: null,
                        },
                    });
                },
                setLogoutError(): void {
                    client.writeQuery({
                        query: APPLICATION_ERROR,
                        data: {
                            feedback: {
                                error: true,
                                dismissable: true,
                                message: 'feedback.auth-timeout',
                            },
                        },
                    });
                },
                setValidationError(): void {
                    client.writeQuery({
                        query: APPLICATION_ERROR,
                        data: {
                            feedback: {
                                error: true,
                                dismissable: true,
                                message: 'feedback.validation-error',
                            },
                        },
                    });
                },
            },
            Query: {
                isAuthenticated(): boolean {
                    return getToken() !== null;
                },
            },
        },
    });

    return client;
};
