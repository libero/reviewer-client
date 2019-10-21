import React from 'react';
import { storiesOf, forceReRender } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import SelectedOption from '../../molecules/SelectedOption';
import '../../../core/styles/index.scss';

// we need to put those outside otherwise options don't get removed
let options: string[] = ['Jeff Goldblum', 'Sam Neill'];

const onClose = (removeIndex: number): void => {
    options = options.filter((_option, index): boolean => index !== removeIndex);
    forceReRender();
};

storiesOf('ui | molecules/SelectedOption', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'SelectedOption',
        (): JSX.Element => {
            const items = object('items', ['Jeff Goldblum', 'Sam Neill']);

            return (
                <div>
                    {items.map(
                        (text, index): JSX.Element => (
                            <div key={index} style={{ display: 'inline-flex', margin: '8px' }}>
                                <SelectedOption text={text} />
                            </div>
                        ),
                    )}
                </div>
            );
        },
    )
    .add(
        'Closeable',
        (): JSX.Element => {
            return (
                <div>
                    {options.map(
                        (text, index): JSX.Element => (
                            <div style={{ display: 'inline-flex', margin: '8px' }} key={index}>
                                <SelectedOption
                                    text={text}
                                    onClose={(): void => {
                                        onClose(index);
                                    }}
                                />
                            </div>
                        ),
                    )}
                </div>
            );
        },
    );
