interface JwtToken {
    exp: number;
    iat: number;
    issuer: string;
}

export const getToken = (): string => {
    try {
        const token = window.localStorage.getItem('token');
        const decodedToken = decodeToken(token);
        // Token is expired. Remove it.
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            throw new Error('token expired');
        }
        return token;
    } catch (e) {
        clearToken();
    }
};

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

// parse JWT from the URL hash
export const getTokenFromUrl = (): string => {
    if (window.location && window.location.hash) {
        return window.location.hash.substring(1);
    }
    return null;
};
