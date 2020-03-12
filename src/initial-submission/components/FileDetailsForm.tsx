import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { CoverLetter, FileUpload } from '../../ui/molecules';
import { saveFilesPageMutation, uploadManuscriptMutation } from '../graphql';
import { AutoSaveDecorator } from '../utils/autosave-decorator';

interface Props {
    initialValues?: {
        id: string;
        coverLetter?: string;
        manuscriptFile?: {
            filename: string;
            url: string;
        };
    };
}

// TODO: remove default initialValues object once we enforce fetching of submission in SubmissionWizard see https://github.com/libero/reviewer-client/issues/138
const FileDetailsForm = ({ initialValues = { id: '' } }: Props): JSX.Element => {
    const { register, watch } = useForm({
        defaultValues: {
            coverLetter: initialValues.coverLetter,
        },
    });

    const [saveCallback] = useMutation(saveFilesPageMutation);

    const [uploadManuscriptFile] = useMutation(uploadManuscriptMutation);

    // this might be better placed in its own hook or wrapper component so changes don't cause whole page rerender
    const [manuscriptStatus, setManuscriptStatus] = useState<{
        fileStored?: {};
        uploadInProgress?: {};
        error?: 'multiple' | 'size' | 'server';
    }>({});

    useEffect(() => {
        if (initialValues.manuscriptFile) {
            setManuscriptStatus({
                fileStored: {
                    fileName: initialValues.manuscriptFile.filename,
                    previewLink: initialValues.manuscriptFile.url,
                },
            });
        }
    }, []);

    const onManuscriptUpload = (files: File[]): void => {
        setManuscriptStatus({
            fileStored: manuscriptStatus.fileStored,
            uploadInProgress: {
                progress: 0,
                fileName: files[0].name,
            },
        });

        uploadManuscriptFile({
            variables: {
                id: initialValues.id,
                file: files[0],
                fileSize: files[0].size,
            },
        })
            .then(({ data }) => {
                const { filename: fileName, url: previewLink } = data.uploadManuscript.manuscriptFile;

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
    const onSave = (): void => {
        const vars = {
            variables: {
                id: initialValues.id,
                coverLetter,
            },
        };
        saveCallback(vars);
    };

    useEffect(() => {
        AutoSaveDecorator(onSave);
    }, [coverLetter]);

    return (
        <div>
            <h2 className="typography__heading typography__heading--h2 files-step__title">Your cover letter</h2>
            <span className="typography__small typography__small--secondary">
                Enter your cover letter below. Please help us evaluate your work by answering the following questions:
            </span>
            <ul className="cover-letter__list typography__small">
                <li>How will your work make others in the field think differently and move the field forward?</li>
                <li>How does your work relate to the current literature on the topic?</li>
                <li>Who do you consider to be the most relevant audience for this work?</li>
                <li>What do you think the work has achieved or not achieved?</li>
            </ul>
            <CoverLetter id="coverLetter" register={register} />
            <h2 className="typography__heading typography__heading--h2 files-step__title">Your manuscript file</h2>
            <span className="typography__small typography__small--secondary">
                Please include figures in your manuscript file. You do not need to upload figures separately.{' '}
                <a className="typography__small typography__small--link files-step__link--nested">Learn more</a>
            </span>
            <FileUpload onUpload={onManuscriptUpload} state={manuscriptStatus} />
            <h2 className="typography__heading typography__heading--h2 files-step__title">
                Supporting files (optional)
            </h2>
            <span className="typography__small typography__small--secondary">
                Any videos, audio clips or interactive files you believe will assist in the initial assessment of your
                submission should be uploaded as supporting files. You will be able to upload additional files at the
                full submission stage if necessary.
            </span>
            <div className="supporting-files">
                <label className="typography__small typography__small--link" htmlFor="supporting-files">
                    Add supporting files
                </label>
                <input id="supporting-files" className="supporting-files__input" type="file" />
            </div>
        </div>
    );
}; //TODO add supporting files component

export default FileDetailsForm;
