import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { getEditorsQuery, saveEditorsPageMutation } from '../graphql';
import useAutoSave from '../hooks/useAutoSave';
import { EditorAlias, EditorsDetails, Submission } from '../types';
import { StepProps } from './SubmissionWizard';
import { PeoplePicker } from '../../ui/organisms';
import { ExcludedToggle, ExpandingEmailField } from '../../ui/molecules';
import { TextField } from '../../ui/atoms';

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
    });

    const { watch, register, triggerValidation, setValue, errors, control } = useForm<EditorsDetails>({
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
            opposedReviewers:
                editorDetails && editorDetails.opposedReviewers
                    ? editorDetails.opposedReviewers
                    : [{ name: '', email: '' }],
            opposedReviewersReason:
                editorDetails && editorDetails.opposedReviewersReason ? editorDetails.opposedReviewersReason : '',
        },
        mode: 'onBlur',
        validationSchema: schema,
    });
    const [saveCallback] = useMutation<Submission>(saveEditorsPageMutation);

    register({ name: 'suggestedSeniorEditors', type: 'custom' });
    register({ name: 'suggestedReviewingEditors', type: 'custom' });

    const suggestedSeniorEditors = watch('suggestedSeniorEditors');
    const opposedSeniorEditors = watch('opposedSeniorEditors');
    const opposedSeniorEditorsReason = watch('opposedSeniorEditorsReason');
    const suggestedReviewingEditors = watch('suggestedReviewingEditors');
    const opposedReviewingEditors = watch('opposedReviewingEditors');
    const opposedReviewingEditorsReason = watch('opposedReviewingEditorsReason');
    const {
        append: appendOpposedReviewers,
        // prepend,
        remove: removeOpposedReviewer,
        // swap,
        // move,
        // insert,
    } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'opposedReviewers', // unique name for your Field Array
    });

    const {
        append: appendsuggestedReviewers,
        // prepend,
        remove: removeSuggestedReviewer,
        // swap,
        // move,
        // insert,
    } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'suggestedReviewers', // unique name for your Field Array
    });

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

    // useEffect(() => {
    //     console.log(JSON.stringify(opposedReviewers));
    // }, [opposedReviewers]);

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
                people={loadingReviewingEditors ? [] : getReviewingEditors.getEditors}
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
            {/* TODO add exclude reviewer toggleable box */}
            <h2 className="typography__heading typography__heading--h3">{t('editors.reviewers-title')}</h2>
            <ExpandingEmailField
                maxRows={6}
                register={register}
                className="suggestedReviewers__inputs"
                name="suggestedReviewers"
                labelPrefix={t('editors.reviewers-label-prefix')}
                inputRows={suggestedReviewers}
                errors={errors.suggestedReviewers}
                append={appendsuggestedReviewers}
                remove={removeSuggestedReviewer}
                onChange={(): void => {
                    triggerValidation('suggestedReviewers');
                }}
            />
            {/*TODO i18n*/}
            <ExcludedToggle
                toggleActionText="exclude a reviewer"
                togglePrefixText="Would you like to "
                panelHeading={'Excluded Reviewers'}
            >
                <ExpandingEmailField
                    name="opposedReviewers"
                    register={register}
                    errors={errors.opposedReviewers}
                    labelPrefix="Reviewer"
                    className="opposedReviewers__inputs"
                    maxRows={3}
                    append={appendOpposedReviewers}
                    inputRows={opposedReviewers}
                    remove={removeOpposedReviewer}
                />
                <TextField
                    id="opposedReviewersReason"
                    register={register}
                    name="opposedReviewersReason"
                    className="opposedReviewersReason__input"
                />
            </ExcludedToggle>

            {ButtonComponent && <ButtonComponent saveFunction={onSave} triggerValidation={triggerValidation} />}
        </div>
    );
};

export default EditorsForm;
