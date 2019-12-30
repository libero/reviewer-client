import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { Submission } from '../../initial-submission/types';
import combineWrappers from '../../../test-utils/combineWrappers';
import routerWrapper from '../../../test-utils/routerWrapper';
import apolloWrapper from '../../../test-utils/apolloWrapper';

import Dashboard from './Dashboard';
import { getSubmissionsQuery } from '../graphql';
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

    it('should render the no-submissions page if there are no submissions', async (): Promise<void> => {
        const { findByText } = render(<Dashboard />, {
            wrapper: combineWrappers(apolloWrapper(generateMockQueryResponse([])), routerWrapper(['/link-1'])),
        });
        const testElement = await findByText('new-system-1');
        expect(testElement).toBeInTheDocument();
    });

    it('should render the standard dashboard page if there are submissions', async (): Promise<void> => {
        const sampleSub = {
            id: '1234',
            title: 'Effects of Caffeine on Software Developers',
            updated: Date.now(),
        };
        const { findByText } = render(<Dashboard />, {
            wrapper: combineWrappers(apolloWrapper(generateMockQueryResponse([sampleSub])), routerWrapper(['/link-1'])),
        });
        const testElement = await findByText('Submissions');
        expect(testElement).toBeInTheDocument();
    });
});
