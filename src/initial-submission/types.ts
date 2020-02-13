export interface Submission {
    id: string;
    title: string;
    lastStepVisited?: string;
    updated: number;
    status?: string;
    author: AuthorDetails;
}

export interface AuthorDetails {
    firstName: string;
    lastName: string;
    email: string;
    institution: string;
}
