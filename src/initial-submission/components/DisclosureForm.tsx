import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField, Checkbox, Paragraph, Modal } from '../../ui/atoms';
import * as yup from 'yup';
import { Submission, DisclosureDetails } from '../types';
import { useMutation } from '@apollo/react-hooks';
import { saveDisclosurePageMutation, submitSubmissionMutation } from '../graphql';
import useAutoSave from '../hooks/useAutoSave';
import { StepProps } from './SubmissionWizard';
import Interweave from 'interweave';
import moment from 'moment';
import useModal from '../../ui/hooks/useModal';

const DisclosureForm = ({ initialValues, ButtonComponent }: StepProps): JSX.Element => {
    const { t } = useTranslation('wizard-form');
    const [saveCallback] = useMutation<Submission>(saveDisclosurePageMutation);
    const [submitSubmission] = useMutation<Submission>(submitSubmissionMutation);
    const { isShowing, toggle } = useModal();
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
    const date = moment(new Date()).format('MMM D, YYYY');

    return (
        <div className="disclosure-step">
            <h2 className="typography__heading typography__heading--h2">{t('disclosure.form-title')}</h2>
            <div className="disclosure__submission">
                <h3 className="typography__heading typography__heading--h3 disclosure__submission--title">
                    {initialValues.manuscriptDetails ? initialValues.manuscriptDetails.title : ''}
                </h3>
                <span className="typography__body typography__body--primary disclosure__submission--name">
                    {initialValues.author ? `${initialValues.author.firstName} ${initialValues.author.lastName}` : ''}
                </span>
                <span className="typography__small typography__small--secondary disclosure__submission--article-date">
                    {initialValues.articleType.toUpperCase().replace(/-+/g, ' ')} {' ' + date}
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
                />
            </div>
            {ButtonComponent && (
                <ButtonComponent saveFunction={onSave} triggerValidation={triggerValidation} onSubmit={toggle} />
            )}
            <Modal
                isShowing={isShowing}
                hide={toggle}
                buttonType="primary"
                buttonText="Submit"
                onAccept={(): void => {
                    submitSubmission({ variables: { id: initialValues.id } });
                }}
            >
                <h2 className="typography__heading typography__heading--h2">Submit to eLife</h2>
                <Paragraph type="writing">blahblahblahblah</Paragraph>
            </Modal>
        </div>
    );
};

export default DisclosureForm;
