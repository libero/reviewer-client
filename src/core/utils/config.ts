export interface Config {
    client: {
        majorSubjectAreas: { [key: string]: string };
    };

    fileUpload: {
        maxSizeMB: number;
    };

    newrelic: {
        licenseKey: string;
        applicationId: string;
    };

    googleAnalytics: {
        trackingId: string;
    };

    hotJar: {
        enabled: boolean;
        snippetVersion: number;
    };

    titles: { [key: string]: string };
}

declare const API_HOST: string;

// not throwing because error should be handled by consumer.
export const fetchAndSetConfig = async (): Promise<Config> => {
    const response = await fetch(`${API_HOST}/config`);
    const config: Config = await response.json();
    window.localStorage.setItem('config', JSON.stringify(config));
    return config;
};

// The assumption is we should always have the config
export const getConfig = (): Config => {
    return JSON.parse(window.localStorage.getItem('config'));
};
