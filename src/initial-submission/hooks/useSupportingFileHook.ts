import { useEffect, useState, useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { v4 } from 'uuid';
import { uploadSupportingFileMutation, deleteSupportingFileMutation, getSubmissionQuery } from '../graphql';
import { FileState } from '../../ui/molecules/MultiFileUpload';
import { File as ReviewerFile, Submission } from '../types';
import { ExecutionResult } from 'graphql';

const hook = (
    initialValues: Submission,
    maxSupportingFiles: number,
): [(fileList: FileList) => void, (fileId: string) => Promise<string>, FileState[], boolean, number] => {
    const [index, setIndex] = useState(0);
    const [files, setFiles] = useState([]);
    const [supportingUploadDisabled, setSupportingUploadDisabled] = useState<boolean>(false);
    const { files: initialFiles } = initialValues;

    const getInitialSupportingFiles = (): FileState[] => {
        if (!initialFiles || !initialFiles.supportingFiles) return [];
        return initialFiles.supportingFiles.map(file => ({
            fileStored: {
                fileName: file.filename,
                id: file.id,
            },
        }));
    };
    const [supportingFilesStatus, setSupportingFilesStatus] = useState<FileState[]>(getInitialSupportingFiles());

    const filesStoredCount = useMemo(() => supportingFilesStatus.filter(fileStatus => !fileStatus.error).length, [
        supportingFilesStatus,
    ]);

    const [uploadSupportingFile] = useMutation(uploadSupportingFileMutation, {
        update(cache, { data: { uploadSupportingFile } }) {
            const { getSubmission } = cache.readQuery({
                query: getSubmissionQuery,
                variables: { id: initialValues.id },
            });
            getSubmission.files.supportingFiles.push(uploadSupportingFile);
            cache.writeQuery({
                query: getSubmissionQuery,
                data: { getSubmission: getSubmission },
            });
        },
    });
    const [deleteSupportingFile] = useMutation(deleteSupportingFileMutation, {
        update(cache, { data: { deleteSupportingFile } }) {
            const { getSubmission } = cache.readQuery({
                query: getSubmissionQuery,
                variables: { id: initialValues.id },
            });
            getSubmission.files.supportingFiles = getSubmission.files.supportingFiles.filter(
                (file: ReviewerFile) => file.id !== deleteSupportingFile,
            );
            const newSupportingFilesStatus = supportingFilesStatus.filter(
                (file: FileState) =>
                    (file.fileStored && file.fileStored.id !== deleteSupportingFile) || !file.fileStored,
            );
            setSupportingFilesStatus(newSupportingFilesStatus);
            cache.writeQuery({
                query: getSubmissionQuery,
                data: { getSubmission: getSubmission },
            });
        },
    });

    const onSupportingUploadSuccess = (
        file: { file: File; id: string },
        response: ExecutionResult<{ uploadSupportingFile: { id: string } }>,
    ): void => {
        const responseFile = response.data.uploadSupportingFile;
        const thisFilesIndex = supportingFilesStatus.findIndex(
            (state: FileState) => state.uploadInProgress && state.uploadInProgress.id === file.id,
        );
        supportingFilesStatus[thisFilesIndex] = {
            fileStored: {
                id: responseFile.id,
                fileName: supportingFilesStatus[thisFilesIndex].uploadInProgress.fileName,
            },
        };
        setSupportingFilesStatus(supportingFilesStatus);
        if (thisFilesIndex === supportingFilesStatus.length - 1) {
            setSupportingUploadDisabled(false);
        }
    };
    const onSupportingUploadError = (file: { file: File; id: string }): void => {
        const thisFilesIndex = supportingFilesStatus.findIndex(
            (state: FileState) => state.uploadInProgress && state.uploadInProgress.id === file.id,
        );
        const stateClone = [...supportingFilesStatus];
        stateClone[thisFilesIndex].error = 'server';
        setSupportingFilesStatus(stateClone);
    };

    useEffect(() => {
        if (!files.length) return;

        if (index < files.length) {
            uploadSupportingFile({
                variables: {
                    id: initialValues.id,
                    file: files[index].file,
                    fileSize: files[index].file.size,
                },
            })
                .then(data => {
                    setIndex(index + 1);
                    onSupportingUploadSuccess(files[index], data);
                })
                .catch(() => {
                    setIndex(index + 1);
                    onSupportingUploadError(files[index]);
                });
        } else {
            setFiles([]);
            setIndex(0);
        }
    }, [index, files]);

    const onSupportingFilesUpload = (filesList: FileList): void => {
        const filesListArray = Array.prototype.slice.call(filesList);

        // disable upload while uploading
        setSupportingUploadDisabled(true);

        let trimmedFilesArray = filesListArray;
        if (filesListArray.length + filesStoredCount > maxSupportingFiles) {
            trimmedFilesArray = filesListArray.slice(0, maxSupportingFiles - filesStoredCount);
        }

        const filesToStore = trimmedFilesArray.map((file: File) => ({
            file,
            id: v4(),
        }));

        const newSupportingFilesStatus = [
            ...supportingFilesStatus,
            ...filesToStore.map((fileToStore: { file: File; id: string }) => ({
                uploadInProgress: {
                    progress: 0,
                    fileName: fileToStore.file.name,
                    id: fileToStore.id,
                },
            })),
        ];
        setSupportingFilesStatus(newSupportingFilesStatus);
        setFiles(filesToStore);
    };

    const deleteSupportingFileCallback = async (fileId: string): Promise<string> => {
        const stringExecutionResult = await deleteSupportingFile({
            variables: { fileId: fileId, submissionId: initialValues.id },
        });
        return stringExecutionResult.data;
    };

    return [
        onSupportingFilesUpload,
        deleteSupportingFileCallback,
        supportingFilesStatus,
        supportingUploadDisabled,
        filesStoredCount,
    ];
};

export default hook;
