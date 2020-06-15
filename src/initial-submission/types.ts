export type Suggestion = {
    fieldName: string;
    value: string;
};

export interface Submission {
    id: string;
    updated: number;
    articleType: string;
    lastStepVisited?: string;
    status?: string;
    author?: AuthorDetails;
    manuscriptDetails?: ManuscriptDetails;
    files?: FileDetails;
    editorDetails?: EditorsDetails;
    suggestions?: Array<Suggestion>;
    disclosure?: DisclosureDetails;
}

export interface File {
    filename: string;
    url?: string;
    id?: string;
    downloadLink?: string;
}

export interface FileDetails {
    coverLetter?: string;
    manuscriptFile?: File | null;
    supportingFiles?: Array<File>;
}

export interface EditorsDetails {
    suggestedSeniorEditors?: string[];
    opposedSeniorEditors?: string[];
    opposedSeniorEditorsReason?: string;
    suggestedReviewingEditors?: string[];
    opposedReviewingEditors?: string[];
    opposedReviewingEditorsReason?: string;
    suggestedReviewers?: ReviewerAlias[];
    opposedReviewers?: OpposedReviewer[];
    opposedReviewersReason?: string;
}

export interface ReviewerAlias {
    name?: string;
    email?: string;
}

export interface OpposedReviewer {
    name?: string;
    email?: string;
}

export interface EditorAlias {
    id: string;
    name: string;
    aff?: string;
    focuses?: string[];
    expertises?: string[];
}

export interface AuthorDetails {
    firstName?: string;
    lastName?: string;
    email?: string;
    institution?: string;
}

export interface ManuscriptDetails {
    title?: string;
    subjects?: string[];
    previouslyDiscussed?: string;
    previouslySubmitted?: string;
    cosubmission?: string[];
}

export interface UploadInProgressData {
    fileUploadProgress: {
        percentage: string;
        userId: string;
        filename: string;
        fileId: string;
        type: string;
        submissionId: string;
    };
}

export interface DisclosureDetails {
    submitterSignature?: string;
    disclosureConsent?: boolean;
}
