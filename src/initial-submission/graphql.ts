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
                    id
                }
            }
            suggestions {
                fieldName
                value
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
            suggestions {
                fieldName
                value
            }
            files {
                manuscriptFile {
                    filename
                    url
                    downloadLink
                }
            }
        }
    }
`;

export const uploadSupportingFileMutation = gql`
    mutation UploadSupportingFile($id: ID!, $file: Upload!, $fileSize: Int!) {
        uploadSupportingFile(id: $id, file: $file, fileSize: $fileSize) {
            id
            filename
            url
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

export const deleteSupportingFileMutation = gql`
    mutation DeleteSupportingFile($fileId: ID!, $submissionId: ID!) {
        deleteSupportingFile(fileId: $fileId, submissionId: $submissionId)
    }
`;

export const saveEditorsPageMutation = gql`
    mutation SaveEditorPage($id: ID!, $details: EditorDetailsInput!) {
        saveEditorPage(id: $id, details: $details) {
            id
            editorDetails {
                suggestedSeniorEditors
                opposedSeniorEditors
                opposedSeniorEditorsReason
                suggestedReviewingEditors
                opposedReviewingEditors
                opposedReviewingEditorsReason
                suggestedReviewers {
                    name
                    email
                }
                opposedReviewers {
                    name
                    email
                }
                opposedReviewersReason
            }
        }
    }
`;

export const getEditorsQuery = gql`
    query EditorList($role: String!) {
        getEditors(role: $role) {
            id
            name
            aff
            focuses
            expertises
        }
    }
`;
