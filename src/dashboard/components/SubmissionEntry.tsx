import React from 'react';
import Delete from '@material-ui/icons/Delete';
import useModal from '../../ui/hooks/useModal';
import { Modal } from '../../ui/atoms';
import { Submission } from '../../initial-submission/types';
import { Link } from 'react-router-dom';
import dateTimeDiffToText from '../utils/dateTimeDiffToText';

interface Props {
    submission: Submission;
    onDelete: () => void;
}

const SubmissionEntry: React.FC<Props> = ({ submission, onDelete }: Props): JSX.Element => {
    const { isShowing, toggle } = useModal();

    const getTitle = (submission: Submission): string =>
        submission.manuscriptDetails &&
        submission.manuscriptDetails.title &&
        submission.manuscriptDetails.title.length !== 0
            ? submission.manuscriptDetails.title
            : '(no title)';

    const status = submission.status ? submission.status.toLowerCase() : '';
    return (
        <div className="submission-entry" data-id={submission.id}>
            <Link
                className={`submission-entry__link submission-entry__link--${status}`}
                to={`/submit/${submission.id}/${submission.lastStepVisited || 'author'}`}
            >
                <div className="submission-entry__content">
                    <span className={`submission-entry__title submission-entry__title--${status}`}>
                        {getTitle(submission)}
                    </span>
                    <div className={`submission-entry__link_text submission-entry__link_text--${status}`}>
                        <span>Continue Submission</span>
                    </div>
                    <div className="submission-entry__dates">
                        <time>{dateTimeDiffToText(submission.updated)}</time>
                        <time className="submission-entry__date">{submission.updated}</time>
                    </div>
                </div>
            </Link>
            <div className="submission-entry__icon_container">
                <Modal hide={toggle} isShowing={isShowing} onAccept={onDelete}>
                    <h2>Confirm delete submission?</h2>
                    <p>
                        Your submission &quot;
                        {getTitle(submission)}
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
