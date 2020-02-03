import React from 'react';
import { storiesOf } from '@storybook/react';
import Dashboard from '../components/Dashboard';
import '../../core/styles/index.scss';
import { MemoryRouter } from 'react-router';
import { LocationDescriptor } from 'history';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { getSubmissionsQuery, startSubmissionMutation } from '../graphql';

const historyLocation: LocationDescriptor[] = ['/'];

const notes = `
   # Dashboard
   ## Styling
   | ClassName | Description |
   | -----------| -------------|
   | .dashboard | The outer container for the dashboard component |
   | .dashboard__button_container | The container for the action button |
`;

storiesOf('Dashboard | Components/Dashboard', module).add(
    'With Components',
    (): JSX.Element => {
        const sampleSub = {
            id: '1234',
            title: 'Effects of Caffeine on Software Developers',
            updated: Date.now(),
        };
        const getSubmissions: MockedResponse = {
            request: {
                query: getSubmissionsQuery,
            },
            result: {
                data: {
                    getSubmissions: [sampleSub],
                },
            },
        };
        const startSubmission: MockedResponse = {
            request: {
                query: startSubmissionMutation,
            },
            result: {
                data: {
                    startSubmission: [sampleSub],
                },
            },
        };

        return (
            <div id="app">
                <MockedProvider mocks={[getSubmissions, startSubmission]} addTypename={false}>
                    <MemoryRouter initialEntries={historyLocation}>
                        <Dashboard />
                    </MemoryRouter>
                </MockedProvider>
            </div>
        );
    },
    {
        notes: { markdown: notes },
    },
);
