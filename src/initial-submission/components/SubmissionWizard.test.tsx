import '../../../test-utils/i18n-mock';
import { cleanup, render, fireEvent, RenderResult, act } from '@testing-library/react';
import routerWrapper from '../../../test-utils/routerWrapper';
import routeWrapper from '../../../test-utils/routeWrapper';
import SubmissionWizard from './SubmissionWizard';

let loading = false;
jest.mock('@apollo/react-hooks', () => ({
    useQuery: (): object => {
        return {
            data: {
                getCurrentUser: {
                    name: 'Blogs, Joe',
                    email: 'joe@blogs.com',
                    aff: 'somewhere',
                },
                getSubmission: {
                    id: 'some-id',
                    updated: 42,
                    articleType: 'fiction',
                },
            },
            loading: loading,
        };
    },
    useMutation: (): object[] => {
        return [
            jest.fn(),
            {
                loading: false,
            },
        ];
    },
    useSubscription: (): object[] => {
        return [
            jest.fn(),
            {
                loading: false,
            },
        ];
    },
}));

describe('SubmissionWizard', (): void => {
    afterEach(cleanup);
    beforeEach(() => {
        loading = false;
    });

    it('should render correctly', (): void => {
        const { component } = routeWrapper(SubmissionWizard, { path: '/submit/:id' });
        expect((): RenderResult => render(component, { wrapper: routerWrapper() })).not.toThrow();
    });

    it('should display loading text when the query is still loading', (): void => {
        loading = true;
        const { component } = routeWrapper(SubmissionWizard, { path: '/submit/:id/:step' });
        const { getByText } = render(component, { wrapper: routerWrapper(['/submit/id/author']) });
        expect(getByText('loading...')).toBeInTheDocument();
    });

    describe('Step navigation', (): void => {
        it('should redirect to author step if no step path given', (): void => {
            const { component, getProps } = routeWrapper(SubmissionWizard, { path: '/submit/:id/:step' });
            render(component, { wrapper: routerWrapper(['/submit/id/author']) });
            expect(getProps().location.pathname).toBe('/submit/id/author');
        });
        // when we introduce form validation we should inject the schema at the Routes.tsx level this will allow these tests to work by passing an empty validation schema
        const testNavigationButtons = async (
            buttonText: string,
            currentStep: string,
            expectedNextStep: string,
            enterDetails?: (container: HTMLElement) => void,
        ): Promise<void> => {
            const { component, getProps } = routeWrapper(SubmissionWizard, { path: '/submit/:id/:step' });
            const { getByText, container } = render(component, {
                wrapper: routerWrapper([`/submit/id/${currentStep}`]),
            });
            expect(getProps().location.pathname).toBe(`/submit/id/${currentStep}`);
            if (enterDetails) {
                enterDetails(container);
            }
            await act(async () => await fireEvent.click(getByText(buttonText)));
            expect(getProps().location.pathname).toBe(`/submit/id/${expectedNextStep}`);
        };

        const nextButtonText = 'next';
        const backButtonText = 'back';

        it('clicking Next on Author step takes you to Files', (): void => {
            const enterDetails = (container: HTMLElement): void => {
                fireEvent.input(container.querySelector('#firstName'), {
                    target: { value: 'Bob' },
                });
                fireEvent.input(container.querySelector('#lastName'), {
                    target: { value: 'Ross' },
                });
                fireEvent.input(container.querySelector('#email'), {
                    target: { value: 'bob@ross.com' },
                });
                fireEvent.input(container.querySelector('#institution'), {
                    target: { value: 'HappyLittleTrees inc' },
                });
            };
            testNavigationButtons(nextButtonText, 'author', 'files', enterDetails);
        });
        it('clicking Next on Author step remains on the Author page when invalid', async (): Promise<void> => {
            const { component, getProps } = routeWrapper(SubmissionWizard, { path: '/submit/:id/:step' });
            const { getByText, container } = render(component, {
                wrapper: routerWrapper(['/submit/id/author']),
            });
            expect(getProps().location.pathname).toBe('/submit/id/author');
            fireEvent.input(container.querySelector('#firstName'), {
                target: { value: 'Bob' },
            });
            fireEvent.input(container.querySelector('#lastName'), {
                target: { value: 'Ross' },
            });
            fireEvent.input(container.querySelector('#email'), {
                target: { value: 'bob@ross.com' },
            });
            await act(async () => await fireEvent.click(getByText(nextButtonText)));
            expect(getProps().location.pathname).toBe(`/submit/id/author`);
            expect(getByText('author.validation.institution-required', { exact: false })).toBeInTheDocument();
        });
        it('clicking Next on Files step takes you to Details', (): void => {
            const enterDetails = (container: HTMLElement): void => {
                fireEvent.input(container.querySelector('.cover-letter__input'), {
                    target: { value: 'This is my article, publish it now!' },
                });
            };
            testNavigationButtons(nextButtonText, 'files', 'details', enterDetails);
        });
        it('clicking Next on Files step remains on the Files page when invalid', async (): Promise<void> => {
            const { component, getProps } = routeWrapper(SubmissionWizard, { path: '/submit/:id/:step' });
            const { getByText } = render(component, {
                wrapper: routerWrapper(['/submit/id/files']),
            });
            expect(getProps().location.pathname).toBe('/submit/id/files');
            await act(async () => await fireEvent.click(getByText(nextButtonText)));
            expect(getProps().location.pathname).toBe('/submit/id/files');
            expect(getByText('files.validation.coverletter-required', { exact: false })).toBeInTheDocument();
        });
        it('clicking Back on Details step takes you to Files', (): void => {
            testNavigationButtons(backButtonText, 'details', 'files');
        });
        it('clicking Back on Files step takes you to Author', (): void => {
            testNavigationButtons(backButtonText, 'files', 'author');
        });
    });
});
