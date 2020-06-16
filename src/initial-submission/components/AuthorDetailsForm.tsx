import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '../../ui/atoms';
import * as yup from 'yup';
import { Submission, AuthorDetails } from '../types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getCurrentUserQuery } from '../../core/graphql';
import { saveAuthorPageMutation } from '../graphql';
import { User } from '../../core/types';
import useAutoSave from '../hooks/useAutoSave';
import { StepProps } from './SubmissionWizard';

interface GetCurrentUser {
    getCurrentUser: User;
}

const AuthorDetailsForm = ({
    initialValues,
    schemaFactory,
    ButtonComponent,
}: StepProps): JSX.Element => {
    const { t } = useTranslation('wizard-form');
    const { data } = useQuery<GetCurrentUser>(getCurrentUserQuery, { fetchPolicy: 'cache-only' });
    const [saveCallback] = useMutation<Submission>(saveAuthorPageMutation);
    const schema = schemaFactory(t);
    const { register, errors, getValues, watch, setValue, triggerValidation } = useForm<AuthorDetails>({
        defaultValues: {
            firstName: initialValues.author ? initialValues.author.firstName : '',
            lastName: initialValues.author ? initialValues.author.lastName : '',
            email: initialValues.author ? initialValues.author.email : '',
            institution: initialValues.author ? initialValues.author.institution : '',
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

    const authorFirstName = watch('firstName');
    const authorLastName = watch('lastName');
    const authorEmail = watch('email');
    const institution = watch('institution');

    useAutoSave(onSave, [authorFirstName, authorLastName, authorEmail, institution]);

    const getDetails = (): void => {
        const [firstName, lastName] = data.getCurrentUser.name.split(' ', 2);
        setValue('firstName', firstName);
        setValue('lastName', lastName);
        setValue('email', data.getCurrentUser.email);
        setValue('institution', data.getCurrentUser.aff);
    };

    return (
        <form onSubmit={(e: React.BaseSyntheticEvent): void => e.preventDefault()}>
            <div className="author-step">
                <div className="author-step__link_text">
                    <span onClick={getDetails} className="typography__body typography__body--link author-step__prefill">
                        {t('author.prefill--link')}{' '}
                    </span>
                    <span className="typography__body typography__body--primary">{t('author.prefill--text')}</span>
                </div>

                <TextField
                    className="author-step__firstName"
                    id="firstName"
                    invalid={errors && errors.firstName !== undefined}
                    helperText={errors && errors.firstName ? errors.firstName.message : null}
                    labelText={t('author.author-first-name')}
                    register={register}
                />
                <TextField
                    className="author-step__lastName"
                    id="lastName"
                    invalid={errors && errors.lastName !== undefined}
                    helperText={errors && errors.lastName ? errors.lastName.message : null}
                    labelText={t('author.author-last-name')}
                    register={register}
                />
                <TextField
                    className="author-step__email"
                    id="email"
                    invalid={errors && errors.email !== undefined}
                    helperText={errors && errors.email ? errors.email.message : null}
                    labelText={t('author.author-email')}
                    register={register}
                />
                <TextField
                    className="author-step__institution"
                    id="institution"
                    invalid={errors && errors.institution !== undefined}
                    helperText={errors && errors.institution ? errors.institution.message : null}
                    labelText={t('author.institution')}
                    register={register}
                />
            </div>
            {ButtonComponent && <ButtonComponent saveFunction={onSave} triggerValidation={triggerValidation} />}
        </form>
    );
};

export default AuthorDetailsForm;
