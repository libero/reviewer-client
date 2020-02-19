import React from 'react';
import { render, RenderResult, act } from '@testing-library/react';
import * as ApolloReactHooks from '@apollo/react-hooks';
import { ApolloProviderProps } from '@apollo/react-common/lib/context/ApolloProvider';
import apolloWrapper from '../../../test-utils/apolloWrapper';
import App from './App';
import * as createApolloClient from '../utils/createApolloClient';
import { isUserAuthenticatedQuery } from '../graphql';

describe('App', (): void => {
    it('should render correctly', async done => {
        const mockQueryResponse = [
            {
                request: {
                    query: isUserAuthenticatedQuery,
                },
                result: {
                    data: {
                        isAuthenticated: false,
                    },
                },
            },
        ];
        // Mock out instance of ApolloProvider so we can use a mocked provider instead
        jest.spyOn(ApolloReactHooks, 'ApolloProvider').mockImplementation(
            ({ children }: ApolloProviderProps<unknown>): JSX.Element => apolloWrapper(mockQueryResponse)({ children }),
        );
        // Apollo queries need timeout, despite mock...
        // https://github.com/airbnb/enzyme/issues/2153
        await act(async () => await new Promise(resolve => setTimeout(resolve, 10)));
        expect((): RenderResult => render(<App />)).not.toThrow();
        done();
    });

    it('should set token when creating apollo client', (): void => {
        jest.spyOn(createApolloClient, 'default');

        render(<App />);

        expect(createApolloClient.default).toHaveBeenCalledTimes(1);
        expect(createApolloClient.default).toHaveBeenCalledWith('');
    });
});
