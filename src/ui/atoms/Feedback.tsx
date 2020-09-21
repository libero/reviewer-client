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

    const { message = undefined, error = undefined } = feedback;

    const handleScroll = (): void => {
        if (ref.current) {
            window.pageYOffset > ref.current.getBoundingClientRect().bottom ? setSticky(true) : setSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return (): void => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

    return (
        <React.Fragment>
            {isSticky && error && <div className="fixed-padding" />}
            <div className={`feedback ${error ? 'error' : 'hide'} ${isSticky ? 'stick' : ''}`} ref={ref}>
                <div className="feedback__content">
                    <Interweave content={t(message)} />
                </div>
            </div>
        </React.Fragment>
    );
};
export default Feedback;
