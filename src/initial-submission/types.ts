export interface Submission {
    id: string;
    title?: string;
    articleType?: string;
    lastStepVisited?: string;
    updated: number;
    status?: string;
    author?: AuthorDetails;
    manuscriptDetails?: ManuscriptDetails;
    files?: FileDetails;
}

export interface File {
    filename: string;
    url?: string;
}

export interface FileDetails {
    coverLetter?: string;
    manuscriptFile?: File | null;
    supportingFiles?: Array<File>;
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
