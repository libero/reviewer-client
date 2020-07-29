/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useMemo } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { v4 } from 'uuid';
import { uploadSupportingFileMutation, deleteSupportingFileMutation, getSubmissionQuery } from '../graphql';
import { FileState } from '../../ui/molecules/MultiFileUpload';
import { File as ReviewerFile, Submission, UploadInProgressData } from '../types';
import { ExecutionResult } from 'graphql';

const hook = (
    initialValues: Submission,
    maxSupportingFiles: number,
    maxFileSize: number,
    uploadProgressData: UploadInProgressData,
): [(fileList: FileList) => void, (fileId: string) => Promise<void>, FileState[], boolean, number] => {
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
        const thisFilesIndex = supportingFilesStatus.findIndex((state: FileState) => {
            if (state.uploadInProgress) {
                return state.uploadInProgress.id === file.id;
            }
            return false;
        });
        // patch previous value rather than overriding it completely.
        if (thisFilesIndex !== -1) {
            setSupportingFilesStatus(previous => {
                previous[thisFilesIndex] = {
                    fileStored: {
                        id: responseFile.id,
                        fileName: supportingFilesStatus[thisFilesIndex].uploadInProgress.fileName,
                    },
                };
                return previous;
            });
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
            setSupportingUploadDisabled(false);
            setFiles([]);
            setIndex(0);
        }
    }, [index, files]);

    useEffect(() => {
        if (
            uploadProgressData &&
            uploadProgressData.fileUploadProgress &&
            uploadProgressData.fileUploadProgress.type === 'SUPPORTING_FILE'
        ) {
            const progress = parseInt(uploadProgressData.fileUploadProgress.percentage, 10);
            const matchingIndex = supportingFilesStatus.findIndex(fileState => {
                if (fileState.uploadInProgress) {
                    return fileState.uploadInProgress.fileName === uploadProgressData.fileUploadProgress.filename;
                }
                return false;
            });
            if (matchingIndex !== -1) {
                const stateClone = [...supportingFilesStatus];
                stateClone[matchingIndex].uploadInProgress.progress = progress;
                setSupportingFilesStatus(stateClone);
            }
        }
    }, [uploadProgressData]);

    const onSupportingFilesUpload = (filesList: FileList): void => {
        const filesListArray = Array.prototype.slice.call(filesList);

        let trimmedFilesArray = filesListArray;
        if (filesListArray.length + filesStoredCount > maxSupportingFiles) {
            trimmedFilesArray = filesListArray.slice(0, maxSupportingFiles - filesStoredCount);
        }

        const filesToStore = trimmedFilesArray.map((file: File) => ({
            isValid: file.size < maxFileSize,
            file,
            id: `local-${v4()}`,
        }));

        const newSupportingFilesStatus = [
            ...supportingFilesStatus,
            ...filesToStore.map((fileToStore: { file: File; id: string; isValid: boolean }) => {
                const fileState: FileState = {
                    uploadInProgress: {
                        progress: null,
                        fileName: fileToStore.file.name,
                        id: fileToStore.id,
                    },
                };

                if (!fileToStore.isValid) {
                    fileState.error = 'validation';
                }

                return fileState;
            }),
        ];
        setSupportingFilesStatus(newSupportingFilesStatus);
        const filteredFilesToStore = filesToStore.filter((file: { isValid: boolean }) => file.isValid);
        if (filteredFilesToStore.length) {
            // disable upload while uploading
            setSupportingUploadDisabled(true);
            setFiles(filteredFilesToStore);
        }
    };

    const deleteSupportingFileCallback = async (fileId: string): Promise<void> => {
        if (fileId.includes('local-')) {
            const newSupportingFilesStatus = supportingFilesStatus.filter(
                (file: FileState) => file.fileStored || file.uploadInProgress.id !== fileId,
            );
            setSupportingFilesStatus(newSupportingFilesStatus);
            return;
        }
        await deleteSupportingFile({
            variables: { fileId: fileId, submissionId: initialValues.id },
        });
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
