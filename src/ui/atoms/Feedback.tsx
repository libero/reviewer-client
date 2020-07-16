import React, { useState, useRef, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

const APPLICATION_ERROR = gql`
    query ApplicationError {
        feedback @client
    }
`;

const CLEAR_ERROR = gql`
    mutation ClearError {
        clearError @client
    }
`;

const Feedback = (): JSX.Element => {
    const [isSticky, setSticky] = useState(false);
    const [clearError] = useMutation(CLEAR_ERROR);
    const ref = useRef(null);
    const handleScroll = () => {
        if (ref.current) {
            window.scrollY > ref.current.getBoundingClientRect().bottom ? setSticky(true) : setSticky(false);
        }
    };
    const clearErrorHandler = async () => {
        await clearError();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

    const { data } = useQuery(APPLICATION_ERROR);

    if (!data || !data.feedback) {
        return <React.Fragment />;
    }

    const { message, error, dismissable } = data.feedback;

    return (
        <React.Fragment>
            {isSticky && <div className="fixed-padding" />}
            <div className={`feedback ${error && 'error'} ${isSticky && 'stick'}`} ref={ref}>
                {message}
                {dismissable && <button onClick={clearErrorHandler}></button>}
            </div>
        </React.Fragment>
    );
};
export default Feedback;
