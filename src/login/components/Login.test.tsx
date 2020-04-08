import '../../../test-utils/i18n-mock';
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

    it('should redirect if authenticated', async done => {
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
        const resolvers = {
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
        const resolvers = {
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
        await wait();
        expect(container.querySelector('.login-page')).not.toBe(null);
        done();
    });
});
