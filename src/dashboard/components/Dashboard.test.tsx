import React from 'react';
import { cleanup, render, RenderResult, fireEvent, wait } from '@testing-library/react';
import { Submission } from '../../initial-submission/types';
import combineWrappers from '../../../test-utils/combineWrappers';
import routerWrapper from '../../../test-utils/routerWrapper';
import apolloWrapper from '../../../test-utils/apolloWrapper';
import appContainer from '../../../test-utils/appContainer';

import Dashboard from './Dashboard';
import { getSubmissionsQuery, startSubmissionMutation } from '../graphql';
import { MockedResponse } from '@apollo/react-testing';

const generateMockQueryResponse = (subs: Submission[]): MockedResponse[] => {
    return [
        {
            request: {
                query: getSubmissionsQuery,
            },
            result: {
                data: {
                    getSubmissions: subs,
                },
            },
        },
        {
            request: {
                query: startSubmissionMutation,
                variables: { articleType: 'researchArticle' },
            },
            result: {
                data: {
                    startSubmission: {
                        id: 'testid',
                        title: '',
                        updated: '2020-01-01T00:00:00.000Z',
                    },
                },
            },
        },
    ];
};

describe('Dashboard', (): void => {
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
                    wrapper: combineWrappers(apolloWrapper(generateMockQueryResponse([])), routerWrapper(['/link-1'])),
                }),
        ).not.toThrow();
    });

    describe('No Submissions', () => {
        it('should render the no-submissions page if there are no submissions', async (): Promise<void> => {
            const { container } = render(<Dashboard />, {
                wrapper: combineWrappers(apolloWrapper(generateMockQueryResponse([])), routerWrapper(['/link-1'])),
            });
            await wait();
            expect(container.querySelector('.no-submissions')).toBeInTheDocument();
        });

        it('should add a submission then display the full dashboard when start submission button clicked', async (): Promise<
            void
        > => {
            const { container } = render(<Dashboard />, {
                wrapper: combineWrappers(apolloWrapper(generateMockQueryResponse([])), routerWrapper(['/link-1'])),
            });
            await wait();
            const startSubmissionButton = container.querySelector('.no-submissions__buttons button');
            fireEvent.click(startSubmissionButton);
            expect(container.querySelector('.article-type')).toBeInTheDocument();
        });

        it('should add a submission then display the full dashboard when start submission button clicked', async (): Promise<
            void
        > => {
            const { container, getByText } = render(<Dashboard />, {
                wrapper: combineWrappers(apolloWrapper(generateMockQueryResponse([])), routerWrapper(['/link-1'])),
            });
            await wait();
            const startSubmissionButton = container.querySelector('.no-submissions__buttons button');
            fireEvent.click(startSubmissionButton);
            fireEvent.click(getByText('confirm-button'));
            await wait();
            expect(container.querySelector('.dashboard')).toBeInTheDocument();
            expect(container.querySelectorAll('.submission-entry')).toHaveLength(1);
        });

        it('should return the user to the NoSubmissions page when the cancel button is clicked', async (): Promise<
            void
        > => {
            const { container, getByText } = render(<Dashboard />, {
                wrapper: combineWrappers(apolloWrapper(generateMockQueryResponse([])), routerWrapper(['/link-1'])),
            });
            await wait();
            const startSubmissionButton = container.querySelector('.no-submissions__buttons button');
            fireEvent.click(startSubmissionButton);
            fireEvent.click(getByText('cancel-button'));
            expect(container.querySelector('.no-submissions')).toBeInTheDocument();
        });
    });

    describe('Dashboard with submissions', () => {
        const sampleSub = {
            id: '1234',
            title: 'Effects of Caffeine on Software Developers',
            updated: Date.now(),
        };

        it('should render the standard dashboard page if there are submissions', async (): Promise<void> => {
            const { container } = render(<Dashboard />, {
                wrapper: combineWrappers(
                    apolloWrapper(generateMockQueryResponse([sampleSub])),
                    routerWrapper(['/link-1']),
                ),
            });
            await wait();
            expect(container.querySelector('.dashboard')).toBeInTheDocument();
        });

        it('should show the ArticleType page when the new submission button is clicked', async (): Promise<void> => {
            const { container } = render(<Dashboard />, {
                container: appContainer(),
                wrapper: combineWrappers(
                    apolloWrapper(generateMockQueryResponse([sampleSub])),
                    routerWrapper(['/link-1']),
                ),
            });
            await wait();
            expect(container.querySelectorAll('.submission-entry')).toHaveLength(1);
            const startSubmissionButton = container.querySelector('.dashboard__button_container button');
            fireEvent.click(startSubmissionButton);
            expect(container.querySelector('.article-type')).toBeInTheDocument();
        });

        it('should add a submission when start submission button clicked', async (): Promise<void> => {
            const { container, getByText } = render(<Dashboard />, {
                container: appContainer(),
                wrapper: combineWrappers(
                    apolloWrapper(generateMockQueryResponse([sampleSub])),
                    routerWrapper(['/link-1']),
                ),
            });
            await wait();
            expect(container.querySelectorAll('.submission-entry')).toHaveLength(1);
            const startSubmissionButton = container.querySelector('.dashboard__button_container button');
            fireEvent.click(startSubmissionButton);
            fireEvent.click(getByText('confirm-button'));
            await wait();
            expect(container.querySelectorAll('.submission-entry')).toHaveLength(2);
        });

        it('should not add a submission when cancel button clicked', async (): Promise<void> => {
            const { container, getByText } = render(<Dashboard />, {
                container: appContainer(),
                wrapper: combineWrappers(
                    apolloWrapper(generateMockQueryResponse([sampleSub])),
                    routerWrapper(['/link-1']),
                ),
            });
            await wait();
            expect(container.querySelectorAll('.submission-entry')).toHaveLength(1);
            const startSubmissionButton = container.querySelector('.dashboard__button_container button');
            fireEvent.click(startSubmissionButton);
            fireEvent.click(getByText('cancel-button'));
            await wait();
            expect(container.querySelectorAll('.submission-entry')).toHaveLength(1);
        });
    });
});
