import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import SubmissionList from './SubmissionList';
import { Submission } from '../../initial-submission/types';
import routerWrapper from '../../../test-utils/routerWrapper';
import appContainer from '../../../test-utils/appContainer';

describe('SubmissionList', (): void => {
    afterEach(cleanup);

    const mockSubmission: Submission = {
        id: 'someId',
        articleType: 'research-article',
        lastStepVisited: 'someStep',
        status: 'CONTINUE_SUBMISSION',
        updated: new Date().getTime(),
        author: undefined,
    };

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(<SubmissionList submissions={[mockSubmission]} onDelete={jest.fn} />, {
                    wrapper: routerWrapper(['/link-1']),
                }),
        ).not.toThrow();
    });

    it('should render empty list message correctly', (): void => {
        const { getByText } = render(<SubmissionList submissions={[]} onDelete={jest.fn} />, {
            wrapper: routerWrapper(['/link-1']),
        });
        expect(getByText("You don't have any submissions. Maybe you should make one?")).toBeInTheDocument();
    });

    it('should pass the correct options object to each entries onDelete function', (): void => {
        const onDelete = jest.fn();
        const { baseElement, getByText } = render(
            <SubmissionList submissions={[mockSubmission]} onDelete={onDelete} />,
            {
                wrapper: routerWrapper(['/link-1']),
                container: appContainer(),
            },
        );

        fireEvent.click(baseElement.querySelectorAll('.submission-entry__icon')[0]);
        expect(onDelete).not.toBeCalled();
        fireEvent.click(getByText('modal--default-button'));
        expect(onDelete).toBeCalledWith({ variables: { id: 'someId' } });
    });
});
