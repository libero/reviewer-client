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

// not throwing because error should be handled by consumer.
export const fetchAndSetConfig = async (): Promise<Config> => {
    const url = `${CONFIG.API_HOST}/config`;
    console.log('Getting response....', url);
    const response = await fetch(url, {
        mode: 'no-cors',
        headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': `${CONFIG.API_HOST}`,
            'Content-Type': 'application/json',
        },
    });
    const config: Config = await response.json();
    window.localStorage.setItem('config', JSON.stringify(config));
    return config;
};

// The assumption is we should always have the config
export const getConfig = (): Config => {
    console.log('Getting config...');
    return JSON.parse(window.localStorage.getItem('config'));
};
