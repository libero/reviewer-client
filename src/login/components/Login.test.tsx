import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Login from './Login';
import * as AppContext from '../../core/providers/AppProvider';

describe('Login', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <MemoryRouter initialEntries={['/login']}>
                        <Login />
                    </MemoryRouter>,
                ),
        ).not.toThrow();
    });

    it('should redirect if authenticated', (): void => {
        jest.spyOn(AppContext, 'useAppContext').mockImplementation(() => ({
            isAuthenticated: true,
        }));

        const { container } = render(
            <MemoryRouter initialEntries={['/login']}>
                <Route exact path="/login" render={(): JSX.Element => <Login></Login>} />
                <Route path="/" render={(): string => 'Root'} />
            </MemoryRouter>,
        );

        expect(container.querySelector('.login-page')).toBe(null);
        expect(container.textContent).toBe('Root');
    });

    it('should render login page if not authenticated', (): void => {
        jest.spyOn(AppContext, 'useAppContext').mockImplementation(() => ({
            isAuthenticated: false,
        }));
        const { container } = render(
            <MemoryRouter initialEntries={['/login']}>
                <Route exact path="/login" render={(): JSX.Element => <Login></Login>} />
                <Route path="/" render={(): string => 'Root'} />
            </MemoryRouter>,
        );

        expect(container.querySelector('.login-page')).not.toBe(null);
    });
});
