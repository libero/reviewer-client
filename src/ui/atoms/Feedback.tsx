import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useTranslation } from 'react-i18next';
import Interweave from 'interweave';

import { APPLICATION_ERROR } from '../../initial-submission/graphql';

const Feedback = (): JSX.Element => {
    const { t } = useTranslation('ui');
    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);

    const { data } = useQuery(APPLICATION_ERROR);
    const { feedback = {} } = data && data.feedback ? data : {};

    const { message = null, error = null } = feedback;

    const handleScroll = (): void => {
        console.log('ref.current', ref.current);
        if (ref.current && error) {
            window.pageYOffset > ref.current.getBoundingClientRect().bottom ? setSticky(true) : setSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return (): void => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, [error]);

    return (
        <React.Fragment>
            {isSticky && <div className="fixed-padding" />}
            <div className={`feedback ${error && 'error'} ${isSticky && 'stick'}`} ref={ref}>
                <div className="feedback__content">
                    <Interweave content={t(message)} />
                </div>
            </div>
        </React.Fragment>
    );
};
export default Feedback;
