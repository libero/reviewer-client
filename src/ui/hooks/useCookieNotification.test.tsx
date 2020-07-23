import React from 'react';
import { cleanup, render, fireEvent } from '@testing-library/react';
import useCookieNotification from './useCookieNotification';

describe('useCookieNotification', (): void => {
    afterEach(cleanup);
    const MockFuncComp = (): JSX.Element => {
        const { accepted, setAccepted } = useCookieNotification();
        return <button onClick={(): void => setAccepted()}>{accepted ? 'hidden' : 'visible'}</button>;
    };

    it('should return accepted as false if no cookie', (): void => {
        const { getByText } = render(<MockFuncComp />);
        expect(getByText('visible')).toBeInTheDocument();
    });

    it('should toggle accepted on setAccepted function call', (): void => {
        const { getByText } = render(<MockFuncComp />);
        expect(getByText('visible')).toBeInTheDocument();
        fireEvent.click(getByText('visible'));
        expect(getByText('hidden')).toBeInTheDocument();
    });
});
