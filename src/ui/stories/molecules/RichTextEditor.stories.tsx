import React from 'react';
import { storiesOf } from '@storybook/react';
import { RichTextEditor } from '../../molecules';
import { EditorState } from 'prosemirror-state';
import { addListNodes } from 'prosemirror-schema-list';
import { schema } from 'prosemirror-schema-basic';
import { Schema, DOMParser } from 'prosemirror-model';
import { exampleSetup } from 'prosemirror-example-setup';

storiesOf('ui | molecules/RichTextEditor', module).add(
    'RichTextEditor',
    (): JSX.Element => {
        const editorSchema = new Schema({
            nodes: addListNodes((schema.spec.nodes as unknown) as any, 'paragraph block*', 'block'),
            marks: schema.spec.marks,
        });

        const editorDiv = document.createElement('div');
        document.querySelector('#app').appendChild(editorDiv);

        return (
            <div>
                <RichTextEditor
                    editorState={EditorState.create({
                        doc: DOMParser.fromSchema(editorSchema).parse(editorDiv),
                        schema: editorSchema,
                        plugins: exampleSetup({ schema: editorSchema }),
                    })}
                />
            </div>
        );
    },
);
