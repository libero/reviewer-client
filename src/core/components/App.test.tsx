import React from 'react';
import { render, wait } from '@testing-library/react';
import App from './App';
import * as createApolloClient from '../utils/createApolloClient';
import * as config from '../utils/config';

jest.mock('../utils/config', () => ({
    fetchAndSetConfig: jest.fn(),
}));

describe('App', (): void => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('should render correctly', async done => {
        const { container } = render(<App />);
        await wait();
        expect(container).toBeDefined();
        expect(config.fetchAndSetConfig).toHaveBeenCalledTimes(1);
        done();
    });

    it('should set token when creating apollo client', async done => {
        jest.spyOn(createApolloClient, 'default');
        render(<App />);
        await wait();
        expect(createApolloClient.default).toHaveBeenCalledTimes(1);
        expect(config.fetchAndSetConfig).toHaveBeenCalledTimes(1);
        expect(createApolloClient.default).toHaveBeenCalledWith('http://localhost');
        done();
    });
});
