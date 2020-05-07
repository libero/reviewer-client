import { useEffect, useRef, DependencyList } from 'react';
import throttle from 'lodash/throttle';

// This is outside of the component because of the throttle being recreated on each render if its inside.
const save = (onSave: Function): void => {
    onSave();
};

const saveThrottle = throttle(save, 5000, { leading: false });

export default (onSave: () => void, watchArray: DependencyList): void => {
    const initialRender = useRef(true);

    useEffect(() => {
        if (!initialRender.current) {
            saveThrottle(onSave);
        } else {
            initialRender.current = false;
        }
        return (): void => {
            saveThrottle.cancel();
        };
    }, watchArray);
};
