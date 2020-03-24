import { gql } from 'apollo-boost';

export const getSubmissionQuery = gql`
    query GetSubmission($id: ID!) {
        getSubmission(id: $id) {
            id
            manuscriptDetails {
                title
            }
            updated
            author {
                firstName
                lastName
                email
                institution
            }
            files {
                coverLetter
            }
        }
    }
`;

export const saveAuthorPageMutation = gql`
    mutation SaveAuthorPage($id: ID!, $details: AuthorDetailsInput!) {
        saveAuthorPage(id: $id, details: $details) {
            id
            author {
                firstName
                lastName
                email
                institution
            }
        }
    }
`;

export const saveFilesPageMutation = gql`
    mutation SaveFilesPage($id: ID!, $coverLetter: String) {
        saveFilesPage(id: $id, coverLetter: $coverLetter) {
            id
            files {
                coverLetter
            }
        }
    }
`;

export const uploadManuscriptMutation = gql`
    mutation UploadManuscript($id: ID!, $file: Upload!, $fileSize: Int!) {
        uploadManuscript(id: $id, file: $file, fileSize: $fileSize) {
            id
            manuscriptFile {
                filename
                url
            }
        }
    }
`;

export const saveDetailsPageMutation = gql`
    mutation SaveDetailsPage($id: ID!, $details: ManuscriptDetailsInput!) {
        saveDetailsPage(id: $id, details: $details) {
            id
            manuscriptDetails {
                title
                subjects
                previouslyDiscussed
                previouslySubmitted
                cosubmission
            }
        }
    }
`;
