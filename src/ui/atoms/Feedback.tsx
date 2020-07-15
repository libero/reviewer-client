import React, { useState, useRef, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const APPLICATION_ERROR = gql`
    query ApplicationError {
        message @client
    }
`;

const Feedback = (): JSX.Element => {
    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    const handleScroll = () => {
        if (ref.current) {
            window.scrollY > ref.current.getBoundingClientRect().bottom ? setSticky(true) : setSticky(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', () => handleScroll);
        };
    }, []);

    // const { data } = useQuery(APPLICATION_ERROR);

    // if (!data || !data.message) {
    //     return <React.Fragment />;
    // }
    // return <div className={`banner error`}>{data.message}</div>;
    return (
        <React.Fragment>
            {isSticky && <div className="fixed-padding" />}
            <div className={`feedback error ${isSticky && 'stick'}`} ref={ref}>
                An unexpected error occured. Please copy your unsaved worked and refresh the page.
            </div>
        </React.Fragment>
    );
};
export default Feedback;
