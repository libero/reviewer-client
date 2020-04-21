export interface Submission {
    id: string;
    updated: number;
    articleType: string;
    lastStepVisited?: string;
    status?: string;
    author?: AuthorDetails;
    manuscriptDetails?: ManuscriptDetails;
    files?: FileDetails;
}

export interface File {
    filename: string;
    url?: string;
    id?: string;
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
