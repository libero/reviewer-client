import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { getEditorsQuery, saveEditorsPageMutation } from '../graphql';
import useAutoSave from '../hooks/useAutoSave';
import { EditorAlias, EditorsDetails, ReviewerAlias, Submission } from '../types';
import { StepProps } from './SubmissionWizard';
import { PeoplePicker } from '../../ui/organisms';
import { ExpandingEmailField, ExcludedToggle } from '../../ui/molecules';
import { MultilineTextField } from '../../ui/atoms';

interface GetEditors {
    getEditors: EditorAlias[];
}

const EditorsForm = ({ initialValues, ButtonComponent }: StepProps): JSX.Element => {
    const { t } = useTranslation('wizard-form');
    const { editorDetails } = initialValues;
    const { data: getSeniorEditors, loading: loadingSeniorEditors } = useQuery<GetEditors>(getEditorsQuery, {
        variables: {
            role: 'seniorEditor',
        },
    });

    const { data: getReviewingEditors, loading: loadingReviewingEditors } = useQuery<GetEditors>(getEditorsQuery, {
        variables: {
            role: 'reviewingEditor',
        },
    });

    const removeBlankRows = (reviewers: ReviewerAlias[]): ReviewerAlias[] =>
        reviewers.filter((reviewer: ReviewerAlias) => reviewer.name + reviewer.email !== '');

    const schema = yup.object().shape({
        suggestedReviewers: yup.array(
            yup.object().shape(
                {
                    name: yup
                        .string()
                        .trim()
                        .when('email', {
                            is: email => email && email.length > 0,
                            then: yup.string().required(t('editors.validation.reviewers-name-required')),
                            otherwise: yup.string(),
                        }),
                    email: yup
                        .string()
                        .trim()
                        .when('name', {
                            is: name => name && name.length > 0,
                            then: yup
                                .string()
                                .email(t('editors.validation.reviewers-email-valid'))
                                .required(t('editors.validation.reviewers-email-required')),
                            otherwise: yup.string().email(t('editors.validation.reviewers-email-valid')),
                        }),
                },
                [['name', 'email']],
            ),
        ),
        opposedReviewers: yup.array(
            yup.object().shape(
                {
                    name: yup
                        .string()
                        .trim()
                        .when('email', {
                            is: email => email && email.length > 0,
                            then: yup.string().required(t('editors.validation.reviewers-name-required')),
                            otherwise: yup.string(),
                        }),
                    email: yup
                        .string()
                        .trim()
                        .when('name', {
                            is: name => name && name.length > 0,
                            then: yup
                                .string()
                                .email(t('editors.validation.reviewers-email-valid'))
                                .required(t('editors.validation.reviewers-email-required')),
                            otherwise: yup.string().email(t('editors.validation.reviewers-email-valid')),
                        }),
                },
                [['name', 'email']],
            ),
        ),
        opposedReviewersReason: yup.string().when('opposedReviewers', {
            is: (editors: ReviewerAlias[]) => editors.some(editor => editor.name + editor.email !== ''),
            then: yup.string().required(t('editors.validation.opposed-reviewers-reason-required')),
        }),
        opposedReviewingEditors: yup.array().max(2, t('opposed-reviewing-editors-max')),
        opposedReviewingEditorsReason: yup.string().when('opposedReviewingEditors', {
            is: editors => !!editors.length,
            then: yup.string().required(t('editors.validation.opposed-reviewing-editor-reason-required')),
        }),
    });

    const { watch, register, triggerValidation, setValue, errors } = useForm<EditorsDetails>({
        defaultValues: {
            suggestedSeniorEditors:
                editorDetails && editorDetails.suggestedSeniorEditors ? editorDetails.suggestedSeniorEditors : [],
            opposedSeniorEditors:
                editorDetails && editorDetails.opposedSeniorEditors ? editorDetails.opposedSeniorEditors : [],
            opposedSeniorEditorsReason:
                editorDetails && editorDetails.opposedSeniorEditorsReason
                    ? editorDetails.opposedSeniorEditorsReason
                    : '',
            suggestedReviewingEditors:
                editorDetails && editorDetails.suggestedReviewingEditors ? editorDetails.suggestedReviewingEditors : [],
            opposedReviewingEditors:
                editorDetails && editorDetails.opposedReviewingEditors ? editorDetails.opposedReviewingEditors : [],
            opposedReviewingEditorsReason:
                editorDetails && editorDetails.opposedReviewingEditorsReason
                    ? editorDetails.opposedReviewingEditorsReason
                    : '',
            suggestedReviewers:
                editorDetails && editorDetails.suggestedReviewers
                    ? editorDetails.suggestedReviewers.map(reviewer => ({ name: reviewer.name, email: reviewer.email }))
                    : [{ name: '', email: '' }],
            opposedReviewers:
                editorDetails && editorDetails.opposedReviewers
                    ? editorDetails.opposedReviewers.map(reviewer => ({ name: reviewer.name, email: reviewer.email }))
                    : [],
            opposedReviewersReason:
                editorDetails && editorDetails.opposedReviewersReason ? editorDetails.opposedReviewersReason : '',
        },
        mode: 'onBlur',
        validateCriteriaMode: 'all',
        validationSchema: schema,
    });
    const [saveCallback] = useMutation<Submission>(saveEditorsPageMutation);

    register({ name: 'suggestedSeniorEditors', type: 'custom' });
    register({ name: 'suggestedReviewingEditors', type: 'custom' });
    register({ name: 'suggestedReviewers', type: 'custom' });
    register({ name: 'opposedReviewingEditors', type: 'custom' });
    register({ name: 'opposedReviewers', type: 'custom' });

    const suggestedSeniorEditors = watch('suggestedSeniorEditors');
    const opposedSeniorEditors = watch('opposedSeniorEditors');
    const opposedSeniorEditorsReason = watch('opposedSeniorEditorsReason');
    const suggestedReviewingEditors = watch('suggestedReviewingEditors');
    const opposedReviewingEditors = watch('opposedReviewingEditors');
    const opposedReviewingEditorsReason = watch('opposedReviewingEditorsReason');
    const opposedReviewers = watch('opposedReviewers');
    const opposedReviewersReason = watch('opposedReviewersReason');
    const suggestedReviewers = watch('suggestedReviewers');

    const onSave = async (): Promise<void> => {
        const vars = {
            variables: {
                id: initialValues.id,
                details: {
                    suggestedSeniorEditors,
                    opposedSeniorEditors,
                    opposedSeniorEditorsReason,
                    suggestedReviewingEditors,
                    opposedReviewingEditors,
                    opposedReviewingEditorsReason,
                    suggestedReviewers: removeBlankRows(suggestedReviewers),
                    opposedReviewers: removeBlankRows(opposedReviewers),
                    opposedReviewersReason,
                },
            },
        };
        await saveCallback(vars);
    };

    useAutoSave(onSave, [
        suggestedSeniorEditors,
        opposedSeniorEditors,
        opposedSeniorEditorsReason,
        suggestedReviewingEditors,
        suggestedReviewers,
        opposedReviewingEditors,
        opposedReviewingEditorsReason,
        opposedReviewers,
        opposedReviewersReason,
    ]);

    const closeOpposedReviewers = (reasonFieldName: string, opposedFieldName: string): void => {
        setValue(reasonFieldName, '');
        setValue(opposedFieldName, []);
    };

    return (
        <div className="editors-step">
            <h2 className="typography__heading typography__heading--h2 files-step__title">{t('editors.title')}</h2>
            <PeoplePicker
                label={t('editors.editors-people-picker-label')}
                people={loadingSeniorEditors ? [] : getSeniorEditors.getEditors}
                onRemove={(selected): void =>
                    setValue('suggestedSeniorEditors', suggestedSeniorEditors.filter(personId => personId !== selected))
                }
                setSelectedPeople={(selected): void => setValue('suggestedSeniorEditors', selected)}
                selectedPeople={suggestedSeniorEditors}
                className="senior-editors-picker"
            />
            {/* TODO add exclude editor toggleable box */}
            <PeoplePicker
                label={t('editors.reviewers-people-picker-label')}
                people={
                    loadingReviewingEditors
                        ? []
                        : getReviewingEditors.getEditors.filter(ed => !opposedReviewingEditors.includes(ed.id))
                }
                onRemove={(selected): void =>
                    setValue(
                        'suggestedReviewingEditors',
                        suggestedReviewingEditors.filter(personId => personId !== selected),
                    )
                }
                setSelectedPeople={(selected): void => setValue('suggestedReviewingEditors', selected)}
                selectedPeople={suggestedReviewingEditors}
                className="reviewing-editors-picker"
            />
            <ExcludedToggle
                togglePrefixText={t('editors.opposed-reviewing-editors-toggle-prefix')}
                toggleActionText={t('editors.opposed-reviewing-editors-toggle-action-text')}
                onClose={(): void => closeOpposedReviewers('opposedReviewingEditorsReason', 'opposedReviewingEditors')}
                open={opposedReviewingEditors.length > 0 || opposedReviewingEditorsReason !== ''}
            >
                <PeoplePicker
                    label={t('editors.reviewers-people-picker-label')}
                    people={
                        loadingReviewingEditors
                            ? []
                            : getReviewingEditors.getEditors.filter(ed => !suggestedReviewingEditors.includes(ed.id))
                    }
                    onRemove={(selected): void =>
                        setValue(
                            'opposedReviewingEditors',
                            opposedReviewingEditors.filter(personId => personId !== selected),
                        )
                    }
                    setSelectedPeople={(selected): void => {
                        setValue('opposedReviewingEditors', selected);
                        triggerValidation('opposedReviewingEditorsReason');
                    }}
                    selectedPeople={opposedReviewingEditors}
                    className="opposed-reviewing-editors-picker"
                />
                <MultilineTextField
                    id="opposedReviewingEditorsReason"
                    register={register}
                    labelText={t('editors.opposed-reviewing-editor-reason-label')}
                    invalid={errors && errors.opposedReviewingEditorsReason !== undefined}
                    helperText={
                        errors && errors.opposedReviewingEditorsReason
                            ? errors.opposedReviewingEditorsReason.message
                            : null
                    }
                    onChange={(): void => {
                        //Is this needed? should be auto calling on change
                        triggerValidation('opposedReviewingEditorsReason');
                    }}
                />
            </ExcludedToggle>
            {/* TODO add exclude reviewer toggleable box */}
            <h2 className="typography__heading typography__heading--h3">{t('editors.reviewers-title')}</h2>
            <ExpandingEmailField
                maxRows={6}
                className="suggestedReviewers__inputs"
                name="suggestedReviewers"
                labelPrefix={t('editors.reviewers-label-prefix')}
                initialRows={suggestedReviewers}
                errors={errors && errors.suggestedReviewers}
                onChange={(personArray): void => {
                    setValue('suggestedReviewers', personArray, true);
                }}
            />
            <ExcludedToggle
                togglePrefixText={t('editors.opposed-reviewers-toggle-prefix')}
                toggleActionText={t('editors.opposed-reviewers-toggle-action-text')}
                panelHeading={t('editors.opposed-reviewers-title')}
                onClose={(): void => closeOpposedReviewers('opposedReviewersReason', 'opposedReviewers')}
                open={opposedReviewers.length > 0 || opposedReviewersReason !== ''}
            >
                <ExpandingEmailField
                    maxRows={2}
                    className="opposedReviewers__inputs"
                    name="opposedReviewers"
                    labelPrefix={t('editors.opposed-reviewers-label-prefix')}
                    initialRows={opposedReviewers}
                    errors={errors && errors.opposedReviewers}
                    onChange={(personArray): void => {
                        setValue('opposedReviewers', personArray, true);
                        triggerValidation('opposedReviewersReason');
                    }}
                />
                <MultilineTextField
                    id="opposedReviewersReason"
                    register={register}
                    labelText={t('editors.opposed-reviewers-reason-label')}
                    invalid={errors && errors.opposedReviewersReason !== undefined}
                    helperText={errors && errors.opposedReviewersReason ? errors.opposedReviewersReason.message : null}
                />
            </ExcludedToggle>
            {/* TODO add exclude reviewer (non editor) toggleable box */}

            {ButtonComponent && <ButtonComponent saveFunction={onSave} triggerValidation={triggerValidation} />}
        </div>
    );
};

export default EditorsForm;
