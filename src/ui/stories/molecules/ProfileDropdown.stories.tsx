import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { ProfileDropdown } from '../../molecules';
import '../../../core/styles/index.scss';
import { LocationDescriptor } from 'history';
import { MemoryRouter } from 'react-router';
import centered from '@storybook/addon-centered/react';

const historyLocation: LocationDescriptor[] = ['/'];

storiesOf('ui | molecules/ProfileDropdown', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'ProfileDropdown',
        (): JSX.Element => {
            const name = text('Name', 'Jeff Goldblum');
            const role = text('Role', 'Actor');
            return (
                <MemoryRouter initialEntries={historyLocation}>
                    <ProfileDropdown user={{ name, role, id: 'abc' }} />
                </MemoryRouter>
            );
        },
    );
