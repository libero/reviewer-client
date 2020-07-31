import { useEffect } from 'react';

function useOnClickOutside(ref: React.MutableRefObject<HTMLElement>, callback: Function): void {
    useEffect((): (() => void) => {
        const clickHandler = (event: Event): void => {
            if (ref.current && !ref.current.contains(event.target as Element)) {
                callback();
            }
        };
        document.addEventListener('click', clickHandler);
        return (): void => document.removeEventListener('click', clickHandler);
    }, [clickHandler]);
}

export default useOnClickOutside;
