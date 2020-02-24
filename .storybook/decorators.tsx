import React, { Suspense, ReactElement } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import createApolloClient from '../src/core/utils/createApolloClient';

interface Props {
    children?: ReactElement;
}

const Loader = (): JSX.Element => <div>Loading...</div>;

const App: React.FC = ({ children }: Props): JSX.Element => {
    return (
        <ApolloProvider client={createApolloClient('')}>
            <Suspense fallback={<Loader />}>
                {children}
            </Suspense>
        </ApolloProvider>
    );
};

export const AppDecorator = (story:any) => <App>{story()}</App>;