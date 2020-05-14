import React, { useEffect } from 'react';
import { clearToken } from '../utils/tokenUtils';

const Logout = (): JSX.Element => {
    useEffect(() => {
        clearToken();
        window.location.reload();
        window.location.pathname = '/';
    }, []);

    return <div />;
};

export default Logout;
