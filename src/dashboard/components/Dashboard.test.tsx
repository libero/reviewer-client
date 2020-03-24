import React from 'react';
import { cleanup, render, RenderResult, fireEvent, wait } from '@testing-library/react';
import routerWrapper from '../../../test-utils/routerWrapper';
import appContainer from '../../../test-utils/appContainer';

import Dashboard from './Dashboard';

let submissions: object[] = [];
const mockMutation = jest.fn().mockImplementation(
    (): Promise<object> =>
        Promise.resolve({
            data: {
                startSubmission: {
                    id: 'testid',
                    manuscriptDetails: {
                        title: '',
                    },
                    updated: '2020-01-01T00:00:00.000Z',
                    articleType: 'research-article',
                },
            },
        }),
);

jest.mock('@apollo/react-hooks', () => ({
    useQuery: (): object => {
        return {
            data: {
                getSubmissions: submissions,
            },
            loading: false,
        };
    },
    useMutation: (): object[] => {
        return [
            mockMutation,
            {
                loading: false,
            },
        ];
    },
}));

describe('Dashboard', (): void => {
    beforeEach(jest.resetAllMocks);
    afterEach(cleanup);
    const originalError = console.error;
    beforeAll(() => {
        // This is horrible but necessary to prevent console error output which isn't to do with the test scenarios see: https://github.com/libero/reviewer-client/issues/69
        console.error = (...args: unknown[]): void => {
            if (/connect ECONNREFUSED 127.0.0.1:80/.test(args[0] as string)) {
                console.warn(
                    'Suppressed connection refused console error see https://github.com/libero/reviewer-client/issues/69 for context.',
                );
                return;
            }
            originalError.call(console, ...args);
        };
    });

    afterAll(() => {
        console.error = originalError;
    });

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(<Dashboard />, {
                    wrapper: routerWrapper(['/link-1']),
                }),
        ).not.toThrow();
    });

    describe('No Submissions', () => {
        it('should render the no-submissions page if there are no submissions', async (): Promise<void> => {
            const { container } = render(<Dashboard />, {
                wrapper: routerWrapper(['/link-1']),
            });
            await wait();
            expect(container.querySelector('.no-submissions')).toBeInTheDocument();
        });

        it('should show the article type page when new submission button clicked', async (): Promise<void> => {
            const { container } = render(<Dashboard />, {
                wrapper: routerWrapper(['/link-1']),
            });
            await wait();
            const startSubmissionButton = container.querySelector('.no-submissions__buttons button');
            fireEvent.click(startSubmissionButton);
            expect(container.querySelector('.article-type')).toBeInTheDocument();
        });

        it('should return the user to the NoSubmissions page when the cancel button is clicked', async (): Promise<
            void
        > => {
            const { container, getByText } = render(<Dashboard />, {
                wrapper: routerWrapper(['/link-1']),
            });
            await wait();
            const startSubmissionButton = container.querySelector('.no-submissions__buttons button');
            fireEvent.click(startSubmissionButton);
            fireEvent.click(getByText('cancel-button'));
            expect(container.querySelector('.no-submissions')).toBeInTheDocument();
        });
    });

    describe('Dashboard with submissions', () => {
        beforeEach((): void => {
            submissions = [
                {
                    id: 'A',
                    manuscriptDetails: {
                        title: 'Submission - A',
                    },
                    updated: Date.now(),
                },
                {
                    id: 'B',
                    manuscriptDetails: {
                        title: 'Submission - B',
                    },
                    updated: Date.now(),
                },
            ];
        });
        it('should render the standard dashboard page if there are submissions', async (): Promise<void> => {
            const { container } = render(<Dashboard />, {
                wrapper: routerWrapper(['/link-1']),
            });
            await wait();
            expect(container.querySelector('.dashboard')).toBeInTheDocument();
        });

        it('should show the ArticleType page when the new submission button is clicked', async (): Promise<void> => {
            const { container } = render(<Dashboard />, {
                container: appContainer(),
                wrapper: routerWrapper(['/link-1']),
            });
            await wait();
            expect(container.querySelectorAll('.submission-entry')).toHaveLength(2);
            const startSubmissionButton = container.querySelector('.dashboard__button_container button');
            fireEvent.click(startSubmissionButton);
            expect(container.querySelector('.article-type')).toBeInTheDocument();
        });

        it('should not add a submission when cancel button clicked', async (): Promise<void> => {
            const { container, getByText } = render(<Dashboard />, {
                container: appContainer(),
                wrapper: routerWrapper(['/link-1']),
            });
            await wait();
            expect(container.querySelectorAll('.submission-entry')).toHaveLength(2);
            const startSubmissionButton = container.querySelector('.dashboard__button_container button');
            fireEvent.click(startSubmissionButton);
            fireEvent.click(getByText('cancel-button'));
            await wait();
            expect(container.querySelectorAll('.submission-entry')).toHaveLength(2);
        });

        it('should remove a submission when delete button clicked through modal', async (): Promise<void> => {
            const { container, getByText } = render(<Dashboard />, {
                container: appContainer(),
                wrapper: routerWrapper(['/link-1']),
            });
            await wait();
            expect(container.querySelectorAll('.submission-entry')).toHaveLength(2);
            expect(getByText('Submission - A')).toBeInTheDocument();
            expect(getByText('Submission - B')).toBeInTheDocument();
            const submissions = container.querySelectorAll('.submission-entry');
            submissions.forEach(entry => {
                if (entry.textContent.includes('Submission - A')) {
                    fireEvent.click(entry.querySelector('.submission-entry__icon'));
                    fireEvent.click(getByText('modal--default-button'));
                }
            });
            await wait();
            expect(mockMutation).toHaveBeenCalledTimes(1);
        });
    });
});
