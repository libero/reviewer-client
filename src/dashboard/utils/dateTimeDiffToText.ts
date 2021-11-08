import moment from 'moment';

export default (isoStringDate: string): string => {
    const date = moment().utc();
    const passedDate = moment(isoStringDate).utc();
    const diffDays = date.diff(passedDate, 'days');

    if (date.diff(passedDate, 'milliseconds') < 0 || Number.isNaN(diffDays)) {
        return 'Invalid date';
    }

    if (diffDays === 0) {
        return 'Today';
    }

    if (diffDays === 1) {
        return 'Yesterday';
    }

    if (diffDays < 14) {
        return `${diffDays} days ago`;
    }

    if (diffDays < 30) {
        const diffWeeks = Math.round(diffDays / 7);
        return `${diffWeeks} weeks ago`;
    }

    if (diffDays < 730) {
        const diffMonths = Math.round(diffDays / 30);
        return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'} ago`;
    }
    const diffYears = Math.round(diffDays / 365);
    return `${diffYears} ${diffYears === 1 ? 'year' : 'years'} ago`;
};
