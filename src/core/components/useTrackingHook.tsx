import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

declare global {
    interface Window {
        gtag?: any;
    }
}

export default function useTrackingHook() {
    const { listen } = useHistory();

    useEffect(() => {
        const unregister = listen(location => {
            if (window.gtag) {
                // eslint-disable-next-line @typescript-eslint/camelcase
                window.gtag('config', 'UA-176153230-1', { page_path: location.pathname });
            }
        });
        return unregister;
    }, [listen]);
}
