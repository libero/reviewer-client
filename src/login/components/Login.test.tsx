import React from 'react';
import { cleanup, render, RenderResult, wait } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

import Login from './Login';
import { isUserAuthenticatedQuery } from '../../core/graphql';

describe('Login', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        const mocks = [
            {
                request: {
                    query: isUserAuthenticatedQuery,
                },
                result: {
                    data: {
                        isAuthenticated: true,
                    },
                },
            },
        ];
        expect(
            (): RenderResult =>
                render(
                    <MockedProvider mocks={mocks} addTypename={false} resolvers={{}}>
                        <MemoryRouter initialEntries={['/login']}>
                            <Login />
                        </MemoryRouter>
                    </MockedProvider>,
                ),
        ).not.toThrow();
    });

    it.only('should redirect if authenticated', async done => {
        const mocks = [
            {
                request: {
                    query: isUserAuthenticatedQuery,
                },
                result: {
                    data: {
                        isAuthenticated: true,
                    },
                },
            },
        ];

        /* 
            The warning message below can be ignore as per https://github.com/apollographql/react-apollo/commit/1d289635badd99dcea455b6cf4bd5ad1bfe92627
            Found @client directives in a query but no ApolloClient resolvers were specified.
            This means ApolloClient local resolver handling has been disabled, and @client directives will be passed through to your link chain.
         */
        const { container } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={['/login']}>
                    <Route exact path="/login" render={(): JSX.Element => <Login />} />
                    <Route path="/" render={(): string => 'Root'} />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Apollo queries need timeout, despite mock...
        // https://github.com/airbnb/enzyme/issues/2153
        await wait();

        expect(container.querySelector('.login-page')).toBe(null);
        expect(container.textContent).toBe('Root');
        done();
    });

    it('should render login page if not authenticated', async done => {
        const mocks = [
            {
                request: {
                    query: isUserAuthenticatedQuery,
                },
                result: {
                    data: {
                        isAuthenticated: false,
                    },
                },
            },
        ];
        const { container } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <MemoryRouter initialEntries={['/login']}>
                    <Route exact path="/login" render={(): JSX.Element => <Login></Login>} />
                    <Route path="/" render={(): string => 'Root'} />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Apollo queries need timeout, despite mock...
        // https://github.com/airbnb/enzyme/issues/2153
        await wait();
        expect(container.querySelector('.login-page')).not.toBe(null);
        done();
    });
});
