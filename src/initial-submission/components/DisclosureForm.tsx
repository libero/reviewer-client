import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField, Checkbox, Paragraph } from '../../ui/atoms';
import { Submission, DisclosureDetails } from '../types';
import { useMutation } from '@apollo/react-hooks';
import { saveDisclosurePageMutation } from '../graphql';
import useAutoSave from '../hooks/useAutoSave';
import { StepProps } from './SubmissionWizard';
import Interweave from 'interweave';
import moment from 'moment';

const DisclosureForm = ({ initialValues, schemaFactory, ButtonComponent, toggleErrorBar }: StepProps): JSX.Element => {
    const { t } = useTranslation('wizard-form');
    const [saveCallback] = useMutation<Submission>(saveDisclosurePageMutation);
    const schema = schemaFactory(t);
    const defaultValues = {
        submitterSignature:
            initialValues && initialValues.disclosure && initialValues.disclosure.submitterSignature
                ? initialValues.disclosure.submitterSignature
                : '',
        disclosureConsent:
            initialValues && initialValues.disclosure && initialValues.disclosure.disclosureConsent
                ? initialValues.disclosure.disclosureConsent
                : false,
    };
    const { register, errors, getValues, watch, triggerValidation } = useForm<DisclosureDetails>({
        defaultValues,
        mode: 'onChange',
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

    const autoSaveCancel = useAutoSave(onSave, [submitterSignature, disclosureConsent]);
    const date = moment(new Date()).format('MMM D, YYYY');

    useEffect(() => {
        if (toggleErrorBar && Object.keys(errors).length === 0) {
            toggleErrorBar(false);
        }
    }, [submitterSignature, disclosureConsent, errors]);

    return (
        <div className="disclosure-step">
            <h2 className="typography__heading typography__heading--h2">{t('disclosure.form-title')}</h2>
            <div className="disclosure__submission">
                <h3 className="typography__heading typography__heading--h3 disclosure__submission--title">
                    {initialValues && initialValues.manuscriptDetails ? initialValues.manuscriptDetails.title : ''}
                </h3>
                <span className="typography__body typography__body--primary disclosure__submission--name">
                    {initialValues && initialValues.author
                        ? `${initialValues.author.firstName} ${initialValues.author.lastName}`
                        : ''}
                </span>
                <span className="typography__small typography__small--secondary disclosure__submission--article-date">
                    {initialValues && initialValues.articleType.toUpperCase().replace(/-+/g, ' ')} {' ' + date}
                </span>
            </div>
            <Paragraph type="small-reading">
                <Interweave content={t('disclosure.copy')} />
            </Paragraph>
            <TextField
                id="submitterSignature"
                invalid={errors && errors.submitterSignature !== undefined}
                helperText={errors && errors.submitterSignature ? errors.submitterSignature.message : null}
                labelText={t('disclosure.submitter-signature-input')}
                register={register}
            />
            <div className="disclosure__consent">
                <Checkbox
                    id="disclosureConsent"
                    labelText={t('disclosure.disclosure-consent-input')}
                    register={register}
                    initialValue={defaultValues.disclosureConsent}
                    invalid={errors && errors.disclosureConsent !== undefined}
                    helperText={errors && errors.disclosureConsent ? errors.disclosureConsent.message : null}
                />
            </div>
            {ButtonComponent && (
                <ButtonComponent
                    preSaveCb={autoSaveCancel}
                    saveFunction={onSave}
                    triggerValidation={triggerValidation}
                />
            )}
        </div>
    );
};

export default DisclosureForm;
