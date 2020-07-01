import React, { useMemo, Fragment } from 'react';
import { EditorView } from 'prosemirror-view';
import { EditorState, Transaction } from 'prosemirror-state';
import { ProseMirrorEditorView } from './RichTextEditor';

export interface RichTextEditorProps {
    editorState: EditorState;
    label?: string;
    name?: string;
    onChange?: (change: Transaction, name: string) => void;
    onFocus?: (state: EditorState, name: string) => void;
    onBlur?: (state: EditorState, name: string) => void;
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
