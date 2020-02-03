import React, { Fragment } from 'react';
import { Button, Modal } from '../../ui/atoms';
import useModal from '../../ui/hooks/useModal';
import ArticleType from './ArticleType';

interface Props {
    buttonText: string;
}

const StartSubmission = ({ buttonText }: Props): JSX.Element => {
    const { isShowing, toggle } = useModal();

    return (
        <Fragment>
            <Button onClick={(): void => toggle()} type="primary">
                {buttonText}
            </Button>
            <Modal
                isShowing={isShowing}
                hide={toggle}
                fullscreen={true}
                fixedPositionButtons={false}
                buttonType="primary"
                wrapperClass="start-submission__wrapper"
                contentClass="start-submission__content"
            >
                <ArticleType />
            </Modal>
        </Fragment>
    );
};

export default StartSubmission;
