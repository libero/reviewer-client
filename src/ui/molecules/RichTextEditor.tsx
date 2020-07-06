import React, { useRef, useEffect } from 'react';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorProps, EditorView } from 'prosemirror-view';
import debounce from 'lodash/debounce';

interface ProseMirrorEditorViewState {
    editorState: EditorState;
}

export interface ProseMirrorEditorViewProps {
    className?: string;
    editorState: EditorState;
    options?: Partial<EditorProps>;
    onChange: (content: any) => void;
}

export function ProseMirrorEditorView(props: ProseMirrorEditorViewProps) {
    const viewHost = useRef();
    const view = useRef(null);
    const additionalOptions = props.options || {};
    console.log('rerender');

    const debounceRef = debounce(
        () => {
            console.log('debounce');
            view.current && props.onChange && props.onChange(view.current.state.doc.content);
        },
        1000,
        { maxWait: 5000 },
    );

    useEffect(() => {
        // initial render
        view.current = new EditorView(viewHost.current, {
            ...additionalOptions,
            state: props.editorState,
            dispatchTransaction: transaction => {
                const state = view.current.state.apply(transaction);
                view.current.updateState(state);
                debounceRef();
            },
        });
        return () => view.current.destroy();
    }, []);

    // useEffect(() => {
    //     // every render
    //     console.log('rerender');
    // });

    return <div ref={viewHost} />;
}

//   export class ProseMirrorEditorView extends React.Component<ProseMirrorEditorViewProps> {
//     public props: ProseMirrorEditorViewProps;

//     state = {
//         editorView: null as EditorView<any>,
//     } as any;

//     focus(): void {
//         this.state.editorView.focus();
//     }

//     blur(): void {
//         (this.state.editorView.dom as HTMLDivElement).blur();
//     }

//     // shouldComponentUpdate(nextProps: ProseMirrorEditorViewProps): boolean {
//     //     console.log('hello');
//     //     if (this.state.editorView && nextProps.editorState !== this.state.editorView.state) {
//     //         this.setState({ editorView: this.state.editorView.updateState(nextProps.editorState) });
//     //     }
//     //     return false;
//     // }

//     componentWillUnmount(): void {
//         if (this.state.editorView) {
//             this.state.editorView.destroy();
//         }
//     }

//     render(): JSX.Element {
//         // Render just an empty div which is then used as a container for an
//         // EditorView instance.
//         return <div ref={this.createEditorView} className={`prosemirrorContainer ${this.props.className}`} />;
//     }

//     private createEditorView = (element: HTMLElement): void => {
//         if (element) {
//             const additionalOptions = this.props.options || {};
//             const editorView = new EditorView(element, {
//                 ...additionalOptions,
//                 state: this.props.editorState,
// dispatchTransaction: transaction => {
//     const state = editorView.state.apply(transaction);
//     console.log('state', state.doc.content);
//     editorView.updateState(state);
//     this.setState({ editorView });
//     this.props.onChange && this.props.onChange(state.doc.content);
// },
//             });
//         }
//     };
// }
