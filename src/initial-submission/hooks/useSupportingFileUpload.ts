import { useEffect, useState, Dispatch, SetStateAction } from 'react';

const hook = (
    mutation: ({}) => Promise<{}>,
    successCallback: ({}, {}) => void,
    errorCallback: ({}, error: Error) => void,
): Dispatch<SetStateAction<[]>> => {
    const [index, setIndex] = useState(0);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (!files.length) return;

        if (index < files.length) {
            mutation(files[index])
                .then((data: {}) => {
                    setIndex(index + 1);
                    successCallback(files[index], data);
                })
                .catch((error: Error) => {
                    setIndex(index + 1);
                    errorCallback(files[index], error);
                });
        } else {
            setFiles([]);
            setIndex(0);
        }
    }, [index, files]);

    return setFiles;
};

export default hook;
