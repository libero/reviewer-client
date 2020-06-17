import '../../../test-utils/i18n-mock';
import { cleanup, render, fireEvent, RenderResult, waitFor } from '@testing-library/react';
import * as yup from 'yup';
import routerWrapper from '../../../test-utils/routerWrapper';
import routeWrapper from '../../../test-utils/routeWrapper';
import SubmissionWizard from './SubmissionWizard';
import appContainer from '../../../test-utils/appContainer';
import {
    AuthorDetailsSchema,
    DetailsSchema,
    DisclosureSchema,
    EditorsSchema,
    FileDetailsSchema,
} from '../utils/validationSchemas';

jest.mock('../utils/validationSchemas', () => ({
    AuthorDetailsSchema: jest.fn(() => yup.object()),
    DetailsSchema: jest.fn(() => yup.object()),
    DisclosureSchema: jest.fn(() => yup.object()),
    EditorsSchema: jest.fn(() => yup.object()),
    FileDetailsSchema: jest.fn(() => yup.object()),
}));

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
                getEditors: [],
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

    const nextButtonText = 'navigation.next';
    const backButtonText = 'navigation.back';

    // when we introduce form validation we should inject the schema at the Routes.tsx level this will allow these tests to work by passing an empty validation schema
    const testNavigationButtons = async (
        buttonText: string,
        currentStep: string,
        expectedNextStep: string,
    ): Promise<void> => {
        const { component, getProps } = routeWrapper(SubmissionWizard, { path: '/submit/:id/:step' });
        const { getByText } = render(component, {
            wrapper: routerWrapper([`/submit/id/${currentStep}`]),
        });
        expect(getProps().location.pathname).toBe(`/submit/id/${currentStep}`);
        fireEvent.click(getByText(buttonText));
        await waitFor(() => {});
        expect(getProps().location.pathname).toBe(`/submit/id/${expectedNextStep}`);
    };

    describe('Step navigation', (): void => {
        it('should redirect to author step if no step path given', (): void => {
            const { component, getProps } = routeWrapper(SubmissionWizard, { path: '/submit/:id/:step' });
            render(component, { wrapper: routerWrapper(['/submit/id/author']) });
            expect(getProps().location.pathname).toBe('/submit/id/author');
        });

        it('clicking Next on Author step takes you to Files', async (): Promise<void> => {
            await testNavigationButtons(nextButtonText, 'author', 'files');
        });
        it('clicking Next on Author step remains on the Author page when invalid', async (): Promise<void> => {
            (AuthorDetailsSchema as jest.Mock).mockImplementationOnce(() =>
                yup.object().shape({
                    firstName: yup.string().test('fail', 'fail', () => false),
                }),
            );
            await testNavigationButtons(nextButtonText, 'author', 'author');
        });
        it('clicking Next on Files step takes you to Details', async (): Promise<void> => {
            await testNavigationButtons(nextButtonText, 'files', 'details');
        });
        it('clicking Next on Files step remains on the Files page when invalid', async (): Promise<void> => {
            (FileDetailsSchema as jest.Mock).mockImplementationOnce(() =>
                yup.object().shape({
                    coverLetter: yup.string().test('fail', 'fail', () => false),
                }),
            );
            await testNavigationButtons(nextButtonText, 'files', 'files');
        });
        it('clicking Next on Details step takes you to Editors', async (): Promise<void> => {
            await testNavigationButtons(nextButtonText, 'details', 'editors');
        });
        it('clicking Next on Details step remains on the Details page when invalid', async (): Promise<void> => {
            (DetailsSchema as jest.Mock).mockImplementationOnce(() =>
                yup.object().shape({
                    title: yup.string().test('fail', 'fail', () => false),
                }),
            );
            await testNavigationButtons(nextButtonText, 'details', 'details');
        });
        it('clicking Next on Editors step takes you to Disclosure', async (): Promise<void> => {
            await testNavigationButtons(nextButtonText, 'editors', 'disclosure');
        });
        it('clicking Next on Editors step remains on the Editors page when invalid', async (): Promise<void> => {
            (EditorsSchema as jest.Mock).mockImplementationOnce(() =>
                yup.object().shape({
                    suggestedSeniorEditors: yup.string().test('fail', 'fail', () => false),
                }),
            );
            await testNavigationButtons(nextButtonText, 'editors', 'editors');
        });

        it('clicking Back on Disclosure step takes you to Editors', async (): Promise<void> => {
            await testNavigationButtons(backButtonText, 'disclosure', 'editors');
        });

        it('clicking Back on Editors step takes you to Details', async (): Promise<void> => {
            await testNavigationButtons(backButtonText, 'editors', 'details');
        });

        it('clicking Back on Details step takes you to Files', async (): Promise<void> => {
            await testNavigationButtons(backButtonText, 'details', 'files');
        });

        it('clicking Back on Files step takes you to Author', async (): Promise<void> => {
            await testNavigationButtons(backButtonText, 'files', 'author');
        });
    });
    describe('submit', () => {
        it('displays a Submit button when on the last step', () => {
            const { component } = routeWrapper(SubmissionWizard, { path: '/submit/:id/:step' });
            const { getByText } = render(component, {
                wrapper: routerWrapper([`/submit/id/disclosure`]),
            });
            expect(() => getByText('navigation.next')).toThrow();
            expect(getByText('navigation.submit')).toBeInTheDocument();
        });
        it('clicking Back on Disclosure step takes you to Editors', () => {
            testNavigationButtons(backButtonText, 'disclosure', 'editors');
        });
    });

    describe('submit modal', () => {
        it('should show the modal when the page is valid', async () => {
            const { component } = routeWrapper(SubmissionWizard, { path: '/submit/:id/:step' });
            const { getByLabelText, getByText, baseElement } = render(component, {
                wrapper: routerWrapper(['/submit/id/disclosure']),
                container: appContainer(),
            });
            fireEvent.input(getByLabelText('disclosure.submitter-signature-input'), {
                target: { value: 'Conker The Squirrel' },
            });
            fireEvent.click(getByLabelText('disclosure.disclosure-consent-input'));
            fireEvent.click(getByText('navigation.submit'));
            await waitFor(() => {});
            expect(baseElement.querySelector('.modal')).toBeInTheDocument();
        });

        it('should not show the modal when the page is invalid', async () => {
            (DisclosureSchema as jest.Mock).mockImplementationOnce(() =>
                yup.object().shape({
                    submitterSignature: yup.string().test('fail', 'fail', () => false),
                }),
            );
            const { component } = routeWrapper(SubmissionWizard, { path: '/submit/:id/:step' });
            const { getByText, baseElement } = render(component, {
                wrapper: routerWrapper(['/submit/id/disclosure']),
                container: appContainer(),
            });
            fireEvent.click(getByText('navigation.submit'));
            await waitFor(() => {});
            expect(baseElement.querySelectorAll('.modal')).toHaveLength(0);
        });
    });
});
