import '../../../test-utils/i18n-mock';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ThankYouPage from './ThankYouPage';
import routerWrapper from '../../../test-utils/routerWrapper';
import routeWrapper from '../../../test-utils/routeWrapper';
import { Submission } from '../types';

let loading = false;
let submission: Submission = {
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

describe('ThankYouPage', (): void => {
    afterEach(cleanup);
    beforeEach(() => {
        loading = false;
    });

    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<ThankYouPage />, {
                wrapper: routerWrapper(),
            });
        }).not.toThrow();
    });

    it('it should render with title', (): void => {
        const { container } = render(<ThankYouPage />, {
            wrapper: routerWrapper(),
        });
        expect(container.querySelector('.title').innerHTML).toBe('p1');
    });

    it('should display loading text when the query is still loading', (): void => {
        loading = true;
        const { component } = routeWrapper(ThankYouPage, { path: '/thankyou/:id/' });
        const { getByText } = render(component, { wrapper: routerWrapper(['/thankyou/id']) });
        expect(getByText('loading...')).toBeInTheDocument();
    });

    it('should not throw if manuscriptDetails are not present', (): void => {
        submission = {
            id: 'id',
            articleType: 'research-article',
            updated: new Date().toISOString(),
        };
        const { container } = render(<ThankYouPage />, {
            wrapper: routerWrapper(),
        });
        expect(container.querySelector('.title').innerHTML).toBe('p1');
    });
});
