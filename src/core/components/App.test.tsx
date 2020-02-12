import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import * as ApolloReactHooks from '@apollo/react-hooks';
import { ApolloProviderProps } from '@apollo/react-common/lib/context/ApolloProvider';
import apolloWrapper from '../../../test-utils/apolloWrapper';
import App from './App';
import { getSubmissionsQuery } from '../../dashboard/graphql';
import * as createApolloClient from '../utils/createApolloClient';
import * as tokenUtils from '../../login/utils/tokenUtils';

describe('App', (): void => {
    it('should render correctly', (): void => {
        const mockQueryResponse = [
            {
                request: {
                    query: getSubmissionsQuery,
                },
                result: {
                    data: {
                        getSubmissions: {},
                    },
                },
            },
        ];
        // Mock out instance of ApolloProvider so we can use a mocked provider instead
        jest.spyOn(ApolloReactHooks, 'ApolloProvider').mockImplementation(
            ({ children }: ApolloProviderProps<unknown>): JSX.Element => apolloWrapper(mockQueryResponse)({ children }),
        );
        expect((): RenderResult => render(<App />)).not.toThrow();
    });

    it('should set token when creating apollo client', (): void => {
        jest.spyOn(createApolloClient, 'default');
        jest.spyOn(tokenUtils, 'getToken').mockImplementation((): string => 'token');

        render(<App />);

        expect(createApolloClient.default).toHaveBeenCalledTimes(1);
        expect(createApolloClient.default).toHaveBeenCalledWith('', 'token');
    });
});
