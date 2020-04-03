import React from 'react';
import { storiesOf } from '@storybook/react';
import SubmissionList from '../components/SubmissionList';
import '../../core/styles/index.scss';
import { MemoryRouter } from 'react-router';
import { LocationDescriptor } from 'history';
import { object, withKnobs } from '@storybook/addon-knobs';
import { Submission } from '../../initial-submission/types';
import getMockSubmissionForDaysAgo from './storyUtils';

const historyLocation: LocationDescriptor[] = ['/'];

const notes = `
   # SubmissionList
   ## Styling
   | ClassName | Description |
   | -----------| -------------|
   | .dashboard__tabs | The outer container for the tabs container |
   | .dashboard__tabs_list | The container for the tabs |
   | .dashboard__tab | Styling for the tab itself |
   | .dashboard__tab_panel | Styling for the tab panel container |
`;

storiesOf('Dashboard | Components/SubmissionList', module)
    .addDecorator(withKnobs)
    .add(
        'With Components',
        (): JSX.Element => {
            const submissionsTyped: Submission[] = [
                {
                    id: 'id1',
                    articleType: 'research-article',
                    lastStepVisited: 'author',
                    status: 'CONTINUE_SUBMISSION',
                    updated: new Date().getTime(),
                    author: undefined,
                    manuscriptDetails: {
                        title: 'Theory of Everything',
                    },
                },
                {
                    id: 'id2',
                    articleType: 'research-article',
                    lastStepVisited: 'files',
                    status: 'SUBMITTED',
                    updated: getMockSubmissionForDaysAgo(7),
                    author: undefined,
                    manuscriptDetails: {
                        title: 'Theory of Nothing',
                    },
                },
            ];
            const submissions = object('Submissions', submissionsTyped);
            return (
                <MemoryRouter initialEntries={historyLocation}>
                    <SubmissionList submissions={submissions} onDelete={(): void => {}} />
                </MemoryRouter>
            );
        },
        {
            notes: { markdown: notes },
        },
    );
