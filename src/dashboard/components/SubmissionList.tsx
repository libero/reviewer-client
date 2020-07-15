import React from 'react';
import { useTranslation } from 'react-i18next';
import { Submission } from '../../initial-submission/types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SubmissionEntry from './SubmissionEntry';

interface SubmissionListProps {
    submissions: Submission[];
    onDelete: (options: {}) => void;
}

const SubmissionList: React.FC<SubmissionListProps> = ({
    submissions = [],
    onDelete,
}: SubmissionListProps): JSX.Element => {
    const { t } = useTranslation('dashboard');
    return (
        <Tabs className="dashboard__tabs">
            <TabList className="dashboard__tabs_list">
                <Tab className="dashboard__tab" key="active">
                    {t('submissions-tab')}
                </Tab>
            </TabList>
            <TabPanel className="dashboard__tab_panel" key="active">
                {submissions.length === 0 ? (
                    <div>{t('empty-submissions')}</div>
                ) : (
                    submissions
                        .reverse()
                        .map(
                            (sub: Submission, index: number): JSX.Element => (
                                <SubmissionEntry
                                    key={index}
                                    submission={sub}
                                    onDelete={(): void => onDelete({ variables: { id: sub.id } })}
                                />
                            ),
                        )
                )}
            </TabPanel>
        </Tabs>
    );
};

export default SubmissionList;
