/*eslint-disable react/display-name*/
import React, { useState } from 'react';
import { useParams, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { Button } from '../../ui/atoms';
import { ProgressBar } from '../../ui/molecules';
import { Submission } from '../types';
import AuthorDetailsForm from './AuthorDetailsForm';
import FileDetailsStep from './FileDetailsForm';
import DetailsForm from './DetailsForm';
import { useQuery } from '@apollo/react-hooks';
import { getSubmissionQuery } from '../graphql';
import * as H from 'history';

interface Props {
    id: string;
}

export interface StepProps {
    initialValues: Submission;
    ButtonComponent?: (props: { saveFunction?: Function; triggerValidation: () => Promise<boolean> }) => JSX.Element;
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
) => ({
    saveFunction,
    triggerValidation,
}: {
    saveFunction: Function;
    triggerValidation: () => Promise<boolean>;
}): JSX.Element => {
    const [processing, setProcessing] = useState(false);
    return (
        <React.Fragment>
            {getCurrentStepPathIndex() > 0 && (
                <Button
                    onClick={async (): Promise<void> => {
                        if (!processing) {
                            try {
                                setProcessing(true);
                                await saveFunction();
                                history.push(`/submit/${id}/${stepConfig[getCurrentStepPathIndex() - 1].id}`);
                                setProcessing(false);
                            } catch (e) {
                                setProcessing(false);
                            }
                        }
                    }}
                >
                    back
                </Button>
            )}
            {getCurrentStepPathIndex() < stepConfig.length - 1 && (
                <Button
                    onClick={async (): Promise<void> => {
                        if (!processing) {
                            try {
                                setProcessing(true);
                                triggerValidation().then(async valid => {
                                    if (valid) {
                                        await saveFunction();
                                        history.push(`/submit/${id}/${stepConfig[getCurrentStepPathIndex() + 1].id}`);
                                    }
                                });
                                setProcessing(false);
                            } catch (e) {
                                setProcessing(false);
                            }
                        }
                    }}
                    type="primary"
                >
                    next
                </Button>
            )}
        </React.Fragment>
    );
};

const stepConfig: StepConfig[] = [
    { id: 'author', label: 'Author', component: AuthorDetailsForm },
    { id: 'files', label: 'Files', component: FileDetailsStep },
    { id: 'details', label: 'Details', component: DetailsForm },
    {
        id: 'editors',
        label: 'Editors',
        component: ({ ButtonComponent }: StepProps): JSX.Element => (
            <div>
                Editors Step{' '}
                {ButtonComponent && (
                    <ButtonComponent triggerValidation={(): Promise<boolean> => Promise.resolve(true)} />
                )}
            </div>
        ),
    },
    {
        id: 'disclosure',
        label: 'Disclosure',
        component: ({ ButtonComponent }: StepProps): JSX.Element => (
            <div>
                Disclosure Step{' '}
                {ButtonComponent && (
                    <ButtonComponent triggerValidation={(): Promise<boolean> => Promise.resolve(true)} />
                )}
            </div>
        ),
    },
];

const SubmissionWizard: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps<Props>): JSX.Element => {
    const { id, step } = useParams();
    const getCurrentStepPathIndex = (): number =>
        stepConfig.findIndex((config): boolean => config.id === step.toLocaleLowerCase());

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
                                        )}
                                    />
                                )
                            }
                        />
                    ),
                )}
                <Redirect from="/submit/:id" to={`/submit/${id}/author`} />
            </Switch>
        </div>
    );
};
export default SubmissionWizard;
