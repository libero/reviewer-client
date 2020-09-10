import React from 'react';
import { cleanup, render, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', (): void => {
    afterEach(cleanup);

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<Spinner />)).not.toThrow();
    });

    it('class should be present', async (): Promise<void> => {
        const { container, getByText } = render(<Spinner />);
        expect(container.querySelector('.spinner')).toBeInTheDocument();
    });
});
