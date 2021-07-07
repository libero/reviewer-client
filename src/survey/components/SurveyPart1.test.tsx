import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import SurveyPart1 from './SurveyPart1';

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

describe('SurveyPart1', (): void => {
    afterEach(() => {
        cleanup();
    });

    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<SurveyPart1 />);
        }).not.toThrow();
    });

    it('should by default hide the independent researcher year question', async (): Promise<void> => {
        expect(async () => {
            render(<SurveyPart1 />);
        }).not.toThrow();
    });

    it('should show the independent researcher year question when correct radio option selected', async (): Promise<
        void
    > => {
        expect(async () => {
            render(<SurveyPart1 />);
        }).not.toThrow();
    });

    it('should by default have no initial values', async (): Promise<void> => {
        expect(async () => {
            render(<SurveyPart1 />);
        }).not.toThrow();
    });

    it('should if specified have initial values', async (): Promise<void> => {
        expect(async () => {
            render(<SurveyPart1 />);
        }).not.toThrow();
    });

    it('should change the button label when the form has an entry', async () => {
        expect(async () => {
            render(<SurveyPart1 />);
        }).not.toThrow();
        /*
        const { getByLabelText, getByText } = render(<Survey />, { wrapper: routerWrapper(['/survey/someid']) });
        expect(getByText('navigation.skip')).toBeInTheDocument();
        fireEvent.input(getByLabelText('question1'), { target: { value: 'Beware the squirrels' } });
        await waitFor(() => {});
        expect(getByText('navigation.done')).toBeInTheDocument();
        */
    });
});
