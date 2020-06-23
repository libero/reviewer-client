import { getToken, getTokenFromUrl, setToken, decodeToken } from '../../login/utils/tokenUtils';

export const isAuthenticated = (): boolean => getToken() !== null;

export const importToken = (): void => {
    const token: string = getTokenFromUrl();

    if (token) {
        const decodedToken = decodeToken(token);
        if (decodedToken.issuer === 'libero') {
            setToken(token);
        }
    }
};
