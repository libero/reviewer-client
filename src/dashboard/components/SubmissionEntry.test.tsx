import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, render, RenderResult, fireEvent } from '@testing-library/react';
import SubmissionEntry from './SubmissionEntry';
import { Submission } from '../../initial-submission/types';
import routerWrapper from '../../../test-utils/routerWrapper';
import appContainer from '../../../test-utils/appContainer';

const nowISOString = new Date().toISOString();

describe('SubmissionEntry', (): void => {
    afterEach(cleanup);

    const mockSubmission: Submission = {
        author: undefined,
        id: 'someId',
        articleType: 'research-article',
        manuscriptDetails: {
            title: 'testSubmission',
        },
        lastStepVisited: '/submit/someId/someStep',
        status: 'CONTINUE_SUBMISSION',
        updated: nowISOString,
    };

    const mockSubmissionNoTitle: Submission = {
        id: 'someId',
        manuscriptDetails: {
            title: '',
        },
        articleType: 'research-article',
        lastStepVisited: '/submit/someId/someStep',
        status: 'CONTINUE_SUBMISSION',
        updated: nowISOString,
        author: undefined,
    };

    const getMockSubmissionForStatus = (status: string): Submission => ({
        id: 'someId',
        manuscriptDetails: {
            title: '',
        },
        articleType: 'research-article',
        lastStepVisited: '/submit/someId/someStep',
        status: status,
        updated: nowISOString,
        author: undefined,
    });

    const getMockSubmissionForDaysAgo = (daysAgo: number): Submission => {
        const date = new Date();
        date.setDate(new Date().getDate() - daysAgo);
        return {
            id: 'someId',
            manuscriptDetails: {
                title: '',
            },
            articleType: 'research-article',
            lastStepVisited: '/submit/someId/someStep',
            status: 'CONTINUE_SUBMISSION',
            updated: date.toISOString(),
            author: undefined,
        };
    };

    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(
                    <SubmissionEntry
                        submission={mockSubmission}
                        onDelete={jest.fn}
                        toggleArticleType={jest.fn()}
                        setNoArticleTypeId={jest.fn()}
                    />,
                    {
                        wrapper: routerWrapper(['/link-1']),
                    },
                ),
        ).not.toThrow();
    });

    it('should render the correct classes for unfinished submissions', (): void => {
        const { container } = render(
            <SubmissionEntry
                submission={getMockSubmissionForStatus('CONTINUE_SUBMISSION')}
                onDelete={jest.fn}
                toggleArticleType={jest.fn()}
                setNoArticleTypeId={jest.fn()}
            />,
            {
                wrapper: routerWrapper(['/link-1']),
            },
        );
        expect(container.querySelector('.submission-entry__link--continue_submission')).toBeInTheDocument();
        expect(container.querySelector('.submission-entry__title--continue_submission')).toBeInTheDocument();
        expect(container.querySelector('.submission-entry__link_text--continue_submission')).toBeInTheDocument();
    });

    it('should render the correct classes for submitted submissions', (): void => {
        const { container } = render(
            <SubmissionEntry
                submission={getMockSubmissionForStatus('SUBMITTED')}
                onDelete={jest.fn}
                toggleArticleType={jest.fn()}
                setNoArticleTypeId={jest.fn()}
            />,
            {
                wrapper: routerWrapper(['/link-1']),
            },
        );
        expect(container.querySelector('.submission-entry__link--submitted')).toBeInTheDocument();
        expect(container.querySelector('.submission-entry__title--submitted')).toBeInTheDocument();
        expect(container.querySelector('.submission-entry__link_text--submitted')).toBeInTheDocument();
    });

    it('on click should be prevented for submitted submissions', (): void => {
        const { container } = render(
            <SubmissionEntry
                submission={getMockSubmissionForStatus('SUBMITTED')}
                onDelete={jest.fn}
                toggleArticleType={jest.fn()}
                setNoArticleTypeId={jest.fn()}
            />,
            {
                wrapper: routerWrapper(['/link-1']),
            },
        );
        expect(container.querySelector('.submission-entry__link--submitted')).toBeInTheDocument();
        expect(container.querySelector('.submission-entry__title--submitted')).toBeInTheDocument();
        expect(container.querySelector('.submission-entry__link_text--submitted')).toBeInTheDocument();
        fireEvent.click(container.querySelector('.submission-entry__link--submitted'));
        expect(container.querySelector('.submission-entry__link--submitted')).toBeInTheDocument();
    });

    it('should render the correct classes for rejected submissions', (): void => {
        const { container } = render(
            <SubmissionEntry
                submission={getMockSubmissionForStatus('REJECTED')}
                onDelete={jest.fn}
                toggleArticleType={jest.fn()}
                setNoArticleTypeId={jest.fn()}
            />,
            {
                wrapper: routerWrapper(['/link-1']),
            },
        );
        expect(container.querySelector('.submission-entry__link--rejected')).toBeInTheDocument();
        expect(container.querySelector('.submission-entry__title--rejected')).toBeInTheDocument();
        expect(container.querySelector('.submission-entry__link_text--rejected')).toBeInTheDocument();
    });

    it('should render the correct route for the submission', (): void => {
        const { container } = render(
            <SubmissionEntry
                submission={mockSubmission}
                onDelete={jest.fn}
                toggleArticleType={jest.fn()}
                setNoArticleTypeId={jest.fn()}
            />,
            {
                wrapper: routerWrapper(['/link-1']),
            },
        );
        expect(container.querySelector('a.submission-entry__link')).toHaveAttribute(
            'href',
            mockSubmission.lastStepVisited,
        );
    });

    it('should render the correct title for the submission', (): void => {
        const { container } = render(
            <SubmissionEntry
                submission={mockSubmission}
                onDelete={jest.fn}
                toggleArticleType={jest.fn()}
                setNoArticleTypeId={jest.fn()}
            />,
            {
                wrapper: routerWrapper(['/link-1']),
            },
        );
        expect(container.querySelector('span.submission-entry__title')).toHaveTextContent(
            mockSubmission.manuscriptDetails.title,
        );
    });

    it('should render the correct title if the submission has none', (): void => {
        const { container } = render(
            <SubmissionEntry
                submission={mockSubmissionNoTitle}
                onDelete={jest.fn}
                toggleArticleType={jest.fn()}
                setNoArticleTypeId={jest.fn()}
            />,
            {
                wrapper: routerWrapper(['/link-1']),
            },
        );
        expect(container.querySelector('span.submission-entry__title')).toHaveTextContent('no-title');
    });

    it('should render the submissions updated time as a readable string', (): void => {
        const { container, rerender } = render(
            <SubmissionEntry
                submission={mockSubmissionNoTitle}
                onDelete={jest.fn}
                toggleArticleType={jest.fn()}
                setNoArticleTypeId={jest.fn()}
            />,
            {
                wrapper: routerWrapper(['/link-1']),
            },
        );
        expect(container.querySelector('.submission-entry__dates > time:first-child')).toHaveTextContent('Today');
        rerender(
            <SubmissionEntry
                submission={getMockSubmissionForDaysAgo(1)}
                onDelete={jest.fn}
                toggleArticleType={jest.fn()}
                setNoArticleTypeId={jest.fn()}
            />,
        );
        expect(container.querySelector('.submission-entry__dates > time:first-child')).toHaveTextContent('Yesterday');
        rerender(
            <SubmissionEntry
                submission={getMockSubmissionForDaysAgo(14)}
                onDelete={jest.fn}
                toggleArticleType={jest.fn()}
                setNoArticleTypeId={jest.fn()}
            />,
        );
        expect(container.querySelector('.submission-entry__dates > time:first-child')).toHaveTextContent('2 weeks ago');
    });

    it('should not render the modal on first render', (): void => {
        const { baseElement } = render(
            <SubmissionEntry
                submission={mockSubmission}
                onDelete={jest.fn}
                toggleArticleType={jest.fn()}
                setNoArticleTypeId={jest.fn()}
            />,
            {
                wrapper: routerWrapper(['/link-1']),
            },
        );
        expect(baseElement.querySelector('.modal__overlay')).not.toBeInTheDocument();
    });

    it('should render the modal on delete click', (): void => {
        const { baseElement } = render(
            <SubmissionEntry
                submission={mockSubmission}
                onDelete={jest.fn}
                toggleArticleType={jest.fn()}
                setNoArticleTypeId={jest.fn()}
            />,
            {
                wrapper: routerWrapper(['/link-1']),
                container: appContainer(),
            },
        );
        fireEvent.click(baseElement.querySelector('.submission-entry__icon'));
        expect(baseElement.querySelector('.modal__overlay')).toBeInTheDocument();
    });

    it('should call onDelete function on modal button click', (): void => {
        const onDelete = jest.fn();
        const { baseElement, getByText } = render(
            <SubmissionEntry
                submission={mockSubmission}
                onDelete={onDelete}
                toggleArticleType={jest.fn()}
                setNoArticleTypeId={jest.fn()}
            />,
            {
                wrapper: routerWrapper(['/link-1']),
                container: appContainer(),
            },
        );
        fireEvent.click(baseElement.querySelector('.submission-entry__icon'));
        expect(onDelete).not.toBeCalled();
        fireEvent.click(getByText('modal--default-button'));
        expect(onDelete).toBeCalled();
    });

    it('should output the updated value as `ddd D MMM YYYY`', () => {
        const submissionWithDate = {
            id: 'someId',
            lastStepVisited: '/submit/someId/someStep',
            articleType: 'research-article',
            updated: '2020-06-22T13:24:09.199Z',
        };
        const { getByText } = render(
            <SubmissionEntry
                submission={submissionWithDate}
                onDelete={jest.fn()}
                toggleArticleType={jest.fn()}
                setNoArticleTypeId={jest.fn()}
            />,
            {
                wrapper: routerWrapper(['/link-1']),
                container: appContainer(),
            },
        );
        expect(getByText('Mon 22 Jun 2020')).toBeInTheDocument();
    });

    it('calls setNoArticleTypeId and toggleArticleType when submission has no articleType', () => {
        const submissionWithNoArticleType = {
            id: 'someId',
            lastStepVisited: '/submit/someId/someStep',
            updated: '2020-06-22T13:24:09.199Z',
        };
        const toggleArticleTypeMock = jest.fn();
        const setNoArticleTypeIdMock = jest.fn();

        const { container } = render(
            <SubmissionEntry
                submission={submissionWithNoArticleType}
                onDelete={jest.fn()}
                toggleArticleType={toggleArticleTypeMock}
                setNoArticleTypeId={setNoArticleTypeIdMock}
            />,
            {
                wrapper: routerWrapper(['/link-1']),
                container: appContainer(),
            },
        );
        fireEvent.click(container.querySelector('.submission-entry__link'));
        expect(setNoArticleTypeIdMock).toBeCalledWith('someId');
        expect(toggleArticleTypeMock).toBeCalled();
    });

    it("calls doesn't call setNoArticleTypeId and toggleArticleType when submission has articleType", () => {
        const submissionWithNoArticleType = {
            id: 'someId',
            articleType: 'articleType',
            lastStepVisited: '/submit/someId/someStep',
            updated: '2020-06-22T13:24:09.199Z',
        };
        const toggleArticleTypeMock = jest.fn();
        const setNoArticleTypeIdMock = jest.fn();

        const { container } = render(
            <SubmissionEntry
                submission={submissionWithNoArticleType}
                onDelete={jest.fn()}
                toggleArticleType={toggleArticleTypeMock}
                setNoArticleTypeId={setNoArticleTypeIdMock}
            />,
            {
                wrapper: routerWrapper(['/link-1']),
                container: appContainer(),
            },
        );
        fireEvent.click(container.querySelector('.submission-entry__link'));
        expect(setNoArticleTypeIdMock).not.toBeCalled();
        expect(toggleArticleTypeMock).not.toBeCalled();
    });
});
