import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SelectField, TextField, MultilineTextField } from '../../ui/atoms';
import { Submission } from '../types';
import { Toggle } from '../../ui/molecules';

interface Props {
    initialValues?: Submission;
}

const DetailsForm = ({  }: Props): JSX.Element => {
    const { register, handleSubmit, setValue } = useForm();
    const [hasSecondCosubmission, setCosubmissionState] = useState();
    const onSubmit = (data: Record<string, object>): void => {
        console.log(JSON.stringify(data, null, 4));
    };

    const { t } = useTranslation('wizard-form');

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="typography__heading typography__heading--h2">{t('details.form-title')}</h2>
            <TextField id="title" register={register} labelText={t('details.title-label')} />
            <SelectField
                id="subjectArea"
                labelText="Subject area(s)"
                values={[
                    { label: 'Neuroscience', value: 'neuroscience' },
                    { label: 'Developmental Biology and Stem Cells', value: 'developmentalbiologyandstemcells' },
                    { label: 'I am not a config list', value: 'foo' },
                ]}
                setValue={setValue}
                register={register}
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
