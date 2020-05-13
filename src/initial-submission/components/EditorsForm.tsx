import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { saveEditorsPageMutation } from '../graphql';
import useAutoSave from '../hooks/useAutoSave';
import { EditorsDetails, Submission } from '../types';
import { StepProps } from './SubmissionWizard';
import { PeoplePicker } from '../../ui/organisms';

const EditorsForm = ({ initialValues, ButtonComponent }: StepProps): JSX.Element => {
    const { t } = useTranslation('wizard-form');
    const { editorDetails } = initialValues;

    const schema = yup.object().shape({});

    const { watch, triggerValidation } = useForm<EditorsDetails>({
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
                editorDetails && editorDetails.suggestedReviewers ? editorDetails.suggestedReviewers : [],
            opposedReviewers: editorDetails && editorDetails.opposedReviewers ? editorDetails.opposedReviewers : [],
            opposedReviewersReason:
                editorDetails && editorDetails.opposedReviewersReason ? editorDetails.opposedReviewersReason : '',
        },
        mode: 'onBlur',
        validationSchema: schema,
    });

    const [saveCallback] = useMutation<Submission>(saveEditorsPageMutation);

    const suggestedSeniorEditors = watch('suggestedSeniorEditors');
    const opposedSeniorEditors = watch('opposedSeniorEditors');
    const opposedSeniorEditorsReason = watch('opposedSeniorEditorsReason');
    const suggestedReviewingEditors = watch('suggestedReviewingEditors');
    const opposedReviewingEditors = watch('opposedReviewingEditors');
    const opposedReviewingEditorsReason = watch('opposedReviewingEditorsReason');
    const suggestedReviewers = watch('suggestedReviewers');
    const opposedReviewers = watch('opposedReviewers');
    const opposedReviewersReason = watch('opposedReviewersReason');
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
                    suggestedReviewers,
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
        opposedReviewingEditors,
        opposedReviewingEditorsReason,
        suggestedReviewers,
        opposedReviewers,
        opposedReviewersReason,
    ]);

    return (
        <div className="editors-step">
            <h2 className="typography__heading typography__heading--h2 files-step__title">{t('editors.title')}</h2>
            <PeoplePicker
                label={t('editors.editors-people-picker-label')}
                onRemove={(): void => {}}
                onSearch={(): void => {}}
                setSelectedPeople={(): void => {}}
            />
            {/* TODO add exclude editor toggleable box */}
            <PeoplePicker
                label={t('editors.reviewers-people-picker-label')}
                onRemove={(): void => {}}
                onSearch={(): void => {}}
                setSelectedPeople={(): void => {}}
            />
            {/* TODO add exclude reviewer toggleable box */}
            {/* TODO add suggest reviewer (non editor) expanding email field */}
            {/* TODO add exclude reviewer (non editor) toggleable box */}

            {ButtonComponent && <ButtonComponent saveFunction={onSave} triggerValidation={triggerValidation} />}
        </div>
    );
};

export default EditorsForm;
