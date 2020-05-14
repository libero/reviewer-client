import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { clearToken } from '../utils/tokenUtils';

const Logout = (): JSX.Element => {
    useEffect(() => {
        clearToken();
        window.location.reload();
    }, []);

    return <Redirect to="/" />;
};

export default Logout;
