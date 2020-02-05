import dateTimeDiffToText from './dateTimeDiffToText';

const generatePastDateTime = (daysAgo: number): number => {
    const date = new Date();
    date.setDate(new Date().getDate() - daysAgo);
    return date.getTime();
};

describe('dateTimeDiffToText', (): void => {
    it('renders a date < 1 day ago as "Invalid date"', (): void => {
        expect(dateTimeDiffToText(generatePastDateTime(-1))).toBe('Invalid date');
    });
    it('renders a date 0 days ago as "Today"', (): void => {
        expect(dateTimeDiffToText(generatePastDateTime(0))).toBe('Today');
    });
    it('renders a date 1 day ago as "Yesterday"', (): void => {
        expect(dateTimeDiffToText(generatePastDateTime(1))).toBe('Yesterday');
    });
    it('renders a date between 2 - 13 days ago as "%numberofdays days ago"', (): void => {
        for (let daysCount = 2; daysCount < 14; daysCount++) {
            expect(dateTimeDiffToText(generatePastDateTime(daysCount))).toBe(`${daysCount} days ago`);
        }
    });
    it('renders a date between 14 - 17 days ago as "2 weeks ago"', (): void => {
        for (let daysCount = 14; daysCount < 18; daysCount++) {
            expect(dateTimeDiffToText(generatePastDateTime(daysCount))).toBe(`2 weeks ago`);
        }
    });
    it('renders a date between 18 - 24 days ago as "3 weeks ago"', (): void => {
        for (let daysCount = 18; daysCount < 25; daysCount++) {
            expect(dateTimeDiffToText(generatePastDateTime(daysCount))).toBe(`3 weeks ago`);
        }
    });
    it('renders a date between 25 - 29 days ago as "4 weeks ago"', (): void => {
        for (let daysCount = 25; daysCount < 30; daysCount++) {
            expect(dateTimeDiffToText(generatePastDateTime(daysCount))).toBe(`4 weeks ago`);
        }
    });
    it('renders a date between 30 - 44 days as "1 month ago"', (): void => {
        for (let daysCount = 30; daysCount < 45; daysCount++) {
            expect(dateTimeDiffToText(generatePastDateTime(daysCount))).toBe(`1 month ago`);
        }
    });

    it('renders a date between 45 - 729 days as "%roundednumberofmonths months ago"', (): void => {
        for (let daysCount = 45; daysCount < 730; daysCount++) {
            const diffMonths = Math.round(daysCount / 30);
            expect(dateTimeDiffToText(generatePastDateTime(daysCount))).toBe(`${diffMonths} months ago`);
        }
    });

    it('renders a date > 729 days as "%roundednumberofyears years ago"', (): void => {
        expect(dateTimeDiffToText(generatePastDateTime(730))).toBe(`2 years ago`);
        expect(dateTimeDiffToText(generatePastDateTime(912))).toBe(`2 years ago`);
        expect(dateTimeDiffToText(generatePastDateTime(913))).toBe(`3 years ago`);
        expect(dateTimeDiffToText(generatePastDateTime(1277))).toBe(`3 years ago`);
        expect(dateTimeDiffToText(generatePastDateTime(1278))).toBe(`4 years ago`);
    });
});
