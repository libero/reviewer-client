/*eslint-disable react/display-name*/
import React, { useState } from 'react';
import { useParams, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { Button, Modal, Paragraph, Spinner } from '../../ui/atoms';
import { ProgressBar } from '../../ui/molecules';
import { Submission } from '../types';
import AuthorDetailsForm from './AuthorDetailsForm';
import FileDetailsStep from './FileDetailsForm';
import DetailsForm from './DetailsForm';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getSubmissionQuery, submitSubmissionMutation, CLEAR_ERROR, SET_VALIDATION_ERROR } from '../graphql';
import * as H from 'history';
import EditorsForm from './EditorsForm';
import DisclosureForm from './DisclosureForm';
import { useTranslation } from 'react-i18next';
import useModal from '../../ui/hooks/useModal';
import i18next from 'i18next';
import * as yup from 'yup';
import {
    AuthorDetailsSchema,
    DetailsSchema,
    DisclosureSchema,
    EditorsSchema,
    FileDetailsSchema,
} from '../utils/validationSchemas';

interface Props {
    id: string;
}

export interface StepProps {
    initialValues: Submission;
    schemaFactory: (t?: i18next.TFunction) => yup.ObjectSchema;
    ButtonComponent?: (props: {
        saveFunction?: Function;
        preSaveCb?: Function;
        triggerValidation: () => Promise<boolean>;
        onSubmit?: () => void;
    }) => JSX.Element;
    toggleErrorBar?: (showError: boolean) => Promise<void>;
}

interface StepConfig {
    id: string;
    label: string;
    component: (props: StepProps) => JSX.Element;
    schemaFactory: (t: i18next.TFunction) => yup.ObjectSchema;
    toggleErrorBar?: (showError: boolean) => Promise<void>;
}

interface GetSubmission {
    getSubmission: Submission;
}

const ButtonComponent = (
    id: string,
    history: H.History,
    getCurrentStepPathIndex: Function,
    stepConfig: StepConfig[],
    toggle: () => void,
    toggleErrorBar: (showError: boolean) => Promise<void>,
) => ({
    saveFunction,
    triggerValidation,
    preSaveCb,
}: {
    saveFunction: Function;
    triggerValidation: () => Promise<boolean>;
    preSaveCb?: Function;
}): JSX.Element => {
    const [processing, setProcessing] = useState(false);
    const { t } = useTranslation('wizard-form');
    const lastPage = getCurrentStepPathIndex() === stepConfig.length - 1;
    return (
        <React.Fragment>
            {getCurrentStepPathIndex() > 0 && (
                <Button
                    className="submission-wizard-back-button"
                    onClick={async (): Promise<void> => {
                        if (!processing) {
                            try {
                                setProcessing(true);
                                await saveFunction();
                                history.push(`/submit/${id}/${stepConfig[getCurrentStepPathIndex() - 1].id}`);
                            } catch (e) {
                                setProcessing(false);
                            }
                        }
                    }}
                >
                    {t('navigation.back')}
                </Button>
            )}
            <Button
                className="submission-wizard-next-button"
                onClick={async (): Promise<void> => {
                    if (lastPage) {
                        try {
                            setProcessing(true);
                            triggerValidation().then(async valid => {
                                preSaveCb();
                                await saveFunction();
                                setProcessing(false);
                                if (valid) {
                                    toggle();
                                    toggleErrorBar(false);
                                } else {
                                    toggleErrorBar(true);
                                }
                            });
                        } catch (e) {
                            setProcessing(false);
                        }
                    } else {
                        if (!processing) {
                            try {
                                setProcessing(true);
                                triggerValidation().then(async valid => {
                                    if (valid) {
                                        toggleErrorBar(false);
                                        await saveFunction();
                                        history.push(`/submit/${id}/${stepConfig[getCurrentStepPathIndex() + 1].id}`);
                                    } else {
                                        setProcessing(false);
                                        toggleErrorBar(true);
                                    }
                                });
                            } catch (e) {
                                setProcessing(false);
                            }
                        }
                    }
                }}
                type="primary"
            >
                {lastPage ? t('navigation.submit') : t('navigation.next')}
            </Button>
        </React.Fragment>
    );
};

