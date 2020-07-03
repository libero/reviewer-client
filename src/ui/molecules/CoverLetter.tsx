import React, { TextareaHTMLAttributes } from 'react';
import Close from '@material-ui/icons/Close';
import { keymap } from 'prosemirror-keymap';
import { undoInputRule } from 'prosemirror-inputrules';
import { EditorState } from 'prosemirror-state';
import { addListNodes, wrapInList} from 'prosemirror-schema-list';
import { schema as defaultSchema } from 'prosemirror-schema-basic';
import { Schema, DOMParser, MarkType } from 'prosemirror-model';
import { baseKeymap, toggleMark, setBlockType, chainCommands, exitCode, selectParentNode } from 'prosemirror-commands';
import { undo, redo, history } from 'prosemirror-history';
import { menuBar, MenuItem, icons } from 'prosemirror-menu';
import RichTextEditor from './RichTextEditorWrapper';
import test from '../../core/assets/editor/bold.svg';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    helperText?: string;
    id: string;
    invalid?: boolean;
    register?: () => void;
    className?: string;
}

const makeKeymap = (schema: Schema) => {
    const keys: { [key: string]: any } = {
        Backspace: undoInputRule,
        'Ctrl-Enter': exitCode,
        Escape: selectParentNode,
        'Mod-Enter': exitCode,
        'Shift-Enter': exitCode,
        'Mod-z': undo,
        'Mod-y': redo,
        'Shift-Mod-z': redo,
        'Shift-Ctrl-0': setBlockType(schema.nodes.paragraph),
        'Shift-Ctrl-9': wrapInList(schema.nodes.ordered_list),
        'Shift-Ctrl-8': wrapInList(schema.nodes.bullet_list),
        'Mod-b': toggleMark(schema.marks.bold),
        'Mod-i': toggleMark(schema.marks.italic),
    };

    Object.keys(baseKeymap).forEach(key => {
        if (keys[key]) {
            keys[key] = chainCommands(keys[key], baseKeymap[key]);
        } else {
            keys[key] = baseKeymap[key];
        }
    });

    return keymap(keys);
};


const CoverLetter = ({ id, className, invalid, register, helperText, ...rest }: Props): JSX.Element => {
    const editorSchema = new Schema({
        nodes: addListNodes((defaultSchema.spec.nodes as unknown) as any, 'paragraph block* heading', 'block'),
        marks: {
            superscript: {
                parseDOM: [{ tag: 'sup' }, { style: 'vertical-align=super' }],
                toDOM: () => ['sup'],
            },
            subscript: {
                parseDOM: [{ tag: 'sub' }, { style: 'vertical-align=sub' }],
                toDOM: () => ['sub'],
            },
            underline: {
                parseDOM: [{ tag: 'u' }, { style: 'font-decoration=underline' }],
                toDOM: () => ['u'],
            },
            italic: {
                parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
                toDOM: () => ['i'],
            },
            bold: {
                parseDOM: [
                    { tag: 'strong' },
                    {
                        getAttrs: (node: any) => node.style.fontWeight !== 'normal' && null,
                        tag: 'b',
                    },
                    {
                        getAttrs: (value: string) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null,
                        style: 'font-weight',
                    },
                ],
                toDOM: () => ['b'],
            },
        },
    });

    const editorDiv = document.createElement('div');
    document.querySelector('#app').appendChild(editorDiv);

    const markActive = (type: MarkType<Schema>) => (state: EditorState): boolean => {
        const { from, $from, to, empty } = state.selection;

        return empty ? !!type.isInSet(state.storedMarks || $from.marks()) : state.doc.rangeHasMark(from, to, type);
    };

    return (
        <div className={`cover-letter${className ? ' ' + className : ''}`}>
            {/* <textarea className="cover-letter__input" id={id} name={id} ref={register} {...rest} /> */}
            <RichTextEditor
                editorState={EditorState.create({
                    doc: DOMParser.fromSchema(editorSchema).parse(editorDiv),
                    schema: editorSchema,
                    plugins: [
                        // undo(),
                        // redo(),
                        history(),
                        makeKeymap(editorSchema),
                        menuBar({
                            floating: false,
                            content: [
                                [
                                    new MenuItem({
                                        title: 'bold',
                                        label: 'bold',
                                        icon: `<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                        <title>inputs/text-editor/buttons/bold</title>
                                        <g id="inputs/text-editor/buttons/bold" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="baseline-format_bold-24px">
                                                <path d="M15.6,10.79 C16.57,10.12 17.25,9.02 17.25,8 C17.25,5.74 15.5,4 13.25,4 L7,4 L7,18 L14.04,18 C16.13,18 17.75,16.3 17.75,14.21 C17.75,12.69 16.89,11.39 15.6,10.79 Z M10,6.5 L13,6.5 C13.83,6.5 14.5,7.17 14.5,8 C14.5,8.83 13.83,9.5 13,9.5 L10,9.5 L10,6.5 Z M13.5,15.5 L10,15.5 L10,12.5 L13.5,12.5 C14.33,12.5 15,13.17 15,14 C15,14.83 14.33,15.5 13.5,15.5 Z" id="Shape" fill="#212121" fill-rule="nonzero"></path>
                                                <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                                            </g>
                                        </g>
                                    </svg>` as any,
                                        active: markActive(editorSchema.marks.bold),
                                        run: toggleMark(editorSchema.marks.bold),
                                    }),
                                    new MenuItem({
                                        title: 'italic',
                                        label: 'italic',
                                        icon: icons.bold,
                                        active: markActive(editorSchema.marks.italic),
                                        run: toggleMark(editorSchema.marks.italic),
                                    }),
                                    new MenuItem({
                                        title: 'underline',
                                        label: 'underline',
                                        icon: icons.underline,
                                        active: markActive(editorSchema.marks.underline),
                                        run: toggleMark(editorSchema.marks.underline),
                                    }),
                                    new MenuItem({
                                        title: 'subscript',
                                        label: 'subscript',
                                        icon: icons.subscript,
                                        active: markActive(editorSchema.marks.subscript),
                                        run: toggleMark(editorSchema.marks.subscript),
                                    }),
                                    new MenuItem({
                                        title: 'superscript',
                                        label: 'superscript',
                                        icon: icons.superscript,
                                        active: markActive(editorSchema.marks.superscript),
                                        run: toggleMark(editorSchema.marks.superscript),
                                    }),
                                ],
                            ],
                        }),
                    ],
                })}
            />
            <span
                className={`typography__label typography__label--helper-text ${
                    invalid ? 'typography__label--error' : 'typography__label--secondary'
                }`}
            >
                {invalid && <Close fontSize="small" />}
                {helperText}
            </span>
        </div>
    );
};

export default CoverLetter;
