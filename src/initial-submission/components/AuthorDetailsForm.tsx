import React, { useEffect } from 'react';
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

interface GetCurrentUser {
    getCurrentUser: User;
}

interface Props {
    initialValues: Submission;
    setIsSaving?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthorDetailsForm = ({ initialValues, setIsSaving }: Props): JSX.Element => {
    const { t } = useTranslation('wizard-form');
    const { data } = useQuery<GetCurrentUser>(getCurrentUserQuery, { fetchPolicy: 'cache-only' });
    const [saveCallback] = useMutation<Submission>(saveAuthorPageMutation);
    const schema = yup.object().shape({
        firstName: yup.string().required(t('author.validation.first-name-required')),
        lastName: yup.string().required(t('author.validation.last-name-required')),
        email: yup
            .string()
            .trim()
            .email(t('author.validation.email-format'))
            .required(t('author.validation.email-required')),
        institution: yup.string().required(t('author.validation.institution-required')),
    });

    const { register, errors, getValues, formState, reset, watch, setValue } = useForm<AuthorDetails>({
        defaultValues: {
            firstName: initialValues.author ? initialValues.author.firstName : '',
            lastName: initialValues.author ? initialValues.author.lastName : '',
            email: initialValues.author ? initialValues.author.email : '',
            institution: initialValues.author ? initialValues.author.institution : '',
        },
        mode: 'onBlur',
        validationSchema: schema,
    });

    useEffect(() => {
        if (!setIsSaving) {
            return;
        }
        if (formState.dirty) {
            setIsSaving(true);
        } else {
            setIsSaving(false);
        }
    }, [formState.dirty, setIsSaving]);

    const onSave = async (): Promise<void> => {
        const values = getValues();
        const vars = {
            variables: {
                id: initialValues.id,
                details: values,
            },
        };
        await saveCallback(vars);
        if (setIsSaving) {
            reset(values);
        }
    };

    const authorFirstName = watch('firstName');
    const authorLastName = watch('lastName');
    const authorEmail = watch('email');
    const institution = watch('institution');

    useAutoSave(onSave, [authorFirstName, authorLastName, authorEmail, institution]);

    const getDetails = (): void => {
        const [lastName, firstName] = data.getCurrentUser.name.split(', ', 2);
        setValue('firstName', firstName);
        setValue('lastName', lastName);
        setValue('email', data.getCurrentUser.email);
        setValue('institution', data.getCurrentUser.aff);
    };

    return (
        <form>
            <div className="orcid-details">
                <div className="orcid-details__link_text">
                    <span onClick={getDetails} className="typography__body typography__body--link">
                        {t('author.prefill--link')}{' '}
                    </span>
                    <span className="typography__body typography__body--primary">{t('author.prefill--text')}</span>
                </div>

                <TextField
                    className="orcid-details__firstName"
                    id="firstName"
                    invalid={errors && errors.firstName !== undefined}
                    helperText={errors && errors.firstName ? errors.firstName.message : null}
                    labelText={t('author.author-first-name')}
                    register={register}
                />
                <TextField
                    className="orcid-details__lastName"
                    id="lastName"
                    invalid={errors && errors.lastName !== undefined}
                    helperText={errors && errors.lastName ? errors.lastName.message : null}
                    labelText={t('author.author-last-name')}
                    register={register}
                />
                <TextField
                    className="orcid-details__email"
                    id="email"
                    invalid={errors && errors.email !== undefined}
                    helperText={errors && errors.email ? errors.email.message : null}
                    labelText={t('author.author-email')}
                    register={register}
                />
                <TextField
                    className="orcid-details__institution"
                    id="institution"
                    invalid={errors && errors.institution !== undefined}
                    helperText={errors && errors.institution ? errors.institution.message : null}
                    labelText={t('author.institution')}
                    register={register}
                />
            </div>
        </form>
    );
};

export default AuthorDetailsForm;
