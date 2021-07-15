interface Option {
    label: string;
    value: string;
}

export const getOptions = (labels: string[], values: string[]): Option[] => {
    const options: Option[] = [];
    for (let i = 0; i < values.length; i++) {
        options.push({
            label: labels[i],
            value: values[i],
        });
    }
    return options;
};
