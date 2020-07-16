import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CLEAR_ERROR, APPLICATION_ERROR } from '../../initial-submission/graphql';

const Feedback = (): JSX.Element => {
    const [isSticky, setSticky] = useState(false);
    const [clearError] = useMutation(CLEAR_ERROR);
    const ref = useRef(null);
    const handleScroll = (): void => {
        if (ref.current) {
            window.scrollY > ref.current.getBoundingClientRect().bottom ? setSticky(true) : setSticky(false);
        }
    };

    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const clearErrorHandler = async (): Promise<void> => {
        await clearError();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return (): void => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

    const { data } = useQuery(APPLICATION_ERROR);

    if (!data || !data.feedback) {
        return <React.Fragment />;
    }

    // dismissable: indicates if this feedback can be dismissed.
    const { message, error } = data.feedback;

    return (
        <React.Fragment>
            {isSticky && <div className="fixed-padding" />}
            <div className={`feedback ${error && 'error'} ${isSticky && 'stick'}`} ref={ref}>
                {message}
            </div>
        </React.Fragment>
    );
};
export default Feedback;
