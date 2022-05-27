type SubPage = {
    title: string;
    linkText: string;
};

type authorGuideSubPages =
    | 'editorialProcess'
    | 'articleTypes'
    | 'initialSubmissions'
    | 'fullSubmissions'
    | 'revisedSubmissions'
    | 'postDecision'
    | 'journalDecision'
    | 'dataAvailability'
    | 'journalFaqs'
    | 'publicationFees'
    | 'journalMetrics';

export const AuthorGuide: Record<authorGuideSubPages, SubPage> = {
    editorialProcess: {
        linkText: 'Editorial Process',
        title: 'The Editorial Process',
    },
    articleTypes: {
        linkText: 'Article Types',
        title: 'Article Types',
    },
    initialSubmissions: {
        linkText: 'Initial Submissions',
        title: 'Initial Submissions',
    },
    fullSubmissions: {
        linkText: 'Full Submissions',
        title: 'Full Submissions',
    },
    revisedSubmissions: {
        linkText: 'Revised Submissions',
        title: 'Revised Submissions',
    },
    postDecision: {
        linkText: 'Post Decision',
        title: 'Post Decision',
    },
    journalDecision: {
        linkText: 'Journal Policies',
        title: 'Journal Policies',
    },
    dataAvailability: {
        linkText: 'Data Availability',
        title: 'Data Availability',
    },
    journalFaqs: {
        linkText: 'Journal FAQs',
        title: 'Journal FAQs',
    },
    publicationFees: {
        linkText: 'Publication Fees',
        title: 'Publication Fees',
    },
    journalMetrics: {
        linkText: 'Journal Metrics',
        title: 'Journal Metrics',
    },
};

type reviewerGuideSubPages = 'reviewProcess' | 'reviewingPolicies' | 'writingTheReview';

export const ReviewerGuide: Record<reviewerGuideSubPages, SubPage> = {
    reviewProcess: {
        linkText: 'Review Process',
        title: 'The Review Process',
    },
    reviewingPolicies: {
        linkText: 'Reviewing Policies',
        title: 'Reviewing Policies',
    },
    writingTheReview: {
        linkText: 'Writing the Review',
        title: 'Writing the Review',
    },
};

type contactUsSubPages = 'contactElife';

export const ContactUs: Record<contactUsSubPages, SubPage> = {
    contactElife: {
        linkText: 'Contact eLife',
        title: 'Contact eLife',
    },
};
