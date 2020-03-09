import { render, cleanup, fireEvent } from '@testing-library/react';
import React, { TextareaHTMLAttributes } from 'react';
import FileDetailsForm from './FileDetailsForm';
const mutationMock = jest.fn();

jest.mock('../utils/autosave-decorator', () => ({
    AutoSaveDecorator: (cb: () => void): void => cb(),
}));
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

describe('File Details Form', (): void => {
    afterEach(() => {
        cleanup();
        mutationMock.mockReset();
    });

    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<FileDetailsForm initialValues={{ id: 'test' }} />);
        }).not.toThrow();
    });

    it('sets coverletter initial value to initialValues.coverLetter on load', async (): Promise<void> => {
        const { container } = render(
            <FileDetailsForm initialValues={{ id: 'test', coverLetter: 'some default value' }} />,
        );
        expect(
            (container.querySelector('.cover-letter__input') as TextareaHTMLAttributes<HTMLTextAreaElement>).value,
        ).toBe('some default value');
    });

    it('sets coverletter initial value to empty string if no initialValues.coverLetter on load', async (): Promise<
        void
    > => {
        const { container } = render(<FileDetailsForm initialValues={{ id: 'test' }} />);
        expect(
            (container.querySelector('.cover-letter__input') as TextareaHTMLAttributes<HTMLTextAreaElement>).value,
        ).toBe('');
    });

    it('should call the save mutation with correct variables when cover letter is changed', async (): Promise<void> => {
        const { container } = render(<FileDetailsForm initialValues={{ id: 'test' }} />);
        fireEvent.input(container.querySelector('.cover-letter__input'), {
            target: { value: 'test cover letter input' },
        });
        expect(mutationMock).toBeCalledWith({
            variables: {
                id: 'test',
                coverLetter: 'test cover letter input',
            },
        });
    });
});
