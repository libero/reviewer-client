import { useState } from 'react';

interface HookReturn {
    accepted: boolean;
    setAccepted: () => void;
}

const getCookie = (): boolean => {
    let result = false;
    document.cookie.split('; ').forEach(cookie => {
        if (cookie.indexOf('cookieNotificationAccepted') === 0) {
            const re = new RegExp('cookieNotificationAccepted=([^;]*)');
            const cookieMatch = cookie.match(re)[1];
            result = !!decodeURIComponent(cookieMatch);
        }
    });
    return result;
};

const useCookieNotification = (): HookReturn => {
    const [accepted, setLocalAccepted] = useState<boolean>(getCookie());
    const setAccepted = (): void => {
        const expiryDate = 'Tue, 19 January 2038 03:14:07 UTC';
        const cookieString = `cookieNotificationAccepted=true; expires=${expiryDate}; path=/; domain=${document.domain};`;
        document.cookie = cookieString;
        setLocalAccepted(true);
    };

    return {
        accepted,
        setAccepted,
    };
};

export default useCookieNotification;
