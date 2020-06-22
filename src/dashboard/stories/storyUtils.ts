const getMockSubmissionForDaysAgo = (daysAgo: number): string => {
    const date = new Date();
    date.setDate(new Date().getDate() - daysAgo);
    return date.toISOString();
};

export default getMockSubmissionForDaysAgo;
