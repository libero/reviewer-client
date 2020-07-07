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
        const decodedToken = decodeToken(token);
        // Token is expired. Remove it. exp is in seconds so convert to milliseconds.
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            clearToken();
            window.location.reload();
        }
    }

    return token;
};

// parse JWT from the URL hash
export const getTokenFromUrl = (): string => {
    let results;
    if (window.location) {
        const regex = new RegExp('[\\?&]token=([^&#]*)');
        results = regex.exec(window.location.search);
    }
    return !results ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
