import { useEffect, useRef, DependencyList } from 'react';
import throttle from 'lodash/throttle';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

// This is outside of the component because of the throttle being recreated on each render if its inside.
const save = (onSave: Function): void => {
    onSave();
};

const saveThrottle = throttle(save, 1000);

export default (onSave: () => void, watchArray: DependencyList): (() => void) => {
    const initialRender = useRef(true);
    const prevValues = useRef<DependencyList>();

    useEffect(() => {
        if (!initialRender.current && !isEqual(prevValues.current, watchArray)) {
            saveThrottle(onSave);
        } else {
            initialRender.current = false;
        }
        prevValues.current = cloneDeep(watchArray);
    }, [onSave, watchArray]);

    useEffect(
        () => (): void => {
            saveThrottle.cancel();
        },
        [],
    );
    return saveThrottle.cancel;
};
