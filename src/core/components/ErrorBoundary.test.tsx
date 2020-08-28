import '../../../test-utils/i18n-mock';
import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import routerWrapper from '../../../test-utils/routerWrapper';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', (): void => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should render and not throw', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <ErrorBoundary>
                        <span>test</span>
                    </ErrorBoundary>,
                    {
                        wrapper: routerWrapper(),
                    },
                ),
        ).not.toThrow();
    });
    it('should render correctly tree components if no errors', (): void => {
        const { getByText } = render(
            <ErrorBoundary>
                <span>test</span>
            </ErrorBoundary>,
            {
                wrapper: routerWrapper(),
            },
        );
        expect(getByText('test')).toBeInTheDocument();
    });

    it('should render correctly render error', (): void => {
        const ComponentThatThrows = ({ someInput }: { someInput: Number }): JSX.Element => {
            if (someInput === 1) {
                throw new Error('test error');
            }
            return <div>componentThatThrows</div>;
        };

        const { getByText } = render(
            <ErrorBoundary>
                <ComponentThatThrows someInput={1} />
            </ErrorBoundary>,
            {
                wrapper: routerWrapper(),
            },
        );

        // after exception
        expect(getByText('test error')).toBeInTheDocument();
        expect(getByText('back')).toBeInTheDocument();
        expect(getByText('oops')).toBeInTheDocument();
        expect(getByText('went-wrong')).toBeInTheDocument();
    });
});
