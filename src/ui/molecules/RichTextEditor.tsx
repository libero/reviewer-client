import React, { useRef, useEffect } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorProps, EditorView } from 'prosemirror-view';
import debounce from 'lodash/debounce';
import { Fragment } from 'prosemirror-model';

export interface ProseMirrorEditorViewProps {
    className?: string;
    editorState: EditorState;
    options?: Partial<EditorProps>;
    onChange: (content: Fragment) => void;
}

export function ProseMirrorEditorView(props: ProseMirrorEditorViewProps): JSX.Element {
    const viewHost = useRef();
    const view = useRef(null);
    const additionalOptions = props.options || {};

    // To reflect xpub - values lifted from https://gitlab.coko.foundation/pubsweet/pubsweet/blob/def5c30e1d58d26b5ace4f2726c6694fb1aafd95/packages/components/xpub-edit/src/components/HtmlEditor.js#L27-48
    const debounceRef = debounce(
        () => {
            view.current && props.onChange && props.onChange(view.current.state.doc.content);
        },
        200,
        { maxWait: 1000 },
    );

    useEffect(() => {
        // initial render
        view.current = new EditorView(viewHost.current, {
            ...additionalOptions,
            state: props.editorState,
            dispatchTransaction: (transaction): void => {
                const state = view.current.state.apply(transaction);
                view.current.updateState(state);
                debounceRef();
            },
        });
        return (): void => view.current.destroy();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <div className={props.className} ref={viewHost} />;
}
