import { useEffect } from 'react';

function useScrollToAnchor(): void {
    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView();
                }, 200);
            }
        }
    }, []);
}

export default useScrollToAnchor;
