import React from 'react';
import { getTokenFromUrl } from '../utils/tokenUtils';

/**
 * This component is needed to redirect from the Journal login, as it passes the token
 * back in the hash component. This redirects it to the /auth route with the token
 * as part of the url. This is then proxied to the authentication service which then
 * performs the token exchange.
 */
const JournalAuthRedirect = (): JSX.Element => {
    const token = getTokenFromUrl();

    if (!token || token.length === 0) {
        return <div>Missing token</div>;
    }

    window.location.href = `/auth/${token}`;

    return null;
};

export default JournalAuthRedirect;
