import { throttle } from 'lodash';

// This is outside of the component because of the throttle being recreated on each render if its inside.
const save = (onSave: Function): void => {
    onSave();
};
export const AutoSaveDecorator = throttle(save, 5000, { leading: false });
