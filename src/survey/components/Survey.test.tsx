import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import Survey from './Survey';
import routerWrapper from '../../../test-utils/routerWrapper';

const mutationMock = jest.fn();

jest.mock('@apollo/react-hooks', () => ({
    useMutation: (): object[] => {
        return [
            mutationMock,
            {
                loading: false,
            },
        ];
    },
}));

describe('Survey', (): void => {
    afterEach(() => {
        cleanup();
    });

    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<Survey />, { wrapper: routerWrapper(['/survey/someid']) });
        }).not.toThrow();
    });

    it('should start on page 1', async (): Promise<void> => {
        const { container } = render(<Survey />, { wrapper: routerWrapper(['/survey/someid']) });
        expect(container.querySelector('#survey-part-1')).not.toBeNull();
    });

    it('should navigate to the next page', async (): Promise<void> => {
        const { getByText, container } = render(<Survey />, { wrapper: routerWrapper(['/survey/someid']) });
        fireEvent.click(getByText('navigation.skip'));
        await waitFor(() => {});
        expect(container.querySelector('#survey-part-2')).not.toBeNull();
    });

    it('should navigate back the previous page', async (): Promise<void> => {
        const { getByText, container } = render(<Survey />, { wrapper: routerWrapper(['/survey/someid']) });
        fireEvent.click(getByText('navigation.skip'));
        await waitFor(() => {});
        expect(container.querySelector('#survey-part-2')).not.toBeNull();
        fireEvent.click(getByText('navigation.back'));
        await waitFor(() => {});
        expect(container.querySelector('#survey-part-1')).not.toBeNull();
    });
});
