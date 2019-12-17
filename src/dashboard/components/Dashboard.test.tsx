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
        // flush graphql fetch promise
        await setTimeout(() => {});
        const testElement = await findByText('testdiv');
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
        // flush graphql fetch promise
        await setTimeout(() => {});
        const testElement = await findByText('Submissions');
        expect(testElement).toBeInTheDocument();
    });
});
