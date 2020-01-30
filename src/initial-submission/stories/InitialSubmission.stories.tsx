import React from 'react';
import { storiesOf } from '@storybook/react';
import InitialSubmission from '../components/InitialSubmission';
import '../../core/styles/index.scss';
import { MemoryRouter } from 'react-router';
import { LocationDescriptor } from 'history';
// import { MockedProvider, MockedResponse } from '@apollo/react-testing';
// import { getSubmissionsQuery } from '../graphql';

const historyLocation: LocationDescriptor[] = ['/'];

const notes = `
`;

storiesOf('Initial Submission | Components/InitialSubmission', module).add(
    'With Components',
    (): JSX.Element => {
        return (
            <MemoryRouter initialEntries={historyLocation}>
                <InitialSubmission />
            </MemoryRouter>
        );
    },
    {
        notes: { markdown: notes },
    },
);
