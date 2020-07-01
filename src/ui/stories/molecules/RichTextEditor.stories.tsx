import React from 'react';
import { storiesOf } from '@storybook/react';
import { RichTextEditor } from '../../molecules';
import { EditorState } from 'prosemirror-state';

storiesOf('ui | molecules/RichTextEditor', module).add(
    'RichTextEditor',
    (): JSX.Element => {
        return <RichTextEditor editorState={new EditorState()} />;
    },
);
