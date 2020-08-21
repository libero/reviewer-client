import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SelectField, TextField, ExpandingTextField, MultilineTextField } from '../../ui/atoms';
import { Submission, ManuscriptDetails, Suggestion } from '../types';
import { Toggle } from '../../ui/molecules';
import { useMutation } from '@apollo/react-hooks';
import { saveDetailsPageMutation } from '../graphql';
import { Value } from '../../ui/atoms/SelectField';
import useAutoSave from '../hooks/useAutoSave';
import { StepProps } from './SubmissionWizard';
import { getConfig } from '../../core/utils/config';

const majorSubjectAreas = getConfig().client.majorSubjectAreas;
const selectOptions = Object.keys(majorSubjectAreas).map(key => ({ label: majorSubjectAreas[key], value: key }));

const overwriteWithSuggestions = (values: ManuscriptDetails, suggestions: Array<Suggestion>): void => {
    const detail = (values ? values : {}) as ManuscriptDetails;
    const titleIsBlank = !detail.title || detail.title === '';
    const titleSuggestion = suggestions.find(suggestion => suggestion.fieldName === 'title');
    if (titleIsBlank && titleSuggestion) {
        detail.title = titleSuggestion.value;
    }
};

const defaultManuscriptDetails = (values: ManuscriptDetails): ManuscriptDetails => {
    const detail = (values ? values : {}) as ManuscriptDetails;
    detail.cosubmission = detail.cosubmission ? detail.cosubmission : ['', ''];
    detail.subjects = detail.subjects ? detail.subjects : [];
    return detail;
};

const DetailsForm = ({ initialValues, schemaFactory, ButtonComponent, toggleErrorBar }: StepProps): JSX.Element => {
    const { t } = useTranslation('wizard-form');
    const schema = schemaFactory(t);
    const validationResolver = useCallback((data: ManuscriptDetails) => {
        try {
            schema.validateSync({ ...data, articleType: initialValues.articleType }, { abortEarly: false });
            return { errors: {}, values: data };
        } catch (errors) {
            return {
                errors: errors.inner.reduce(
                    (
                        errorObject: {},
                        { path, message, type }: { path: string; message: string; type: string; inner: [] },
                    ) => ({
                        ...errorObject,
                        [path]: { message, type },
                    }),
                    {},
                ),
                values: data,
            };
        }
    }, []);
    const details = defaultManuscriptDetails(initialValues.manuscriptDetails);
    overwriteWithSuggestions(details, initialValues.suggestions || []);
    const {
        title,
        previouslyDiscussed = '',
        previouslySubmitted = '',
        cosubmission: [firstCosubmissionTitle, secondCosubmissionTitle],
        subjects = [],
    } = details;

    const { register, setValue, watch, control, triggerValidation, errors } = useForm<
        Omit<ManuscriptDetails, 'subjects'> & {
            subjects: { label: string; value: string }[];
            firstCosubmissionTitle: string;
            secondCosubmissionTitle: string;
        }
    >({
        defaultValues: {
            title,
            subjects: subjects.map(subject => selectOptions.find(option => option.value === subject)),
            previouslyDiscussed,
            previouslySubmitted,
            firstCosubmissionTitle,
            secondCosubmissionTitle,
        },
        mode: 'onBlur',
        validationResolver,
    });

    const [hasSecondCosubmission, setCosubmissionState] = useState<boolean>(!!secondCosubmissionTitle);
    const [saveCallback] = useMutation<Submission>(saveDetailsPageMutation);

    const titleWatch = watch('title');
    const unmappedSubjectsWatch = watch('subjects');
    const previouslyDiscussedWatch = watch('previouslyDiscussed');
    const previouslySubmittedWatch = watch('previouslySubmitted');
    const firstCosubmissionWatch = watch('firstCosubmissionTitle');
    const secondCosubmissionWatch = watch('secondCosubmissionTitle');
    const onSave = async (): Promise<void> => {
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
        await saveCallback(vars);
    };

    useAutoSave(onSave, [
        titleWatch,
        unmappedSubjectsWatch,
        previouslyDiscussedWatch,
        previouslySubmittedWatch,
        firstCosubmissionWatch,
        secondCosubmissionWatch,
    ]);

    useEffect(() => {
        if (toggleErrorBar && Object.keys(errors).length === 0) {
            toggleErrorBar(false);
        }
    }, [
        titleWatch,
        unmappedSubjectsWatch,
        previouslyDiscussedWatch,
        previouslySubmittedWatch,
        firstCosubmissionWatch,
        secondCosubmissionWatch,
        errors,
    ]);

    return (
        <form onSubmit={(e: React.BaseSyntheticEvent): void => e.preventDefault()}>
            <h2 className="typography__heading typography__heading--h2 details-page__title">
                {t('details.form-title')}
            </h2>
            <ExpandingTextField
                id="title"
                register={register}
                labelText={t('details.title-label')}
                invalid={errors && errors.title !== undefined}
                helperText={errors && errors.title ? errors.title.message : null}
            />
            <SelectField
                id="subjects"
                labelText={t('details.subject-areas')}
                values={selectOptions}
                setValue={setValue}
                control={control}
                formComponent={true}
                multi
                limitReached={unmappedSubjectsWatch && unmappedSubjectsWatch.length >= 2}
                className="subject-area"
                invalid={errors && errors.subjects !== undefined}
                helperText={
                    errors && errors.subjects
                        ? ((errors.subjects as unknown) as { message: string }).message
                        : unmappedSubjectsWatch && unmappedSubjectsWatch.length >= 2
                        ? t('details.subjects-helper-text-max')
                        : t('details.subjects-helper-text')
                }
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
                    invalid={errors && errors.previouslyDiscussed !== undefined}
                    helperText={errors && errors.previouslyDiscussed ? errors.previouslyDiscussed.message : null}
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
                    invalid={errors && errors.previouslySubmitted !== undefined}
                    helperText={errors && errors.previouslySubmitted ? errors.previouslySubmitted.message : null}
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
                    invalid={errors && errors.firstCosubmissionTitle !== undefined}
                    helperText={errors && errors.firstCosubmissionTitle ? errors.firstCosubmissionTitle.message : null}
                />
                {hasSecondCosubmission ? (
                    <TextField
                        id="secondCosubmissionTitle"
                        register={register}
                        labelText={t('details.second-cosubmission-title-label')}
                        invalid={errors && errors.secondCosubmissionTitle !== undefined}
                        helperText={
                            errors && errors.secondCosubmissionTitle ? errors.secondCosubmissionTitle.message : null
                        }
                    />
                ) : (
                    <span className="typography__small">
                        {t('details.second-cosubmission-toggle-prefix')}
                        <span
                            className="typography__body--link"
                            id="secondCosubmissionTitleButton"
                            onClick={(): void => setCosubmissionState(true)}
                        >
                            {t('details.second-cosubmission-toggle-link')}
                        </span>
                        {t('details.second-cosubmission-toggle-suffix')}
                    </span>
                )}
            </Toggle>
            {ButtonComponent && <ButtonComponent saveFunction={onSave} triggerValidation={triggerValidation} />}
        </form>
    );
};

export default DetailsForm;
