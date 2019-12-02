import React from 'react';
import { Redirect } from 'react-router';
import { clearToken } from '../utils/tokenUtils';

const Logout = (): JSX.Element => {
    clearToken();

    return <Redirect to="/" />;
};

export default Logout;
