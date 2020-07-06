import React, { TextareaHTMLAttributes } from 'react';
import Close from '@material-ui/icons/Close';
import { keymap } from 'prosemirror-keymap';
import { undoInputRule } from 'prosemirror-inputrules';
import { EditorState } from 'prosemirror-state';
import { addListNodes, wrapInList } from 'prosemirror-schema-list';
import { schema as defaultSchema } from 'prosemirror-schema-basic';
import { Schema, DOMParser, MarkType, DOMSerializer, Fragment } from 'prosemirror-model';
import { baseKeymap, toggleMark, setBlockType, chainCommands, exitCode, selectParentNode } from 'prosemirror-commands';
import { undo, redo, history } from 'prosemirror-history';
import { menuBar, MenuItem } from 'prosemirror-menu';
import RichTextEditor from './RichTextEditorWrapper';
import editorIcon from '../atoms/EditorIcon';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    helperText?: string;
    id: string;
    coverLetter: string;
    invalid?: boolean;
    onChange?: (val: any) => void;
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

const parser = (schema: Schema) => {
    const parser = DOMParser.fromSchema(schema);

    return (content: string) => {
        const container = document.createElement('article');
        container.innerHTML = content;
        return parser.parse(container);
    };
};

const serializer = (schema: Schema) => {
    const serializer = DOMSerializer.fromSchema(schema);

    return (content: Fragment) => {
        const container = document.createElement('article');
        container.appendChild(serializer.serializeFragment(content));
        return container.innerHTML;
    };
};

const CoverLetter = ({
    coverLetter = '',
    id,
    className,
    invalid,
    helperText,
    onChange,
    ...rest
}: Props): JSX.Element => {
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

    const parse = parser(editorSchema);
    const serialize = serializer(editorSchema);

    const markActive = (type: MarkType<Schema>) => (state: EditorState): boolean => {
        const { from, $from, to, empty } = state.selection;

        return empty ? !!type.isInSet(state.storedMarks || $from.marks()) : state.doc.rangeHasMark(from, to, type);
    };

    return (
        <div className={`cover-letter${className ? ' ' + className : ''}`}>
            {/* <textarea className="cover-letter__input" id={id} name={id} ref={register} {...rest} /> */}
            <RichTextEditor
                onChange={(val: any) => {
                    onChange(serialize(val));
                }}
                editorState={EditorState.create({
                    doc: parse(coverLetter),
                    schema: editorSchema,
                    plugins: [
                        history(),
                        makeKeymap(editorSchema),
                        menuBar({
                            floating: false,
                            content: [
                                [
                                    new MenuItem({
                                        title: 'bold',
                                        label: 'bold',
                                        icon: { dom: editorIcon('bold') },
                                        active: markActive(editorSchema.marks.bold),
                                        run: toggleMark(editorSchema.marks.bold),
                                    }),
                                    new MenuItem({
                                        title: 'italic',
                                        label: 'italic',
                                        icon: { dom: editorIcon('italic') },
                                        active: markActive(editorSchema.marks.italic),
                                        run: toggleMark(editorSchema.marks.italic),
                                    }),
                                    new MenuItem({
                                        title: 'underline',
                                        label: 'underline',
                                        icon: { dom: editorIcon('underline') },
                                        active: markActive(editorSchema.marks.underline),
                                        run: toggleMark(editorSchema.marks.underline),
                                    }),
                                    new MenuItem({
                                        title: 'subscript',
                                        label: 'subscript',
                                        icon: { dom: editorIcon('subscript') },
                                        active: markActive(editorSchema.marks.subscript),
                                        run: toggleMark(editorSchema.marks.subscript),
                                    }),
                                    new MenuItem({
                                        title: 'superscript',
                                        label: 'superscript',
                                        icon: { dom: editorIcon('superscript') },
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
