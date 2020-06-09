import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField, Checkbox } from '../../ui/atoms';
import * as yup from 'yup';
import { Submission, DisclosureDetails } from '../types';
import { useMutation } from '@apollo/react-hooks';
import { saveDisclosurePageMutation } from '../graphql';
import useAutoSave from '../hooks/useAutoSave';
import { StepProps } from './SubmissionWizard';

const DisclosureForm = ({ initialValues, ButtonComponent }: StepProps): JSX.Element => {
    const { t } = useTranslation('wizard-form');
    const [saveCallback] = useMutation<Submission>(saveDisclosurePageMutation);
    const schema = yup.object().shape({
        submitterSignature: yup.string().required(t('disclosure.validation.signature')),
        disclosureConsent: yup
            .bool()
            .required()
            .oneOf([true], t('disclosure.validation.consent')),
    });
    const { register, errors, getValues, watch, triggerValidation } = useForm<DisclosureDetails>({
        defaultValues: {
            submitterSignature:
                initialValues.disclosure && initialValues.disclosure.submitterSignature
                    ? initialValues.disclosure.submitterSignature
                    : '',
            disclosureConsent:
                initialValues.disclosure && initialValues.disclosure.disclosureConsent
                    ? initialValues.disclosure.disclosureConsent
                    : false,
        },
        mode: 'onBlur',
        validationSchema: schema,
    });

    const onSave = async (): Promise<void> => {
        const values = getValues();
        const vars = {
            variables: {
                id: initialValues.id,
                details: values,
            },
        };
        await saveCallback(vars);
    };

    const submitterSignature = watch('submitterSignature');
    const disclosureConsent = watch('disclosureConsent');

    useAutoSave(onSave, [submitterSignature, disclosureConsent]);

    return (
        <div className="disclosure-step">
            <h2 className="typography__heading typography__heading--h2">{t('disclosure.form-title')}</h2>
            <TextField
                id="submitterSignature"
                invalid={errors && errors.submitterSignature !== undefined}
                helperText={errors && errors.submitterSignature ? errors.submitterSignature.message : null}
                labelText={t('disclosure.submitter-signature-input')}
                register={register}
            />
            <Checkbox id="disclosureConsent" labelText={t('disclosure.disclosure-consent-input')} register={register} />
            {ButtonComponent && <ButtonComponent saveFunction={onSave} triggerValidation={triggerValidation} />}
        </div>
    );
};

export default DisclosureForm;
