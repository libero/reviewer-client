import gql from 'graphql-tag';

export const getSubmissionQuery = gql`
    query GetSubmission($id: ID!) {
        getSubmission(id: $id) {
            id
            manuscriptDetails {
                title
                subjects
                previouslyDiscussed
                previouslySubmitted
                cosubmission
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
                manuscriptFile {
                    filename
                    url
                }
                supportingFiles {
                    filename
                }
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
            files {
                manuscriptFile {
                    filename
                    url
                }
            }
        }
    }
`;

export const uploadSupportingFileMutation = gql`
    mutation UploadSupportingFile($id: ID!, $file: Upload!, $fileSize: Int!) {
        uploadSupportingFile(id: $id, file: $file, fileSize: $fileSize) {
            id
            files {
                supportingFiles {
                    filename
                    url
                }
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

export const fileUploadProgressSubscription = gql`
    subscription FileUploadProgress($submissionId: ID!) {
        fileUploadProgress(submissionId: $submissionId) {
            filename
            fileId
            type
            percentage
        }
    }
`;
