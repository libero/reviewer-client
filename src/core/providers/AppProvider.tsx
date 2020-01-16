import React, { useState, useEffect, createContext, useContext } from 'react';
import * as Auth from '../utils/auth';

interface Props {
    children: JSX.Element[] | JSX.Element;
}

const AppContext = createContext({ isAuthenticated: false });
const useAppContext = () => useContext(AppContext);
const { Consumer } = AppContext;

function AppProvider({ children }: Props): JSX.Element {
    // useEffect to check for authentication
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        Auth.importToken();
        setIsAuthenticated(Auth.isAuthenticated);
        // need to consider how to unmount.
    }, []);
    return (
        <AppContext.Provider
            value={{
                isAuthenticated,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export { AppProvider, Consumer as AppConsumer, AppContext, useAppContext };
