import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { getEditorsQuery, saveEditorsPageMutation } from '../graphql';
import useAutoSave from '../hooks/useAutoSave';
import { EditorAlias, EditorsDetails, Submission } from '../types';
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

    const schema = yup.object().shape({
        suggestedReviewers: yup.array(
            yup.object().shape(
                {
                    name: yup
                        .string()
                        .trim()
                        .required('Name is required'),
                    email: yup
                        .string()
                        .trim()
                        .email('Must be a valid email'),
                },
                [['name', 'email']],
            ),
        ),
        opposedReviewingEditors: yup.array().max(2, t('opposed-reviewering-editors-max')),
        opposedReviewersReason: yup.string().when('opposedReviewingEditors', {
            is: editors => !!editors.length,
            then: yup.string().required(t('editors.validation.opposed-reviewering-editor-reason-required')),
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
                    ? editorDetails.suggestedReviewers
                    : [{ name: '', email: '' }],
            opposedReviewers: editorDetails && editorDetails.opposedReviewers ? editorDetails.opposedReviewers : [],
            opposedReviewersReason:
                editorDetails && editorDetails.opposedReviewersReason ? editorDetails.opposedReviewersReason : '',
        },
        mode: 'onBlur',
        validationSchema: schema,
    });
    const [saveCallback] = useMutation<Submission>(saveEditorsPageMutation);

    register({ name: 'suggestedSeniorEditors', type: 'custom' });
    register({ name: 'suggestedReviewingEditors', type: 'custom' });
    register({ name: 'opposedReviewingEditors', type: 'custom' });

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
                    suggestedReviewers: suggestedReviewers.map(rev => ({ name: rev.name, email: rev.email })),
                    opposedReviewers,
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

    const closeOpposedReviewers = (): void => {
        setValue('opposedReviewingEditorsReason', '');
        setValue('opposedReviewingEditors', []);
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
                togglePrefixText="Would you like to "
                toggleActionText="exclude a senior editor"
                onClose={closeOpposedReviewers}
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
                    setSelectedPeople={(selected): void => setValue('opposedReviewingEditors', selected)}
                    selectedPeople={opposedReviewingEditors}
                    className="opposed-reviewing-editors-picker"
                />
                <MultilineTextField
                    id="opposedReviewersReason"
                    register={register}
                    labelText={t('editors.opposed-reviewering-editor-reason-label')}
                    invalid={errors && errors.opposedReviewersReason !== undefined}
                    helperText={errors && errors.opposedReviewersReason ? errors.opposedReviewersReason.message : null}
                />
            </ExcludedToggle>
            {/*TODO: translationforprefix*/}
            <ExpandingEmailField
                maxRows={6}
                register={register}
                name="suggestedReviewers"
                labelPrefix="Reviewer"
                inputRows={suggestedReviewers}
                errors={errors.suggestedReviewers}
            />
            {/* TODO add suggest reviewer (non editor) expanding email field */}
            {/* TODO add exclude reviewer (non editor) toggleable box */}

            {ButtonComponent && <ButtonComponent saveFunction={onSave} triggerValidation={triggerValidation} />}
        </div>
    );
};

export default EditorsForm;
