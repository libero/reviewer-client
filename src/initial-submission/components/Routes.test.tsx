import React from 'react';
import Routes from './Routes';
import routerWrapper from '../../../test-utils/routerWrapper';
import { cleanup, render, RenderResult } from '@testing-library/react';
import ThankYouPage from './ThankYouPage';
import routeWrapper from '../../../test-utils/routeWrapper';
import { Submission } from '../types';

const loading = false;
const submission: Submission = {
    id: 'id',
    manuscriptDetails: {
        title: 'Science',
    },
    articleType: 'research-article',
    updated: new Date().toISOString(),
};
jest.mock('@apollo/react-hooks', () => ({
    useQuery: (): object => {
        return {
            data: {
                getCurrentUser: {
                    name: 'Blogs, Joe',
                    email: 'joe@blogs.com',
                    aff: 'somewhere',
                },
                getSubmission: submission,
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

const renderRoutesWithPath = (route = ''): RenderResult =>
    render(<Routes />, {
        wrapper: routerWrapper([route]),
    });

describe('InitialSubmissionRoutes', (): void => {
    afterEach(cleanup);
    it('should render correctly', (): void => {
        expect(renderRoutesWithPath).not.toThrow();
    });
    it('should render submit/id route correctly', (): void => {
        expect((): RenderResult => renderRoutesWithPath('/submit/id')).not.toThrow();
    });
    it('should render thankyou/id route correctly', (): void => {
        const { component } = routeWrapper(ThankYouPage, { path: '/submit/:id' });
        expect((): RenderResult => render(component, { wrapper: routerWrapper() })).not.toThrow();

        expect((): RenderResult => renderRoutesWithPath('/thankyou/id')).not.toThrow();
    });
    it('should render survey/id route correctly', (): void => {
        expect((): RenderResult => renderRoutesWithPath('/survey/id')).not.toThrow();
    });
});
