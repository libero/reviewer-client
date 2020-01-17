import React, { useState, useEffect, createContext, useContext } from 'react';
import * as Auth from '../utils/auth';

interface Props {
    children: JSX.Element[] | JSX.Element;
}

interface AppState {
    isAuthenticated: boolean;
}

const AppContext = createContext<AppState>({ isAuthenticated: false });
const useAppContext = (): AppState => useContext(AppContext);
const { Provider } = AppContext;

function AppProvider({ children }: Props): JSX.Element {
    // useEffect to check for authentication
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        Auth.importToken();
        setIsAuthenticated(Auth.isAuthenticated);
        // need to consider how to unmount.
    }, []);
    return (
        <Provider
            value={{
                isAuthenticated,
            }}
        >
            {children}
        </Provider>
    );
}

export { AppProvider, useAppContext };
