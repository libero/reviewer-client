import { useState, useEffect } from 'react';

export default function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const effect = (): (() => void) => {
        const handler = setTimeout((): void => {
            setDebouncedValue(value);
        }, delay);
        return (): void => {
            clearTimeout(handler);
        };
    };
    useEffect(effect, [value]);

    return debouncedValue;
}
