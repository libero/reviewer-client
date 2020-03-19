export interface Submission {
    id: string;
    title?: string;
    lastStepVisited?: string;
    updated: number;
    status?: string;
    author?: AuthorDetails;
    manuscriptDetails?: ManuscriptDetails;
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
