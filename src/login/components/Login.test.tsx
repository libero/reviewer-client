import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import * as Auth from '../../core/utils/auth';
import Login from './Login';

describe('Login', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <MemoryRouter initialEntries={['/login']}>
                        <Login isAuthenticated={true} />
                    </MemoryRouter>,
                ),
        ).not.toThrow();
    });

    it('should redirect if authenticated', (): void => {
        jest.spyOn(Auth, 'importToken').mockImplementationOnce(jest.fn());
        jest.spyOn(Auth, 'isAuthenticated').mockImplementationOnce((): boolean => true);

        const { container } = render(
            <MemoryRouter initialEntries={['/login']}>
                <Route exact path="/login" render={(): JSX.Element => <Login isAuthenticated={true}></Login>} />
                <Route path="/" render={(): string => 'Root'} />
            </MemoryRouter>,
        );

        expect(container.querySelector('.login-page')).toBe(null);
        expect(container.textContent).toBe('Root');
    });

    it('should render login page if not authenticated', (): void => {
        const { container } = render(
            <MemoryRouter initialEntries={['/login']}>
                <Route exact path="/login" render={(): JSX.Element => <Login isAuthenticated={false}></Login>} />
                <Route path="/" render={(): string => 'Root'} />
            </MemoryRouter>,
        );

        expect(container.querySelector('.login-page')).not.toBe(null);
    });
});
