import React from 'react';
import { render, wait } from '@testing-library/react';
import App from './App';
import * as createApolloClient from '../utils/createApolloClient';

describe('App', (): void => {
    it('should render correctly', async done => {
        const { container } = render(<App />);
        await wait();
        expect(container).toBeDefined();
        done();
    });

    it('should set token when creating apollo client', async done => {
        jest.spyOn(createApolloClient, 'default');
        render(<App />);
        await wait();
        expect(createApolloClient.default).toHaveBeenCalledTimes(1);
        expect(createApolloClient.default).toHaveBeenCalledWith('');
        done();
    });
});
