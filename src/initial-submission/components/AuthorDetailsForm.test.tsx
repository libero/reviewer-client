import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import AuthorDetailsForm from './AuthorDetailsForm';
import 'mutationobserver-shim';
import { Submission } from '../types';

jest.mock('@apollo/react-hooks', () => ({
    useQuery: (): object => {
        return {
            data: {
                getCurrentUser: {
                    name: 'Blogs, Joe',
                    email: 'joe@blogs.com',
                    aff: 'somewhere',
                },
            },
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
}));

describe('Author Details Form', (): void => {
    afterEach(cleanup);
    it('should render correctly', async (): Promise<void> => {
        expect(async () => {
            render(<AuthorDetailsForm />);
        }).not.toThrow();
    });

    it('should render correctly with all props', async (): Promise<void> => {
        const initialValues: Submission = {
            author: {
                firstName: 'Joe',
                lastName: 'Blogs',
                email: 'joe@blogs.com',
                institution: 'somewhere',
            },
            id: '',
            title: '',
            updated: 0,
        };
        expect(
            async (): Promise<void> => {
                render(<AuthorDetailsForm initialValues={initialValues} />);
            },
        ).not.toThrow();
    });

    it('should fill the correct boxes with author information when the text is clicked', async (): Promise<void> => {
        const { container, getByLabelText } = render(<AuthorDetailsForm />);
        await fireEvent.click(container.querySelector('.typography__body--link'));
        expect((getByLabelText('author-first-name') as HTMLInputElement).value).toBe('Joe');
    });

    it('should display the correct values when an existing submission is passed in', async (): Promise<void> => {
        const initialValues: Submission = {
            author: {
                firstName: 'Joe',
                lastName: 'Blogs',
                email: 'joe@blogs.com',
                institution: 'somewhere',
            },
            id: '',
            title: '',
            updated: 0,
        };
        const { getByLabelText } = render(<AuthorDetailsForm initialValues={initialValues} />);
        expect((getByLabelText('author-first-name') as HTMLInputElement).value).toBe('Joe');
        expect((getByLabelText('author-last-name') as HTMLInputElement).value).toBe('Blogs');
        expect((getByLabelText('author-email') as HTMLInputElement).value).toBe('joe@blogs.com');
        expect((getByLabelText('institution') as HTMLInputElement).value).toBe('somewhere');
    });
});