const stepConfig: StepConfig[] = [
    { id: 'author', label: 'Author', component: AuthorDetailsForm, schemaFactory: AuthorDetailsSchema },
    { id: 'files', label: 'Files', component: FileDetailsStep, schemaFactory: FileDetailsSchema },
    { id: 'details', label: 'Details', component: DetailsForm, schemaFactory: DetailsSchema },
    { id: 'editors', label: 'Editors', component: EditorsForm, schemaFactory: EditorsSchema },
    {
        id: 'disclosure',
        label: 'Disclosure',
        component: DisclosureForm,
        schemaFactory: DisclosureSchema,
    },
];

const SubmissionWizard: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps<Props>): JSX.Element => {
    const { id, step } = useParams();
    const { t } = useTranslation('wizard-form');
    const [clearError] = useMutation(CLEAR_ERROR);
    const [setError] = useMutation(SET_VALIDATION_ERROR);
    const [errorBar, setErrorBar] = useState(false);
    const getCurrentStepPathIndex = (): number => {
        return stepConfig.findIndex((config): boolean => config.id === step.toLocaleLowerCase());
    };
    const [submitSubmission] = useMutation<Submission>(submitSubmissionMutation);
    const { isShowing, toggle } = useModal();

    const { data, loading } = useQuery<GetSubmission>(getSubmissionQuery, {
        variables: { id },
        returnPartialData: true,
    });

    const toggleErrorBar = async (showError: boolean): Promise<void> => {
        if (showError) {
            await setError();
        } else {
            await clearError();
        }
        setErrorBar(errorBar);
    };

    if (!loading && !data.getSubmission) {
        return <Redirect to="/?alreadySubmitted=true" />;
    }

    if (
        !loading &&
        data.getSubmission &&
        ['short-report', 'research-article'].includes(data.getSubmission.articleType)
    ) {
        return (
            <div className="article-type">
                <h1 className="typography__heading typography__heading--h1">{`Updates to eLife's peer review process`}</h1>
                <div className="article-type__content">
                    <Paragraph type="writing" secondary>
                        {`To make the results of research freely and immediately available to the widest possible audience we ask authors submitting to eLife to also upload their manuscript to a preprint server, such as bioRxiv or medRxiv.`}
                    </Paragraph>

                    <Paragraph type="writing" secondary>
                        {`If we move ahead with peer review, we will provide public reviews that are designed to be posted alongside the preprint, in addition to detailed feedback for the authors.`}
                    </Paragraph>

                    <Paragraph type="writing" secondary>
                        {`If we decide not to publish your work, you will control whether the public reviews are posted and can choose to share them with other journals. To learn more, please read our Author guide.`}
                    </Paragraph>
                </div>
                {ButtonComponent(
                    id,
                    history,
                    getCurrentStepPathIndex,
                    stepConfig,
                    toggle,
                    toggleErrorBar,
                )({ triggerValidation: async () => true, saveFunction: () => {} })}
            </div>
        );
    }

    return (
        <div className="submission-wizard">
            {getCurrentStepPathIndex() > -1 && (
                <ProgressBar
                    fixedWidthCentered
                    steps={stepConfig.map((step: StepConfig): { id: string; label: string } => ({
                        id: step.id,
                        label: step.label,
                    }))}
                    currentStep={step.toLocaleLowerCase()}
                />
            )}

            <Switch>
                {stepConfig.map(
                    (config): JSX.Element => (
                        <Route
                            key={config.id}
                            path={`/submit/${id}/${config.id}`}
                            render={(): JSX.Element =>
                                loading ? (
                                    <div className="spinner-center">
                                        <Spinner />
                                    </div>
                                ) : (
                                    <config.component
                                        initialValues={data.getSubmission}
                                        schemaFactory={config.schemaFactory}
                                        ButtonComponent={ButtonComponent(
                                            id,
                                            history,
                                            getCurrentStepPathIndex,
                                            stepConfig,
                                            toggle,
                                            toggleErrorBar,
                                        )}
                                        toggleErrorBar={toggleErrorBar}
                                    />
                                )
                            }
                        />
                    ),
                )}
                <Redirect from="/submit/:id" to={`/submit/${id}/author`} />
            </Switch>
            <Modal
                isShowing={isShowing}
                hide={toggle}
                buttonType="primary"
                buttonText={t('submit.modal-confirm') as string}
                onAccept={async (): Promise<void> => {
                    await submitSubmission({ variables: { id } });
                    history.push(`/survey/${id}`);
                }}
            >
                <h2 className="typography__heading typography__heading--h2">{t('submit.modal-title')}</h2>
                <Paragraph type="writing">{t('submit.modal-text')}</Paragraph>
            </Modal>
        </div>
    );
};
export default SubmissionWizard;
