/*eslint-disable react/display-name*/
import React, { useState } from 'react';
import { useParams, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { Button, Modal, Paragraph } from '../../ui/atoms';
import { ProgressBar } from '../../ui/molecules';
import { Submission } from '../types';
import AuthorDetailsForm from './AuthorDetailsForm';
import FileDetailsStep from './FileDetailsForm';
import DetailsForm from './DetailsForm';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getSubmissionQuery, submitSubmissionMutation } from '../graphql';
import * as H from 'history';
import EditorsForm from './EditorsForm';
import DisclosureForm from './DisclosureForm';
import { useTranslation } from 'react-i18next';
import useModal from '../../ui/hooks/useModal';

interface Props {
    id: string;
}

export interface StepProps {
    initialValues: Submission;
    ButtonComponent?: (props: {
        saveFunction?: Function;
        triggerValidation: () => Promise<boolean>;
        onSubmit?: () => void;
    }) => JSX.Element;
}

interface StepConfig {
    id: string;
    label: string;
    component: (props: StepProps) => JSX.Element;
}

interface GetSubmission {
    getSubmission: Submission;
}
// TODO add i18n for buttons
const ButtonComponent = (
    id: string,
    history: H.History,
    getCurrentStepPathIndex: Function,
    stepConfig: StepConfig[],
    toggle: () => void,
) => ({
    saveFunction,
    triggerValidation,
}: {
    saveFunction: Function;
    triggerValidation: () => Promise<boolean>;
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
                        triggerValidation().then(async valid => {
                            if (valid) {
                                toggle();
                            }
                        });
                    } else {
                        if (!processing) {
                            try {
                                setProcessing(true);
                                triggerValidation().then(async valid => {
                                    if (valid) {
                                        await saveFunction();
                                        history.push(`/submit/${id}/${stepConfig[getCurrentStepPathIndex() + 1].id}`);
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
    { id: 'author', label: 'Author', component: AuthorDetailsForm },
    { id: 'files', label: 'Files', component: FileDetailsStep },
    { id: 'details', label: 'Details', component: DetailsForm },
    { id: 'editors', label: 'Editors', component: EditorsForm },
    {
        id: 'disclosure',
        label: 'Disclosure',
        component: DisclosureForm,
    },
];

const SubmissionWizard: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps<Props>): JSX.Element => {
    const { id, step } = useParams();
    const { t } = useTranslation('wizard-form');
    const getCurrentStepPathIndex = (): number => {
        return stepConfig.findIndex((config): boolean => config.id === step.toLocaleLowerCase());
    };
    const [submitSubmission] = useMutation<Submission>(submitSubmissionMutation);
    const { isShowing, toggle } = useModal();

    const { data, loading } = useQuery<GetSubmission>(getSubmissionQuery, {
        variables: { id },
        returnPartialData: true,
    });

    return (
        <div className="submission-wizard">
            <ProgressBar
                fixedWidthCentered
                steps={stepConfig.map((step: StepConfig): { id: string; label: string } => ({
                    id: step.id,
                    label: step.label,
                }))}
                currentStep={step.toLocaleLowerCase()}
            />
            <Switch>
                {stepConfig.map(
                    (config): JSX.Element => (
                        <Route
                            key={config.id}
                            path={`/submit/${id}/${config.id}`}
                            render={(): JSX.Element =>
                                loading ? (
                                    <span>loading... </span>
                                ) : (
                                    <config.component
                                        initialValues={data.getSubmission}
                                        ButtonComponent={ButtonComponent(
                                            id,
                                            history,
                                            getCurrentStepPathIndex,
                                            stepConfig,
                                            toggle,
                                        )}
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
                onAccept={(): void => {
                    submitSubmission({ variables: { id: data.getSubmission.id } });
                }}
            >
                <h2 className="typography__heading typography__heading--h2">{t('submit.modal-title')}</h2>
                <Paragraph type="writing">{t('submit.modal-text')}</Paragraph>
            </Modal>
        </div>
    );
};
export default SubmissionWizard;
