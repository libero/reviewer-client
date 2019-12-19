import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { Submission } from '../../initial-submission/types';
import combineWrappers from '../../../test-utils/combineWrappers';
import routerWrapper from '../../../test-utils/routerWrapper';
import apolloWrapper from '../../../test-utils/apolloWrapper';

import Dashboard from './Dashboard';
import { getSubmissionsQuery } from '../graphql';
import { MockedResponse } from '@apollo/react-testing';
import { debug } from 'webpack';
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
        console.error = (...args: unknown[]) => {
            if (/Warning.*not wrapped in act/.test(args[0] as string)) {
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
        const { container, debug } = render(<Dashboard />, {
            wrapper: combineWrappers(apolloWrapper(generateMockQueryResponse([])), routerWrapper(['/link-1'])),
        });
        // flush graphql fetch promise
        await new Promise(resolve => setTimeout(resolve));
        const testElement = await container.querySelector('.no-submissions');
        expect(testElement).toBeInTheDocument();
    });

    it('should render the standard dashboard page if there are submissions', async (): Promise<void> => {
        const sampleSub = {
            id: '1234',
            title: 'Effects of Caffeine on Software Developers',
            updated: Date.now(),
        };
        const { container } = render(<Dashboard />, {
            wrapper: combineWrappers(apolloWrapper(generateMockQueryResponse([sampleSub])), routerWrapper(['/link-1'])),
        });
        // flush graphql fetch promise
        await new Promise(resolve => setTimeout(resolve));
        const testElement = await container.querySelector('.dashboard');
        expect(testElement).toBeInTheDocument();
    });
});
