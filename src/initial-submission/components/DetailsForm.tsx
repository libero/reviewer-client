import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SelectField, TextField, MultilineTextField } from '../../ui/atoms';
import { Submission } from '../types';
import { Toggle } from '../../ui/molecules';

interface Props {
    initialValues?: Submission;
}

const DetailsForm = ({ initialValues }: Props): JSX.Element => {
    // const [saveCallback] = useMutation<Submission>(saveAuthorPageMutation);
    // const schema = yup.object().shape({
    //     authorFirstName: yup.string().required(),
    //     authorLastName: yup.string().required(),
    //     authorEmail: yup
    //         .string()
    //         .email()
    //         .required(),
    //     institution: yup.string().required(),
    // });
    const { register, handleSubmit, setValue } = useForm();
    //
    const onSubmit = (data: Record<string, object>): void => {
        console.log(JSON.stringify(data, null, 4));
    };

    // const onSave = (): void => {
    // const vars = {
    //     variables: {
    //         id: initialValues.id,
    //         details: getValues(),
    //     },
    // };
    // saveCallback(vars);
    // };

    // useEffect(() => {
    //     AutoSaveDecorator(onSave);
    //     // Warning: returning throttlesSave.cancel() will cause the throttle to be recreated on each render breaking it.
    // }, [authorFirstName, authorLastName, authorEmail, institution]);

    const { t } = useTranslation('wizard-form');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="typography__heading typography__heading--h2">
                Help us get your work seen by the right people
            </h2>
            <TextField id="title" register={register} labelText={t('details.title-label')} />
            <SelectField
                id="subjectArea"
                labelText="Subject area(s)"
                values={[{ label: 'a', value: 'a' }]}
                setValue={setValue}
                register={register}
                formComponent={true}
                helperText="Choose up to 2 subject areas"
                className="subject-area"
            />
            <Toggle id="previouslyDiscussedContainer" toggleLabel={t('details.previously-discussed-toggle')}>
                <MultilineTextField
                    id="previouslyDiscussed"
                    register={register}
                    labelText={t('details.previously-discussed-label')}
                />
            </Toggle>
            <Toggle id="previouslyConsideredContainer" toggleLabel={t('details.previously-discussed-toggle')}>
                <MultilineTextField
                    id="previouslyConsidered"
                    register={register}
                    labelText={t('details.previously-considered-label')}
                />
            </Toggle>
            <Toggle id="cosubmission" toggleLabel={t('details.cosubmission-toggle')}>
                <TextField
                    id="firstCosubmissionTitle"
                    register={register}
                    labelText={t('details.cosubmission-title-label')}
                />
            </Toggle>
        </form>
    );
};

export default DetailsForm;
