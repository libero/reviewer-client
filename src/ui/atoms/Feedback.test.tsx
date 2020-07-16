import '../../../test-utils/i18n-mock';
import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import Feedback from './Feedback';
import { APPLICATION_ERROR } from '../../core/graphql';
import { MemoryRouter } from 'react-router-dom';

describe('Feedback', (): void => {
    afterEach(cleanup);

    it('should render correctly', async done => {
        const mocks = [
            {
                request: {
                    query: APPLICATION_ERROR,
                },
                result: {
                    data: {
                        feedback: {
                            error: true,
                            dismissable: false,
                            message: 'error',
                        },
                    },
                },
            },
        ];
        const { container } = render(
            <MockedProvider mocks={mocks} addTypename={false} resolvers={{}}>
                <Feedback />
            </MockedProvider>,
        );
        await waitFor(() => {});
        expect(container.querySelector('.feedback')).toBeDefined();
        expect(container.textContent).toBeDefined();
        done();
    });

    it.only('should display error message', async done => {
        const mocks = [
            {
                request: {
                    query: APPLICATION_ERROR,
                },
                result: {
                    data: {
                        feedback: {
                            error: true,
                            dismissable: false,
                            message: 'super error',
                        },
                    },
                },
            },
        ];
        const { container, getByText } = render(
            <MockedProvider mocks={mocks}>
                <MemoryRouter>
                    <Feedback />
                </MemoryRouter>
            </MockedProvider>,
        );
        await waitFor(() => {});
        expect(container.querySelector('.feedback')).toBeDefined();
        console.log('container', container.querySelector('.feedback'));
        expect(getByText('super error')).toBeDefined();
        expect(container.textContent).toBeDefined();
        done();
    });

    it('should have error class', async done => {
        const mocks = [
            {
                request: {
                    query: APPLICATION_ERROR,
                },
                result: {
                    data: {
                        feedback: {
                            error: true,
                            dismissable: false,
                            message: 'super error',
                        },
                    },
                },
            },
        ];

        const resolvers = {
            Query: {
                ApplicationError: (): void => {
                }
            },
        };
        
        const { container, getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Feedback />
            </MockedProvider>,
        );
        await waitFor(() => {});
        expect(container.querySelector('.feedback')).toBeDefined();
        expect(container.querySelector('.error')).toBeDefined();
        expect(getByText('super error')).toBeDefined();
        expect(container.textContent).toBeDefined();
        done();
    });

    it('should have not error class if type is not error', async done => {
        const mocks = [
            {
                request: {
                    query: APPLICATION_ERROR,
                },
                result: {
                    data: {
                        feedback: {
                            error: false,
                            dismissable: false,
                            message: 'super error',
                        },
                    },
                },
            },
        ];
        const { container, getByText } = render(
            <MockedProvider mocks={mocks} addTypename={false} resolvers={{}}>
                <Feedback />
            </MockedProvider>,
        );
        await waitFor(() => {});
        expect(container.querySelector('.feedback')).toBeDefined();
        expect(container.querySelector('.error')).not.toBeDefined();
        expect(getByText('super error')).toBeDefined();
        expect(container.textContent).toBeDefined();
        done();
    });
});
