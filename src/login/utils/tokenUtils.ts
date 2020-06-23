interface JwtToken {
    exp: number;
    iat: number;
    issuer: string;
}

export const setToken = (token: string): void => {
    window.localStorage.setItem('token', token);
};

export const clearToken = (): void => {
    window.localStorage.removeItem('token');
};

export const decodeToken = (token: string): JwtToken => {
    const [, payload] = token.split('.');
    return JSON.parse(atob(payload)) as JwtToken;
};

export const getToken = (): string => {
    const token = window.localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = decodeToken(token);
            // Token is expired. Remove it. exp is in seconds so convert to milliseconds.
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                throw new Error('token invalid');
            }
        } catch (e) {
            clearToken();
        }
    }

    return token;
};

// parse JWT from the URL hash
export const getTokenFromUrl = (): string => {
    if (window.location && window.location.hash) {
        return window.location.hash.substring(1);
    }
    return null;
};
