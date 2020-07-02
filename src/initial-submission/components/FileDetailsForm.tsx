import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import Interweave from 'interweave';
import { CoverLetter, FileUpload, MultiFileUpload, RichTextEditor } from '../../ui/molecules';
import { fileUploadProgressSubscription, saveFilesPageMutation, uploadManuscriptMutation } from '../graphql';
import useAutoSave from '../hooks/useAutoSave';
import { FileDetails, UploadInProgressData } from '../types';
import useSupportingFileHook from '../hooks/useSupportingFileHook';
import { StepProps } from './SubmissionWizard';
import { EditorState } from 'prosemirror-state';
import { addListNodes } from 'prosemirror-schema-list';
import { schema as defaultSchema } from 'prosemirror-schema-basic';
import { Schema, DOMParser } from 'prosemirror-model';
import { exampleSetup } from 'prosemirror-example-setup';
import { toggleMark, setBlockType, wrapIn } from 'prosemirror-commands';
import { undo, redo, history } from 'prosemirror-history';
import { menuBar, MenuItem, icons } from 'prosemirror-menu';

//TODO: these should live in config
const allowedManuscriptFileTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
];
const maxSupportingFiles = 10;

const maxFileSize = 104857600;

type UploadInProgress = {
    progress?: number;
    fileName?: string;
};

const FileDetailsForm = ({ initialValues, schemaFactory, ButtonComponent }: StepProps): JSX.Element => {
    const { t } = useTranslation('wizard-form');
    const { files } = initialValues;
    const editorSchema = new Schema({
        nodes: addListNodes((defaultSchema.spec.nodes as unknown) as any, 'paragraph block* heading', 'block'),
        marks:
            // defaultSchema.spec.marks
            {
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

    // this might be better placed in its own hook or wrapper component so changes don't cause whole page re-render.
    // TODO: Manual Test - when done check that the state is not overwritten when re-rendered.
    const [manuscriptStatus, setManuscriptStatus] = useState<{
        fileStored?: {};
        uploadInProgress?: UploadInProgress;
        error?: 'multiple' | 'validation' | 'server';
    }>({
        fileStored: {
            fileName: files && files.manuscriptFile ? files.manuscriptFile.filename : undefined,
            previewLink: files && files.manuscriptFile ? files.manuscriptFile.downloadLink : undefined,
        },
    });
    const schema = schemaFactory(t);

    const { register, watch, errors, triggerValidation } = useForm<FileDetails>({
        defaultValues: {
            coverLetter: files ? files.coverLetter : '',
        },
        mode: 'onBlur',
        validationSchema: schema,
    });

    const [saveCallback] = useMutation(saveFilesPageMutation);
    const [uploadManuscriptFile] = useMutation(uploadManuscriptMutation);

    const { data: uploadProgressData, loading } = useSubscription<UploadInProgressData>(
        fileUploadProgressSubscription,
        {
            variables: { submissionId: initialValues.id },
        },
    );

    const [
        onSupportingFilesUpload,
        deleteSupportingFileCallback,
        supportingFilesStatus,
        supportingUploadDisabled,
        filesStoredCount,
    ] = useSupportingFileHook(initialValues, maxSupportingFiles, maxFileSize, uploadProgressData);

    useEffect(() => {
        if (
            !loading &&
            uploadProgressData &&
            uploadProgressData.fileUploadProgress !== null &&
            typeof manuscriptStatus.uploadInProgress !== 'undefined'
        ) {
            if (
                manuscriptStatus.uploadInProgress.fileName === uploadProgressData.fileUploadProgress.filename &&
                uploadProgressData.fileUploadProgress.type === 'MANUSCRIPT_SOURCE'
            ) {
                setManuscriptStatus({
                    fileStored: manuscriptStatus.fileStored,
                    uploadInProgress: {
                        ...manuscriptStatus.uploadInProgress,
                        progress: parseInt(uploadProgressData.fileUploadProgress.percentage),
                    },
                });
            }
        }
    }, [uploadProgressData, loading]);

    const onManuscriptUpload = (filesList: File[]): void => {
        if (!allowedManuscriptFileTypes.includes(filesList[0].type) || filesList[0].size > maxFileSize) {
            setManuscriptStatus({ error: 'validation' });
            return;
        }

        setManuscriptStatus({
            fileStored: manuscriptStatus.fileStored,
            uploadInProgress: {
                progress: 0,
                fileName: filesList[0].name,
            },
        });

        uploadManuscriptFile({
            variables: {
                id: initialValues.id,
                file: filesList[0],
                fileSize: filesList[0].size,
            },
        })
            .then(({ data }) => {
                const { filename: fileName, downloadLink: previewLink } = data.uploadManuscript.files.manuscriptFile;
                setManuscriptStatus({
                    fileStored: {
                        fileName,
                        previewLink,
                    },
                });
            })
            .catch(() => {
                setManuscriptStatus({ error: 'server' });
            });
    };

    const coverLetter = watch('coverLetter');
    const onSave = async (): Promise<void> => {
        const vars = {
            variables: {
                id: initialValues.id,
                coverLetter,
            },
        };
        await saveCallback(vars);
    };

    useAutoSave(onSave, [coverLetter]);

    return (
        <div className="files-step">
            <h2 className="typography__heading typography__heading--h2 files-step__title">
                {t('files.coverletter-title')}
            </h2>
            <Interweave content={t('files.coverletter-guidance')} />
            {/* <CoverLetter
                id="coverLetter"
                register={register}
                invalid={errors && errors.coverLetter !== undefined}
                helperText={errors && errors.coverLetter ? errors.coverLetter.message : null}
            /> */}
            <RichTextEditor
                editorState={EditorState.create({
                    doc: DOMParser.fromSchema(editorSchema).parse(editorDiv),
                    schema: editorSchema,
                    plugins: [
                        history(),
                        menuBar({
                            floating: false,
                            content: [
                                [
                                    new MenuItem({
                                        title: 'test',
                                        label: 'label',
                                        icon: icons.bold,
                                        active: () => true,
                                        run: toggleMark(editorSchema.marks.bold),
                                    }),
                                ],
                            ],
                        }),
                    ],
                    //exampleSetup({ schema: editorSchema }),
                })}
            />
            <h2 className="typography__heading typography__heading--h2 files-step__title">
                {t('files.manuscript-title')}
            </h2>
            <Interweave content={t('files.manuscript-guidance')} />
            <FileUpload onUpload={onManuscriptUpload} state={manuscriptStatus} />
            <h2 className="typography__heading typography__heading--h2 files-step__title">
                {t('files.supporting-title')}
            </h2>
            <Interweave content={t('files.supporting-guidance')} />
            <div className="supporting-files">
                <MultiFileUpload
                    onUpload={onSupportingFilesUpload}
                    onDelete={deleteSupportingFileCallback}
                    files={supportingFilesStatus}
                    disableDelete={supportingUploadDisabled}
                    disableUpload={supportingUploadDisabled || filesStoredCount === maxSupportingFiles}
                    extraMessage={filesStoredCount === maxSupportingFiles && t('files.supporting-files-max')}
                />
            </div>
            {ButtonComponent && <ButtonComponent saveFunction={onSave} triggerValidation={triggerValidation} />}
        </div>
    );
};

export default FileDetailsForm;
