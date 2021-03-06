const config = {
    client: {
        majorSubjectAreas: {
            'biochemistry-chemical-biology': 'Biochemistry and Chemical Biology',
            'cancer-biology': 'Cancer Biology',
            'cell-biology': 'Cell Biology',
            'chromosomes-gene-expression': 'Chromosomes and Gene Expression',
            'computational-systems-biology': 'Computational and Systems Biology',
            'developmental-biology': 'Developmental Biology',
            ecology: 'Ecology',
            'epidemiology-global-health': 'Epidemiology and Global Health',
            'evolutionary-biology': 'Evolutionary Biology',
            'genetics-genomics': 'Genetics and Genomics',
            medicine: 'Medicine',
            'immunology-inflammation': 'Immunology and Inflammation',
            'microbiology-infectious-disease': 'Microbiology and Infectious Disease',
            neuroscience: 'Neuroscience',
            'physics-living-systems': 'Physics of Living Systems',
            'plant-biology': 'Plant Biology',
            'stem-cells-and-regenerative-medicine': 'Stem Cells and Regenerative Medicine',
            'structural-biology-molecular-biophysics': 'Structural Biology and Molecular Biophysics',
        },
    },
    fileUpload: {
        maxSizeMB: 100,
    },
    newrelic: {
        licenseKey: '',
        applicationID: '',
    },
    googleAnalytics: {
        trackingId: '',
    },
    titles: {
        '': 'Dashboard | eLife',
        'author-guide': 'Author guide | eLife',
        'reviewer-guide': 'Reviewer guide | eLife',
        'contact-us': 'Contact us | eLife',
        login: 'Login | eLife',
        submit: 'Submit | eLife',
    },
};

export interface Config {
    client: {
        majorSubjectAreas: { [key: string]: string };
    };

    fileUpload: {
        maxSizeMB: number;
    };

    newrelic: {
        licenseKey: string;
        applicationID: string;
    };

    googleAnalytics: {
        trackingId: string;
    };

    titles: { [key: string]: string };
}

// The assumption is we should always have the config
export const getConfig = (): Config => {
    return config;
};
