import React from 'react';
import moment from 'moment';
import Delete from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';
import useModal from '../../ui/hooks/useModal';
import { Modal } from '../../ui/atoms';
import { Submission } from '../../initial-submission/types';
import { Link } from 'react-router-dom';
import dateTimeDiffToText from '../utils/dateTimeDiffToText';

interface Props {
    submission: Submission;
    onDelete: () => void;
    toggleArticleType: () => void;
    setNoArticleTypeId: (id: string) => void;
}

const SubmissionEntry: React.FC<Props> = ({
    submission,
    onDelete,
    toggleArticleType,
    setNoArticleTypeId,
}: Props): JSX.Element => {
    const { isShowing, toggle } = useModal();
    const { t } = useTranslation('dashboard');
    const getTitle = (submission: Submission): string =>
        submission.manuscriptDetails &&
        submission.manuscriptDetails.title &&
        submission.manuscriptDetails.title.length !== 0
            ? submission.manuscriptDetails.title
            : t('no-title');

    const status = submission.status ? submission.status.toLowerCase() : '';
    return (
        <div className="submission-entry" data-id={submission.id}>
            <Link
                className={`submission-entry__link submission-entry__link--${status}`}
                to={submission.lastStepVisited}
                onClick={(e: React.MouseEvent): void => {
                    if (status !== 'continue_submission' || !submission.articleType || submission.articleType === '') {
                        e.preventDefault();
                    }

                    if (!submission.articleType || submission.articleType === '') {
                        setNoArticleTypeId(submission.id);
                        toggleArticleType();
                    }
                }}
            >
                <div className="submission-entry__content">
                    <span className={`submission-entry__title submission-entry__title--${status}`}>
                        {getTitle(submission)}
                    </span>
                    <div className={`submission-entry__link_text submission-entry__link_text--${status}`}>
                        {status === 'continue_submission' ? (
                            <span className="typography__body--link">{t('continue-submission')}</span>
                        ) : (
                            <span>{t('submitted')}</span>
                        )}
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
                <Modal hide={toggle} isShowing={isShowing} onAccept={onDelete}>
                    <h2>{t('delete-modal-title')}</h2>
                    <p>
                        {t('delete-text-prefix')}
                        {getTitle(submission)}
                        {t('delete-text-suffix')}
                    </p>
                </Modal>
                {status === 'continue_submission' && (
                    <span className="submission-entry__icon" onClick={(): void => toggle()}>
                        <Delete height="24" width="24" viewBox="3 3 18 18" />
                    </span>
                )}
            </div>
        </div>
    );
};

export default SubmissionEntry;
