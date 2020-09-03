import React, { useEffect } from 'react';
import { clearToken } from '../utils/tokenUtils';
import { useApolloClient } from '@apollo/react-hooks';

const Logout = (): JSX.Element => {
    const client = useApolloClient();
    useEffect(() => {
        clearToken();
        client.resetStore();
        window.location.pathname = '/auth-logout';
    }, []);

    return <div />;
};

export default Logout;
