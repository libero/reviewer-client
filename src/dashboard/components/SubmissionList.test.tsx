import React from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import SubmissionList from './SubmissionList';
import { Submission } from '../../initial-submission/types';
import { deleteSubmissionMutation } from '../graphql';
import combineWrappers from '../../../test-utils/combineWrappers';
import routerWrapper from '../../../test-utils/routerWrapper';
import apolloWrapper from '../../../test-utils/apolloWrapper';

describe('SubmissionList', (): void => {
    afterEach(cleanup);

    const mockSubmission: Submission = {
        id: 'someId',
        title: 'testSubmission',
        lastStepVisited: 'someStep',
        status: 'CONTINUE_SUBMISSION',
        updated: new Date().getTime(),
    };

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(<SubmissionList submissions={[mockSubmission]} />, {
                    wrapper: combineWrappers(
                        routerWrapper(['/link-1']),
                        apolloWrapper([
                            {
                                request: {
                                    query: deleteSubmissionMutation,
                                    variables: { id: 'someId' },
                                },
                            },
                        ]),
                    ),
                }),
        ).not.toThrow();
    });

    it('should render empty list message correctly', (): void => {
        const { getByText } = render(<SubmissionList submissions={[]} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(getByText("You don't have any submissions. Maybe you should make one?")).toBeInTheDocument();
    });
});
