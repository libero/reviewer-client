import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';

import Feedback from './Feedback';

const message = {
    feedback: {
        error: true,
        dismissable: false,
        message: 'super error',
    },
};

jest.mock('@apollo/react-hooks', () => ({
    useQuery: (): object => {
        return {
            data: message,
        };
    },
    useMutation: (): object => {
        return [(): void => {}];
    },
}));

describe('Feedback', (): void => {
    afterEach(cleanup);

    it('should render correctly', async done => {
        const { container } = render(<Feedback />);
        await waitFor(() => {});
        expect(container.querySelector('.feedback')).toBeDefined();
        expect(container.textContent).toBeDefined();
        done();
    });

    it('should display error message', async done => {
        const { container, getByText } = render(<Feedback />);
        await waitFor(() => {});
        expect(container.querySelector('.feedback')).toBeDefined();
        expect(getByText('super error')).toBeDefined();
        expect(container.textContent).toBeDefined();
        done();
    });

    it('should have error class', async done => {
        const { container, getByText } = render(<Feedback />);
        await waitFor(() => {});
        expect(container.querySelector('.feedback')).toBeDefined();
        expect(container.querySelector('.error')).toBeDefined();
        expect(getByText('super error')).toBeDefined();
        expect(container.textContent).toBeDefined();
        done();
    });

    it('should have not error class if type is not error', async done => {
        message.feedback.error = false;
        const { container, getByText } = render(<Feedback />);
        await waitFor(() => {});
        expect(container.querySelector('.feedback')).toBeDefined();
        expect(container.querySelector('.error')).toBeNull();
        expect(getByText('super error')).toBeDefined();
        expect(container.textContent).toBeDefined();
        done();
    });
});
