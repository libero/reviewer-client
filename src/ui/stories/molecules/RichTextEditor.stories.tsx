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
        const mySchema = new Schema({
            nodes: addListNodes(schema.spec.nodes as any, "paragraph block*", "block"),
            marks: schema.spec.marks
          })

        return (
            <div>
                {/* <div id="content"></div> */}
                <RichTextEditor
                    editorState={EditorState.create({
                        doc: DOMParser.fromSchema(mySchema).parse(document.querySelector('#app')),
                        schema: mySchema,
                        plugins: exampleSetup({ schema: mySchema })
                    })}
                />
            </div>
        );
    },
);
