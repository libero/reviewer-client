import React, { useMemo, Fragment } from 'react';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { ProseMirrorEditorView } from './RichTextEditor';
import { Fragment as EditorFragment } from 'prosemirror-model';

export interface RichTextEditorProps {
    editorState: EditorState;
    label?: string;
    name?: string;
    onChange?: (val: EditorFragment) => void;
    onFocus?: (state: EditorState, name: string) => void;
    onBlur?: (state: EditorState, name: string) => void;
    register?: () => void;
}

const RichTextEditor = (props: RichTextEditorProps): JSX.Element => {
    const { editorState, onChange, onFocus, onBlur, name } = props;

    const options = useMemo(
        () => ({
            handleDOMEvents: {
                focus: ({ state }: EditorView): boolean => {
                    onFocus && onFocus(state, name);
                    return true;
                },
                blur: ({ state }: EditorView): boolean => {
                    onBlur && onBlur(state, name);
                    return true;
                },
            },
        }),
        [onFocus, onBlur, name],
    );

    return (
        <Fragment>
            {editorState ? (
                <ProseMirrorEditorView options={options} editorState={editorState} onChange={onChange} />
            ) : null}
        </Fragment>
    );
};
export default RichTextEditor;
