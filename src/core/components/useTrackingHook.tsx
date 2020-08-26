import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function useTrackingHook(): void {
    const { listen } = useHistory();

    useEffect(() => {
        const unregister = listen((location): void => {
            if (window.gtag) {
                // eslint-disable-next-line @typescript-eslint/camelcase
                window.gtag('config', 'UA-176153230-1', { page_path: location.pathname });
            }
        });
        return unregister;
    }, [listen]);
}
