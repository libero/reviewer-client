import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { cleanup, render, RenderResult } from '@testing-library/react';
import * as TokenUtils from '../utils/tokenUtils';
import JournalAuthRedirect from './JournalAuthRedirect';

jest.mock;

describe('JournalAuthRedirect', (): void => {
    const originalLocation = window.location;

    beforeEach(() => {
        delete window.location;

        window.location = {
            href: '',
        } as Location;
    });

    afterEach(() => {
        window.location = originalLocation;
        cleanup();
    });

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<JournalAuthRedirect />)).not.toThrow();
    });

    it('should redirect to auth url with token', (): void => {
        jest.spyOn(TokenUtils, 'getTokenFromUrl').mockImplementationOnce((): string => 'token');
        

        render(
            <MemoryRouter initialEntries={['/auth-redirect#token']}>
                <Route component={JournalAuthRedirect} exact path="/auth-redirect"></Route>
                <Route path="/auth" render={(): string => 'Auth'} />
            </MemoryRouter>,
        );

        expect(window.location.href).toBe('/auth/token');
    });

    it('should show an error without a token', (): void => {
        jest.spyOn(TokenUtils, 'getTokenFromUrl').mockImplementationOnce((): string => '');

        const { container } = render(
            <MemoryRouter initialEntries={['/auth-redirect#token']}>
                <Route component={JournalAuthRedirect} exact path="/auth-redirect"></Route>
                <Route path="/auth" render={(): string => 'Auth'} />
            </MemoryRouter>,
        );

        expect(container.textContent).toBe('Missing token');
    });
});
