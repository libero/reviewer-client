import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SelectField } from '../../ui/atoms';
import { Submission } from '../types';
import { ExcludedToggle, Toggle } from '../../ui/molecules';

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

    const { t } = useTranslation();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="typography__heading typography__heading--h2">
                Help us get your work seen by the right people
            </h2>
            <label htmlFor="title" className="typography__label typography__label--primary">
                Manuscript title
            </label>
            <textarea name="title" className="details__title" ref={register()} />
            <SelectField
                id="subjectArea"
                labelText="Subject area(s)"
                values={[{ label: 'a', value: 'a' }]}
                setValue={setValue}
                register={register}
                formComponent={true}
                helperText="Choose up to 2 subject areas"
            />
            <Toggle
                id="previouslyDiscussedContainer"
                toggleLabel="This manuscript has been discussed with an eLife editor"
            >
                <label htmlFor="previouslyDiscussed" className="typography__label typography__label--primary" />
                <textarea name="previouslyDiscussed" ref={register()} />
            </Toggle>
            <Toggle
                id="previouslyConsideredContainer"
                toggleLabel="This manuscript has been previously considered by eLife"
            >
                <label htmlFor="previouslyConsidered" className="typography__label typography__label--primary" />
                <textarea name="previouslyConsidered" ref={register()} />
            </Toggle>
        </form>
    );
};

export default DetailsForm;
