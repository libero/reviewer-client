import '../../../test-utils/i18n-mock';
import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import routerWrapper from '../../../test-utils/routerWrapper';
import ErrorPage from './ErrorPage';

describe('ErrorPage', (): void => {
    it('should render and not throw', (): void => {
        expect(
            (): RenderResult =>
                render(<ErrorPage />, {
                    wrapper: routerWrapper(),
                }),
        ).not.toThrow();
    });
    it('should render correctly with 404 if no errors are passed', (): void => {
        const { container, getByText } = render(<ErrorPage />, {
            wrapper: routerWrapper(),
        });

        expect(container.querySelector('.error-page')).toBeInTheDocument();
        expect(container.querySelector('.error-page__image')).toBeInTheDocument();
        expect(getByText('404')).toBeInTheDocument();
        expect(getByText('back')).toBeInTheDocument();
        expect(getByText('oops')).toBeInTheDocument();
        expect(getByText('went-wrong')).toBeInTheDocument();
    });

    it('should render correctly with error message if errors is passed', (): void => {
        const { container, getByText } = render(<ErrorPage error={new Error('test error message')} />, {
            wrapper: routerWrapper(),
        });

        expect(container.querySelector('.error-page__image')).toBeInTheDocument();
        expect(getByText('test error message')).toBeInTheDocument();
        expect(getByText('back')).toBeInTheDocument();
        expect(getByText('oops')).toBeInTheDocument();
        expect(getByText('went-wrong')).toBeInTheDocument();
    });
});
