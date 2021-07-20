interface Option {
    label: string;
    value: string;
}

interface OptionLabels {
    [id: string]: string;
}

export const getOptions = (labels: OptionLabels, values: string[]): Option[] => {
    const retVal: Option[] = [];
    for (let i = 0; i < values.length; i++) {
        if (labels[values[i]]) {
            retVal.push({
                label: labels[values[i]],
                value: values[i],
            });
        }
    }
    return retVal;
};
