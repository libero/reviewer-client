import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/react-testing';

import Login from './Login';
import { isUserAuthenticatedQuery, SET_LOGOUT_ERROR } from '../../core/graphql';

describe('Login', (): void => {
    afterEach(cleanup);

    const mocks = [
        {
            request: {
                query: SET_LOGOUT_ERROR,
            },
            result: {
                data: {},
            },
        },
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

    it('should render correctly', async done => {
        const { container } = render(
            <MockedProvider mocks={mocks} addTypename={false} resolvers={{}}>
                <MemoryRouter initialEntries={['/login']}>
                    <Login />
                </MemoryRouter>
            </MockedProvider>,
        );
        await waitFor(() => {});
        expect(container.querySelector('.login-page')).toBeDefined();
        expect(container.textContent).toBeDefined();
        done();
    });

    it('should redirect if authenticated', async done => {
        const resolvers = {
            Mutation: {
                setLogoutError(): boolean {
                    return false;
                },
            },
            Query: {
                isAuthenticated(): boolean {
                    return true;
                },
            },
        };
        const { container } = render(
            <MockedProvider mocks={mocks} addTypename={false} resolvers={resolvers}>
                <MemoryRouter initialEntries={['/login']}>
                    <Route exact path="/login" render={(): JSX.Element => <Login />} />
                    <Route path="/" render={(): string => 'Root'} />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Apollo queries need timeout, despite mock...
        // https://github.com/airbnb/enzyme/issues/2153
        await waitFor(() => {});

        expect(container.querySelector('.login-page')).toBe(null);
        expect(container.textContent).toBe('Root');
        done();
    });

    it('should render login page if not authenticated', async done => {
        const resolvers = {
            Mutation: {
                setLogoutError(): boolean {
                    return false;
                },
            },
            Query: {
                isAuthenticated(): boolean {
                    return false;
                },
            },
        };
        const { container } = render(
            <MockedProvider mocks={mocks} addTypename={false} resolvers={resolvers}>
                <MemoryRouter initialEntries={['/login']}>
                    <Route exact path="/login" render={(): JSX.Element => <Login></Login>} />
                    <Route path="/" render={(): string => 'Root'} />
                </MemoryRouter>
            </MockedProvider>,
        );

        // Apollo queries need timeout, despite mock...
        // https://github.com/airbnb/enzyme/issues/2153
        await waitFor(() => {});
        expect(container.querySelector('.login-page')).not.toBe(null);
        done();
    });
});
