import React from 'react';
import { Redirect } from 'react-router';
import { getTokenFromUrl } from '../utils/tokenUtils';

/**
 * This component is needed to redirect from the Journal login, as it passes the token
 * back
 */

const JournalAuthRedirect = (): JSX.Element => {
    const token = getTokenFromUrl();

    if (!token || token.length === 0) {
        return <div>Missing token</div>;
    }

    return <Redirect to={`/auth/${token}`} />;
};

export default JournalAuthRedirect;
