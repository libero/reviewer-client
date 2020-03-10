import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '../../ui/atoms';
import * as yup from 'yup';
import { Submission, AuthorDetails } from '../types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getCurrentUserQuery, saveDetailsPageMutation } from '../../core/graphql';
import { User } from '../../core/types';
import { AutoSaveDecorator } from '../utils/autosave-decorator';

interface GetCurrentUser {
    getCurrentUser: User;
}

interface Props {
    initialValues?: Submission;
}

const AuthorDetailsForm = ({ initialValues }: Props): JSX.Element => {
    const { data } = useQuery<GetCurrentUser>(getCurrentUserQuery, { fetchPolicy: 'cache-only' });
    const [saveCallback] = useMutation<Submission>(saveDetailsPageMutation);

    const schema = yup.object().shape({
        authorFirstName: yup.string().required(),
        authorLastName: yup.string().required(),
        authorEmail: yup
            .string()
            .email()
            .required(),
        institution: yup.string().required(),
    });
    const { register, handleSubmit, errors, getValues } = useForm<AuthorDetails>({ validationSchema: schema });

    const onSubmit = (data: AuthorDetails): void => {
        console.log(JSON.stringify(data, null, 4));
    };

    const [authorFirstName, setAuthorFirstName] = useState(
        initialValues && initialValues.author ? initialValues.author.firstName : '',
    );
    const [authorLastName, setAuthorLastName] = useState(
        initialValues && initialValues.author ? initialValues.author.lastName : '',
    );
    const [authorEmail, setAuthorEmail] = useState(
        initialValues && initialValues.author ? initialValues.author.email : '',
    );
    const [institution, setInstitution] = useState(
        initialValues && initialValues.author ? initialValues.author.institution : '',
    );

    const onSave = (): void => {
        const vars = {
            variables: {
                id: initialValues.id,
                details: getValues(),
            },
        };
        saveCallback(vars);
    };

    useEffect(() => {
        AutoSaveDecorator(onSave);
        // Warning: returning throttlesSave.cancel() will cause the throttle to be recreated on each render breaking it.
    }, [authorFirstName, authorLastName, authorEmail, institution]);

    const { t } = useTranslation();

    const getDetails = (): void => {
        const [lastName, firstName] = data.getCurrentUser.name.split(', ', 2);
        setAuthorFirstName(firstName);
        setAuthorLastName(lastName);
        setAuthorEmail(data.getCurrentUser.email);
        setInstitution(data.getCurrentUser.aff);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="orcid-details">
                <div className="orcid-details__link_text">
                    <span onClick={getDetails} className="typography__body typography__body--link">
                        {t('orcid-details:prefill--link')}{' '}
                    </span>
                    <span className="typography__body typography__body--primary">
                        {t('orcid-details:prefill--text')}
                    </span>
                </div>

                <TextField
                    className="orcid-details__firstName"
                    id="firstName"
                    invalid={errors && errors.firstName !== undefined}
                    helperText={errors && errors.firstName ? errors.firstName.message : null}
                    labelText={t('orcid-details:author-first-name')}
                    value={authorFirstName}
                    onChange={(event: React.FormEvent<HTMLInputElement>): void =>
                        setAuthorFirstName(event.currentTarget.value)
                    }
                    register={register}
                />
                <TextField
                    className="orcid-details__lastName"
                    id="lastName"
                    invalid={errors && errors.lastName !== undefined}
                    helperText={errors && errors.lastName ? errors.lastName.message : null}
                    labelText={t('orcid-details:author-last-name')}
                    value={authorLastName}
                    onChange={(event: React.FormEvent<HTMLInputElement>): void =>
                        setAuthorLastName(event.currentTarget.value)
                    }
                    register={register}
                />
                <TextField
                    className="orcid-details__email"
                    id="email"
                    invalid={errors && errors.email !== undefined}
                    helperText={errors && errors.email ? errors.email.message : null}
                    labelText={t('orcid-details:author-email')}
                    value={authorEmail}
                    onChange={(event: React.FormEvent<HTMLInputElement>): void =>
                        setAuthorEmail(event.currentTarget.value)
                    }
                    register={register}
                />
                <TextField
                    className="orcid-details__institution"
                    id="institution"
                    invalid={errors && errors.institution !== undefined}
                    helperText={errors && errors.institution ? errors.institution.message : null}
                    labelText={t('orcid-details:institution')}
                    value={institution}
                    onChange={(event: React.FormEvent<HTMLInputElement>): void =>
                        setInstitution(event.currentTarget.value)
                    }
                    register={register}
                />
            </div>
        </form>
    );
};

export default AuthorDetailsForm;
