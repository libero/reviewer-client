import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
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

    it('should change the button label when the form has an entry', async () => {
        const { getByLabelText, getByText } = render(<Survey />, { wrapper: routerWrapper(['/survey/someid']) });
        expect(getByText('navigation.skip')).toBeInTheDocument();
        fireEvent.input(getByLabelText('question1'), { target: { value: 'Beware the squirrels' } });
        await waitFor(() => {});
        expect(getByText('navigation.done')).toBeInTheDocument();
    });
});
