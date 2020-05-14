import React from 'react';
import { render, cleanup, RenderResult } from '@testing-library/react';
import * as tokenUtils from '../utils/tokenUtils';
import Logout from './Logout';
import { MemoryRouter, Route } from 'react-router';

describe('Logout', () => {
    beforeEach(() => {
        window.location.reload = jest.fn();
    });
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <MemoryRouter initialEntries={['/logout']}>
                        <Logout />
                    </MemoryRouter>,
                ),
        ).not.toThrow();
    });

    it('should clear the token', (): void => {
        jest.spyOn(tokenUtils, 'clearToken').mockImplementationOnce(() => {});

        render(
            <MemoryRouter initialEntries={['/logout']}>
                <Logout />
            </MemoryRouter>,
        );

        expect(tokenUtils.clearToken).toHaveBeenCalledTimes(1);
    });

    it('should redirect to the root route', (): void => {
        const { container } = render(
            <MemoryRouter initialEntries={['/logout']}>
                <Route component={Logout} exact path="/logout"></Route>
                <Route exact path="/" render={(): string => 'Root'} />
            </MemoryRouter>,
        );

        expect(container.textContent).toBe('');
        expect(window.location.reload).toHaveBeenCalled();
    });
});
