import React from 'react';
import Delete from '@material-ui/icons/Delete';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';
import { deleteSubmissionMutation, getSubmissionsQuery } from '../graphql';
import useModal from '../../ui/hooks/useModal';
import { Modal } from '../../ui/atoms';
import { Submission } from '../../initial-submission/types';
import { Link } from 'react-router-dom';
import dateTimeDiffToText from '../utils/dateTimeDiffToText';

interface Props {
    submission: Submission;
}

const SubmissionEntry: React.FC<Props> = ({ submission }: Props): JSX.Element => {
    const { isShowing, toggle } = useModal();
    const [deleteSubmission] = useMutation(deleteSubmissionMutation, {
        update(cache, { data: { deleteSubmission } }) {
            const { getSubmissions } = cache.readQuery({ query: getSubmissionsQuery });
            const cloneSubmission = [...getSubmissions];
            const indexToDelete = getSubmissions.findIndex(
                (cacheSubmission: { id: string }) => cacheSubmission.id === deleteSubmission,
            );
            cloneSubmission.splice(indexToDelete, 1);
            cache.writeQuery({
                query: getSubmissionsQuery,
                data: { getSubmissions: cloneSubmission },
            });
        },
    });
    const status = submission.status ? submission.status.toLowerCase() : '';
    return (
        <div className="submission-entry">
            <Link
                className={`submission-entry__link submission-entry__link--${status}`}
                to={`/submission/${submission.id}/${submission.lastStepVisited || 'title'}`}
            >
                <div className="submission-entry__content">
                    <span className={`submission-entry__title submission-entry__title--${status}`}>
                        {submission.title.length !== 0 ? submission.title : '(no title)'}
                    </span>
                    <div className={`submission-entry__link_text submission-entry__link_text--${status}`}>
                        <span>Continue Submission</span>
                    </div>
                    <div className="submission-entry__dates">
                        <time>{dateTimeDiffToText(submission.updated)}</time>
                        <time className="submission-entry__date">
                            {moment(submission.updated).format('ddd D MMM YYYY')}
                        </time>
                    </div>
                </div>
            </Link>
            <div className="submission-entry__icon_container">
                <Modal
                    hide={toggle}
                    isShowing={isShowing}
                    onAccept={(): void => {
                        deleteSubmission({ variables: { id: submission.id } });
                    }}
                >
                    <h2>Confirm delete submission?</h2>
                    <p>
                        Your submission &quot;
                        {submission.title.length !== 0 ? submission.title : '(no title)'}
                        &quot; will be deleted permanently
                    </p>
                </Modal>
                <Delete
                    onClick={(): void => toggle()}
                    className="submission-entry__icon"
                    height="24"
                    width="24"
                    viewBox="3 3 18 18"
                />
            </div>
        </div>
    );
};

export default SubmissionEntry;
