import React from 'react';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorProps, EditorView } from 'prosemirror-view';

interface ProseMirrorEditorViewState {
    editorState: EditorState;
}

export interface ProseMirrorEditorViewProps {
    className?: string;
    editorState: EditorState;
    options?: Partial<EditorProps>;
    onChange: (tx: Transaction) => void;
}

export class ProseMirrorEditorView extends React.Component<ProseMirrorEditorViewProps, ProseMirrorEditorViewState> {
    public props: ProseMirrorEditorViewProps;

    private editorView: EditorView;

    focus(): void {
        this.editorView.focus();
    }

    blur(): void {
        (this.editorView.dom as HTMLDivElement).blur();
    }

    shouldComponentUpdate(nextProps: ProseMirrorEditorViewProps): boolean {
        if (nextProps.editorState !== this.editorView.state) {
            this.editorView.updateState(nextProps.editorState);
        }
        return false;
    }

    componentWillUnmount(): void {
        if (this.editorView) {
            this.editorView.destroy();
        }
    }

    render(): JSX.Element {
        // Render just an empty div which is then used as a container for an
        // EditorView instance.
        return <div ref={this.createEditorView} className={`prosemirrorContainer ${this.props.className}`} />;
    }

    private createEditorView = (element: HTMLElement): void => {
        if (element) {
            const additionalOptions = this.props.options || {};
            this.editorView = new EditorView(element, {
                ...additionalOptions,
                state: this.props.editorState,
                dispatchTransaction: this.props.onChange,
            });
        }
    };
}
