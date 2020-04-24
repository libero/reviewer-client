import React from 'react';
import { useParams, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { Button } from '../../ui/atoms';
import { ProgressBar } from '../../ui/molecules';
import { Submission } from '../types';
import AuthorDetailsForm from './AuthorDetailsForm';
import FileDetailsStep from './FileDetailsForm';
import DetailsForm from './DetailsForm';
import { useQuery } from '@apollo/react-hooks';
import { getSubmissionQuery } from '../graphql';

interface Props {
    id: string;
}

interface StepProps {
    initialValues: Submission;
    buttonComponent?: (onSave?: Function) => JSX.Element;
}

interface StepConfig {
    id: string;
    label: string;
    component: (props: StepProps) => JSX.Element;
}

interface GetSubmission {
    getSubmission: Submission;
}

/*eslint-disable react/display-name*/
const stepConfig: StepConfig[] = [
    { id: 'author', label: 'Author', component: AuthorDetailsForm },
    { id: 'files', label: 'Files', component: FileDetailsStep },
    { id: 'details', label: 'Details', component: DetailsForm },
    {
        id: 'editors',
        label: 'Editors',
        component: ({ buttonComponent }: StepProps): JSX.Element => <div>Editors Step {buttonComponent()}</div>,
    },
    {
        id: 'disclosure',
        label: 'Disclosure',
        component: ({ buttonComponent }: StepProps): JSX.Element => <div>Disclosure Step {buttonComponent()}</div>,
    },
];

const SubmissionWizard: React.FC<RouteComponentProps> = ({ history }: RouteComponentProps<Props>): JSX.Element => {
    const { id, step } = useParams();
    const getCurrentStepPathIndex = (): number =>
        stepConfig.findIndex((config): boolean => config.id === step.toLocaleLowerCase());

    const { data, loading } = useQuery<GetSubmission>(getSubmissionQuery, {
        variables: { id },
    });

    const buttonComponent = (saveFunction?: Function): JSX.Element => (
        <React.Fragment>
            {getCurrentStepPathIndex() > 0 && (
                <Button
                    onClick={async (): Promise<void> => {
                        if (saveFunction) {
                            await saveFunction();
                        }
                        history.push(`/submit/${id}/${stepConfig[getCurrentStepPathIndex() - 1].id}`);
                    }}
                >
                    back
                </Button>
            )}
            {getCurrentStepPathIndex() < stepConfig.length - 1 && (
                <Button
                    onClick={async (): Promise<void> => {
                        if (saveFunction) {
                            await saveFunction();
                        }
                        history.push(`/submit/${id}/${stepConfig[getCurrentStepPathIndex() + 1].id}`);
                    }}
                    type="primary"
                >
                    next
                </Button>
            )}
        </React.Fragment>
    );

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
                                        buttonComponent={buttonComponent}
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
