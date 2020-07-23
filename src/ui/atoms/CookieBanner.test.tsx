import React from 'react';
import { cleanup, render, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import CookieBanner from './CookieBanner';

describe('CookieBanner', (): void => {
    afterEach(cleanup);
    afterEach(() => {
        document.cookie = 'cookieNotificationAccepted=;';
    });

    it('should render correctly', (): void => {
        expect((): RenderResult => render(<CookieBanner />)).not.toThrow();
    });

    it('should render with no cookie', (): void => {
        const { container } = render(<CookieBanner />);
        expect(container.querySelector('.cookie-banner')).toBeInTheDocument();
    });

    it('should be hidden if the accepted cookie is present', async () => {
        document.cookie = 'cookieNotificationAccepted=true;';
        await waitFor(() => {});
        const { queryByText } = render(<CookieBanner />);
        expect(queryByText('cookie-banner.button-text')).toBeNull();
    });

    it('should hide the banner when clicked', () => {
        const { getByText, queryByText } = render(<CookieBanner />);
        expect(getByText('cookie-banner.button-text')).toBeInTheDocument();
        fireEvent.click(getByText('cookie-banner.button-text'));
        expect(queryByText('cookie-banner.button-text')).toBeNull();
    });
});
