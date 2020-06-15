import '../../../test-utils/i18n-mock';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import routerWrapper from '../../../test-utils/routerWrapper';

import Dashboard from './Dashboard';

const mockMutation = jest.fn().mockImplementation(
    (): Promise<object> =>
        Promise.resolve({
            data: {
                startSubmission: {
                    id: 'testid',
                    manuscriptDetails: {
                        title: '',
                    },
                    updated: '2020-01-01T00:00:00.000Z',
                    articleType: 'research-article',
                },
            },
        }),
);

jest.mock('@apollo/react-hooks', () => ({
    useQuery: jest.fn().mockImplementation(() => {
        return {
            data: undefined,
            loading: false,
        };
    }),
    useMutation: (): object[] => {
        return [
            mockMutation,
            {
                loading: false,
            },
        ];
    },
}));

describe('Dashboard - exceptions', (): void => {
    it('it should should not throw or render a submission list if undefined is returned from the resolver', async (): Promise<
        void
    > => {
        const { container } = render(<Dashboard />, {
            wrapper: routerWrapper(['/link-1']),
        });
        await waitFor(() => {});
        expect(container.querySelector('.no-submissions')).toBeInTheDocument();
        expect(container.querySelector('.dashboard__tabs')).not.toBeInTheDocument();
    });
});
