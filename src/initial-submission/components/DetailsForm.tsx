import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SelectField, TextField, MultilineTextField } from '../../ui/atoms';
import { Submission } from '../types';
import { Toggle } from '../../ui/molecules';
import { useMutation } from '@apollo/react-hooks';
import { saveDetailsPageMutation } from '../graphql';
import { AutoSaveDecorator } from '../utils/autosave-decorator';
import { Value } from '../../ui/atoms/SelectField';

interface Props {
    initialValues?: Submission;
}

const DetailsForm = ({ initialValues }: Props): JSX.Element => {
    const { register, setValue, watch, control } = useForm();
    const [hasSecondCosubmission, setCosubmissionState] = useState(
        initialValues.manuscriptDetails && initialValues.manuscriptDetails.cosubmission.length > 1,
    );
    const { t } = useTranslation('wizard-form');
    const [saveCallback] = useMutation<Submission>(saveDetailsPageMutation);

    const title = watch('title');
    const unmappedSubjects = watch('subjects');
    const previouslyDiscussed = watch('previouslyDiscussed');
    const previouslySubmitted = watch('previouslySubmitted');
    const firstCosubmission = watch('firstCosubmissionTitle');
    const secondCosubmission = watch('secondCosubmissionTitle');
    const onSave = (): void => {
        const cosubmission =
            firstCosubmission && secondCosubmission
                ? [firstCosubmission, secondCosubmission]
                : firstCosubmission && !secondCosubmission
                ? [firstCosubmission]
                : null;
        const subjects = unmappedSubjects ? unmappedSubjects.map((subject: Value) => subject.value) : null;
        const vars = {
            variables: {
                id: initialValues.id,
                details: {
                    title,
                    subjects,
                    previouslyDiscussed,
                    previouslySubmitted,
                    cosubmission,
                },
            },
        };
        saveCallback(vars);
    };
    useEffect(() => {
        AutoSaveDecorator(onSave);
    }, [title, unmappedSubjects, previouslyDiscussed, previouslySubmitted, firstCosubmission, secondCosubmission]);
    return (
        <form>
            <h2 className="typography__heading typography__heading--h2">{t('details.form-title')}</h2>
            <TextField id="title" register={register} labelText={t('details.title-label')} />
            <SelectField
                id="subjects"
                labelText="Subject area(s)"
                values={[
                    { label: 'Neuroscience', value: 'neuroscience' },
                    { label: 'Developmental Biology and Stem Cells', value: 'developmentalbiologyandstemcells' },
                    { label: 'I am not a config list', value: 'foo' },
                ]}
                setValue={setValue}
                control={control}
                formComponent={true}
                multi
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
            <Toggle id="previouslyConsideredContainer" toggleLabel={t('details.previously-submitted-toggle')}>
                <MultilineTextField
                    id="previouslySubmitted"
                    register={register}
                    labelText={t('details.previously-submitted-label')}
                />
            </Toggle>
            <Toggle id="cosubmission" toggleLabel={t('details.cosubmission-toggle')}>
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
