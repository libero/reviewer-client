import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import { getEditorsQuery, saveEditorsPageMutation } from '../graphql';
import useAutoSave from '../hooks/useAutoSave';
import { EditorAlias, EditorsDetails, ReviewerAlias, Submission } from '../types';
import { StepProps } from './SubmissionWizard';
import { PeoplePicker } from '../../ui/organisms';
import { ExpandingEmailField, ExcludedToggle } from '../../ui/molecules';
import { MultilineTextField } from '../../ui/atoms';
import { set } from 'lodash';
import { Link } from 'react-router-dom';

const MIN_SUGGESTED_SENIOR_EDITORS = 2;
const MAX_SUGGESTED_SENIOR_EDITORS = 6;
const MIN_SUGGESTED_REVIEWING_EDITORS = 2;
const MAX_SUGGESTED_REVIEWING_EDITORS = 6;
const MAX_SUGGESTED_REVIEWERS = 6;
const MAX_OPPOSED_REVIEWERS = 2;
const MAX_OPPOSED_REVIEWING_EDITORS = 2;
const MAX_OPPOSED_SENIOR_EDITORS = 1;

interface GetEditors {
    getEditors: EditorAlias[];
}

const EditorsForm = ({ initialValues, schemaFactory, ButtonComponent, toggleErrorBar }: StepProps): JSX.Element => {
    const { t } = useTranslation('wizard-form');
    const { editorDetails } = initialValues;
    const { data: getSeniorEditors, loading: loadingSeniorEditors } = useQuery<GetEditors>(getEditorsQuery, {
        variables: {
            role: 'seniorEditor',
        },
    });

    const { data: getLeadership, loading: loadingLeadership } = useQuery<GetEditors>(getEditorsQuery, {
        variables: {
            role: 'leadership',
        },
    });

    const { data: getReviewingEditors, loading: loadingReviewingEditors } = useQuery<GetEditors>(getEditorsQuery, {
        variables: {
            role: 'reviewingEditor',
        },
    });

    const removeBlankRows = (reviewers: ReviewerAlias[]): ReviewerAlias[] =>
        reviewers.filter((reviewer: ReviewerAlias) => reviewer.name + reviewer.email !== '');

    const schema = schemaFactory(t);
    const validationResolver = useCallback((data: EditorsDetails) => {
        try {
            schema.validateSync({ ...data, articleType: initialValues.articleType }, { abortEarly: false });
            return { errors: {}, values: data };
        } catch (errors) {
            return {
                errors: errors.inner.reduce(
                    (
                        errorObject: {},
                        { path, message, type }: { path: string; message: string; type: string; inner: [] },
                    ) => set(errorObject, path, { message, type }),
                    {},
                ),
                values: data,
            };
        }
    }, []);

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
        validationResolver,
    });
    const [saveCallback] = useMutation<Submission>(saveEditorsPageMutation);

    register({ name: 'suggestedSeniorEditors', type: 'custom' });
    register({ name: 'suggestedReviewingEditors', type: 'custom' });
    register({ name: 'suggestedReviewers', type: 'custom' });
    register({ name: 'opposedSeniorEditors', type: 'custom' });
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

    useEffect(() => {
        if (toggleErrorBar && Object.keys(errors).length === 0) {
            toggleErrorBar(false);
        }
    }, [
        suggestedSeniorEditors,
        opposedSeniorEditors,
        opposedSeniorEditorsReason,
        suggestedReviewingEditors,
        suggestedReviewers,
        opposedReviewingEditors,
        opposedReviewingEditorsReason,
        opposedReviewers,
        opposedReviewersReason,
        errors,
    ]);

    const closeOpposedReviewers = (reasonFieldName: string, opposedFieldName: string): void => {
        setValue(reasonFieldName, '');
        setValue(opposedFieldName, []);
    };

    const isRequired = (): boolean => initialValues.articleType !== 'feature';

    return (
        <div className="editors-step">
            <h2 className="typography__heading typography__heading--h2 files-step__title">{t('editors.title')}</h2>
            <PeoplePicker
                label={t('editors.editors-people-picker-label')}
                loading={loadingSeniorEditors || loadingLeadership}
                people={
                    loadingSeniorEditors || loadingLeadership
                        ? []
                        : [...getSeniorEditors.getEditors, ...getLeadership.getEditors]
                }
                onChange={(selected): void => {
                    setValue('suggestedSeniorEditors', selected);
                    triggerValidation('suggestedSeniorEditors');
                }}
                initialSelectedPeople={suggestedSeniorEditors}
                className="senior-editors-picker"
                error={
                    errors && errors.suggestedSeniorEditors
                        ? ((errors.suggestedSeniorEditors as unknown) as { message: string }).message
                        : ''
                }
                min={MIN_SUGGESTED_SENIOR_EDITORS}
                max={MAX_SUGGESTED_SENIOR_EDITORS}
                required={isRequired()}
            />
            <ExcludedToggle
                togglePrefixText={t('editors.opposed-senior-editors-toggle-prefix')}
                toggleActionText={t('editors.opposed-senior-editors-toggle-action-text')}
                onClose={(): void => closeOpposedReviewers('opposedSeniorEditorsReason', 'opposedSeniorEditors')}
                open={opposedSeniorEditors.length > 0 || opposedSeniorEditorsReason !== ''}
                panelHeading={t('editors.opposed-senior-editors-people-picker-label')}
            >
                {/* <PeoplePicker
                    people={
                        loadingSeniorEditors || loadingLeadership
                            ? []
                            : [...getSeniorEditors.getEditors, ...getLeadership.getEditors].filter(
                                  ed => !suggestedSeniorEditors.includes(ed.id),
                              )
                    }
                    loading={loadingSeniorEditors || loadingLeadership}
                    onChange={(selected): void => {
                        setValue('opposedSeniorEditors', selected);
                        triggerValidation('opposedSeniorEditorsReason');
                    }}
                    initialSelectedPeople={opposedSeniorEditors}
                    className="opposed-senior-editors-picker"
                    max={MAX_OPPOSED_SENIOR_EDITORS}
                    hideLabel={true}
                    label={t('editors.opposed-senior-editors-people-picker-label')}
                /> */}
                <MultilineTextField
                    id="opposedSeniorEditorsReason"
                    register={register}
                    labelText={t('editors.opposed-senior-editors-reason-label')}
                    invalid={errors && errors.opposedSeniorEditorsReason !== undefined}
                    helperText={
                        errors && errors.opposedSeniorEditorsReason ? errors.opposedSeniorEditorsReason.message : null
                    }
                />
            </ExcludedToggle>
            {/* <PeoplePicker
                label={t('editors.reviewers-people-picker-label')}
                loading={loadingReviewingEditors}
                people={
                    loadingReviewingEditors
                        ? []
                        : getReviewingEditors.getEditors.filter(ed => !opposedReviewingEditors.includes(ed.id))
                }
                onChange={(selected): void => {
                    setValue('suggestedReviewingEditors', selected);
                    triggerValidation('suggestedReviewingEditors');
                }}
                initialSelectedPeople={suggestedReviewingEditors}
                className="reviewing-editors-picker"
                error={
                    errors && errors.suggestedReviewingEditors
                        ? ((errors.suggestedReviewingEditors as unknown) as { message: string }).message
                        : ''
                }
                min={MIN_SUGGESTED_REVIEWING_EDITORS}
                max={MAX_SUGGESTED_REVIEWING_EDITORS}
                required={isRequired()}
            /> */}
            <ExcludedToggle
                togglePrefixText={t('editors.opposed-reviewing-editors-toggle-prefix')}
                toggleActionText={t('editors.opposed-reviewing-editors-toggle-action-text')}
                onClose={(): void => closeOpposedReviewers('opposedReviewingEditorsReason', 'opposedReviewingEditors')}
                open={opposedReviewingEditors.length > 0 || opposedReviewingEditorsReason !== ''}
                panelHeading={t('editors.opposed-reviewing-editors-people-picker-label')}
            >
                {/* <PeoplePicker
                    loading={loadingReviewingEditors}
                    people={
                        loadingReviewingEditors
                            ? []
                            : getReviewingEditors.getEditors.filter(ed => !suggestedReviewingEditors.includes(ed.id))
                    }
                    onChange={(selected): void => {
                        setValue('opposedReviewingEditors', selected);
                        triggerValidation('opposedReviewingEditorsReason');
                    }}
                    initialSelectedPeople={opposedReviewingEditors}
                    className="opposed-reviewing-editors-picker"
                    max={MAX_OPPOSED_REVIEWING_EDITORS}
                    label={t('editors.opposed-reviewing-editors-people-picker-label')}
                    hideLabel={true}
                /> */}
                <MultilineTextField
                    id="opposedReviewingEditorsReason"
                    register={register}
                    labelText={t('editors.opposed-reviewing-editors-reason-label')}
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
            <h2 className="typography__heading typography__heading--h3">{t('editors.reviewers-title')}</h2>
            <span className="suggestedReviewers--diversity typography__body typography__body--secondary">
                {t('editors.reviewers-diversity_1')}
                <Link to="/author-guide/initial#diversity" className="typography__body--link">
                    {t('editors.reviewers-diversity-link')}
                </Link>
                {t('editors.reviewers-diversity_2')}
            </span>
            <ExpandingEmailField
                maxRows={MAX_SUGGESTED_REVIEWERS}
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
                    maxRows={MAX_OPPOSED_REVIEWERS}
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
