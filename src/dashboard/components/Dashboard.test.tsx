import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, render, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import routerWrapper from '../../../test-utils/routerWrapper';
import appContainer from '../../../test-utils/appContainer';

import Dashboard from './Dashboard';

let submissions: object[] = [];
const mockMutation = jest.fn();

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
            await waitFor(() => {});
            expect(container.querySelector('.no-submissions')).toBeInTheDocument();
        });

        it('should not show the article type page when new submission button clicked', async (): Promise<void> => {
            const { container } = render(<Dashboard />, {
                wrapper: routerWrapper(['/link-1']),
            });
            await waitFor(() => {});
            const startSubmissionButton = container.querySelector('.no-submissions__buttons button');
            fireEvent.click(startSubmissionButton);
            expect(container.querySelector('.article-type')).not.toBeInTheDocument();
        });

        it.skip('should return the user to the NoSubmissions page when the cancel button is clicked', async (): Promise<
            // this should now be unreachable
            void
        > => {
            const { container, getByText } = render(<Dashboard />, {
                wrapper: routerWrapper(['/link-1']),
            });
            await waitFor(() => {});
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
                    lastStepVisited: '/submit/A/author',
                    articleType: 'foo',
                    manuscriptDetails: {
                        title: 'Submission - A',
                    },
                    updated: Date.now(),
                    status: 'CONTINUE_SUBMISSION',
                },
                {
                    id: 'B',
                    lastStepVisited: '/submit/B/author',
                    articleType: 'foo',
                    manuscriptDetails: {
                        title: 'Submission - B',
                    },
                    updated: Date.now(),
                    status: 'CONTINUE_SUBMISSION',
                },
            ];
        });
        it('should render the standard dashboard page if there are submissions', async (): Promise<void> => {
            const { container } = render(<Dashboard />, {
                wrapper: routerWrapper(['/link-1']),
            });
            await waitFor(() => {});
            expect(container.querySelector('.dashboard')).toBeInTheDocument();
        });

        it('should not show the ArticleType page when the new submission button is clicked', async (): Promise<
            void
        > => {
            const { container } = render(<Dashboard />, {
                container: appContainer(),
                wrapper: routerWrapper(['/link-1']),
            });
            await waitFor(() => {});
            expect(container.querySelectorAll('.submission-entry')).toHaveLength(2);
            const startSubmissionButton = container.querySelector('.dashboard__button_container button');
            fireEvent.click(startSubmissionButton);
            expect(container.querySelector('.article-type')).not.toBeInTheDocument();
        });

        it.skip('should not add a submission when cancel button clicked', async (): Promise<void> => {
            // article type page should be unreachable
            const { container, getByText } = render(<Dashboard />, {
                container: appContainer(),
                wrapper: routerWrapper(['/link-1']),
            });
            await waitFor(() => {});
            expect(container.querySelectorAll('.submission-entry')).toHaveLength(2);
            const startSubmissionButton = container.querySelector('.dashboard__button_container button');
            fireEvent.click(startSubmissionButton);
            fireEvent.click(getByText('cancel-button'));
            await waitFor(() => {});
            expect(container.querySelectorAll('.submission-entry')).toHaveLength(2);
        });

        it('should remove a submission when delete button clicked through modal', async (): Promise<void> => {
            const { container, getByText } = render(<Dashboard />, {
                container: appContainer(),
                wrapper: routerWrapper(['/link-1']),
            });
            await waitFor(() => {});
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
            await waitFor(() => {});
            expect(mockMutation).toHaveBeenCalledTimes(1);
        });
    });

    describe('No articleType dashboard entry', () => {
        beforeEach(() => {
            submissions = [
                {
                    id: 'A',
                    lastStepVisited: '/submit/A/author',
                    manuscriptDetails: {
                        title: 'Submission - A',
                    },
                    updated: Date.now(),
                    status: 'CONTINUE_SUBMISSION',
                },
            ];
        });

        it('displays the article type page on click of a submission if no articleType exists', async (): Promise<
            void
        > => {
            const { container } = render(<Dashboard />, {
                container: appContainer(),
                wrapper: routerWrapper(['/link-1']),
            });
            await waitFor(() => {});
            expect(container.querySelector('.article-type')).not.toBeInTheDocument();
            fireEvent.click(container.querySelectorAll('.submission-entry__link')[0]);
            expect(container.querySelector('.article-type')).toBeInTheDocument();
        });

        it('calls savearticleType with the correct params', async (): Promise<void> => {
            mockMutation.mockImplementation(
                () =>
                    new Promise(resolve =>
                        resolve({
                            data: {
                                saveArticleType: {
                                    id: 'testid',
                                    manuscriptDetails: {
                                        title: '',
                                    },
                                    updated: '2020-01-01T00:00:00.000Z',
                                    articleType: 'research-article',
                                    lastStepVisited: '/submit/testid/somewhere',
                                },
                            },
                        }),
                    ),
            );
            const { container, getByText } = render(<Dashboard />, {
                container: appContainer(),
                wrapper: routerWrapper(['/link-1']),
            });
            await waitFor(() => {});
            expect(container.querySelector('.article-type')).not.toBeInTheDocument();
            fireEvent.click(container.querySelectorAll('.submission-entry__link')[0]);
            fireEvent.keyDown(container.querySelector('.select-field__input'), { key: 'ArrowDown', keyCode: 40 });
            await waitFor((): Element => getByText('feature.label'));
            fireEvent.click(getByText('feature.label'));
            fireEvent.click(getByText('confirm-button'));
            await waitFor(() => {});
            expect(mockMutation).toHaveBeenCalledWith({ variables: { articleType: 'feature', id: 'A' } });
        });
    });
});
