import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SelectField, TextField, MultilineTextField } from '../../ui/atoms';
import { Submission, ManuscriptDetails } from '../types';
import { Toggle } from '../../ui/molecules';
import { useMutation } from '@apollo/react-hooks';
import { saveDetailsPageMutation } from '../graphql';
import { Value } from '../../ui/atoms/SelectField';
import useAutoSave from '../hooks/useAutoSave';

// TODO: this should be pulled from config
const selectOptions = [
    { label: 'Neuroscience', value: 'neuroscience' },
    { label: 'Developmental Biology and Stem Cells', value: 'developmentalbiologyandstemcells' },
    { label: 'I am not a config list', value: 'foo' },
];

interface Props {
    initialValues?: Submission;
    setIsSaving?: any;
}

const DetailsForm = ({ initialValues, setIsSaving }: Props): JSX.Element => {
    const {
        title = '',
        previouslyDiscussed = '',
        previouslySubmitted = '',
        cosubmission: [firstCosubmissionTitle, secondCosubmissionTitle] = [],
        subjects = [],
    } = (initialValues.manuscriptDetails ? initialValues.manuscriptDetails : {}) as ManuscriptDetails;
    const { register, setValue, watch, control, formState, reset, getValues } = useForm({
        defaultValues: {
            title,
            subjects: subjects.map(subject => selectOptions.find(option => option.value === subject)),
            previouslyDiscussed,
            previouslySubmitted,
            firstCosubmissionTitle,
            secondCosubmissionTitle,
        },
    });
    useEffect(() => {
        if (!setIsSaving) {
            return;
        }
        if (formState.dirty) {
            setIsSaving(true);
        } else {
            setIsSaving(false);
        }
    }, [formState.dirty, setIsSaving]);

    const [hasSecondCosubmission, setCosubmissionState] = useState<boolean>(!!secondCosubmissionTitle);
    const { t } = useTranslation('wizard-form');
    const [saveCallback] = useMutation<Submission>(saveDetailsPageMutation);

    const titleWatch = watch('title');
    const unmappedSubjectsWatch = watch('subjects');
    const previouslyDiscussedWatch = watch('previouslyDiscussed');
    const previouslySubmittedWatch = watch('previouslySubmitted');
    const firstCosubmissionWatch = watch('firstCosubmissionTitle');
    const secondCosubmissionWatch = watch('secondCosubmissionTitle');
    const onSave = (): void => {
        const cosubmission =
            firstCosubmissionWatch || secondCosubmissionWatch
                ? [firstCosubmissionWatch, secondCosubmissionWatch || '']
                : [];
        const subjectsWatch = unmappedSubjectsWatch
            ? (unmappedSubjectsWatch as []).map((subject: Value) => subject.value)
            : null;
        const vars = {
            variables: {
                id: initialValues.id,
                details: {
                    title: titleWatch,
                    subjects: subjectsWatch,
                    previouslyDiscussed: previouslyDiscussedWatch,
                    previouslySubmitted: previouslySubmittedWatch,
                    cosubmission,
                },
            },
        };
        saveCallback(vars);
        if (setIsSaving) {
            reset(getValues());
        }
    };

    useAutoSave(onSave, [
        titleWatch,
        unmappedSubjectsWatch,
        previouslyDiscussedWatch,
        previouslySubmittedWatch,
        firstCosubmissionWatch,
        secondCosubmissionWatch,
    ]);

    return (
        <form>
            <h2 className="typography__heading typography__heading--h2">{t('details.form-title')}</h2>
            <TextField id="title" register={register} labelText={t('details.title-label')} />
            <SelectField
                id="subjects"
                labelText="Subject area(s)"
                values={selectOptions}
                setValue={setValue}
                control={control}
                formComponent={true}
                multi
                helperText="Choose up to 2 subject areas"
                className="subject-area"
            />
            <Toggle
                id="previouslyDiscussedContainer"
                toggleLabel={t('details.previously-discussed-toggle')}
                open={!!previouslyDiscussed}
            >
                <MultilineTextField
                    id="previouslyDiscussed"
                    register={register}
                    labelText={t('details.previously-discussed-label')}
                />
            </Toggle>
            <Toggle
                id="previouslyConsideredContainer"
                toggleLabel={t('details.previously-submitted-toggle')}
                open={!!previouslySubmitted}
            >
                <MultilineTextField
                    id="previouslySubmitted"
                    register={register}
                    labelText={t('details.previously-submitted-label')}
                />
            </Toggle>
            <Toggle
                id="cosubmission"
                toggleLabel={t('details.cosubmission-toggle')}
                open={!!firstCosubmissionTitle || !!secondCosubmissionTitle}
            >
                <TextField
                    id="firstCosubmissionTitle"
                    register={register}
                    labelText={t('details.cosubmission-title-label')}
                />
                {hasSecondCosubmission ? (
                    <TextField
                        id="secondCosubmissionTitle"
                        register={register}
                        labelText={t('details.second-cosubmission-title-label')}
                    />
                ) : (
                    <span className="typography__small">
                        {t('details.second-cosubmission-toggle-prefix')}
                        <span className="typography__body--link" onClick={(): void => setCosubmissionState(true)}>
                            {t('details.second-cosubmission-toggle-link')}
                        </span>
                        {t('details.second-cosubmission-toggle-suffix')}
                    </span>
                )}
            </Toggle>
        </form>
    );
};

export default DetailsForm;
