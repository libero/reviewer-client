import { Selector, t } from 'testcafe';
import { hasError } from './formHelper';

export enum FileStatus {
    Success = 0,
    Uploading = 1,
    Error = 2,
}

interface DropzoneStatus {
    status: FileStatus;
    text: string;
    extraText: string;
}

interface SupportingFileStatus {
    status: FileStatus;
    filename: string;
}

export class FilesPage {
    private readonly stepWrapper = Selector('.files-step');
    private readonly coverLetterContainer = Selector('.cover-letter');
    private readonly coverLetterInput = Selector('.cover-letter__input');
    private readonly manuscriptInput = Selector('.file-upload__dropzone > input');
    private readonly supportingInput = Selector('.multifile-upload__input');
    private readonly manuscriptDropzone = Selector('.file-upload__dropzone');
    private readonly supportFilesList = Selector('.multifile-upload__upload-list-item');

    private stringToFileStatus(status: string): FileStatus {
        if (status == 'success' || status == 'complete') {
            return FileStatus.Success;
        } else if (status == 'error') {
            return FileStatus.Error;
        } else if (status == 'uploading') {
            return FileStatus.Uploading;
        }
        throw new Error(`${status} this value is an unknown file status!`);
    }

    public async assertOnPage(): Promise<void> {
        await t.expect(this.stepWrapper.visible).ok();
    }

    public async fillCoverLetterInput(
        value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    ): Promise<void> {
        await t.typeText(this.coverLetterInput, value);
    }

    public async getManuscriptDropzoneStatus(): Promise<DropzoneStatus> {
        const iconClassPrefix = 'upload-progress__icon--';
        const iconSVGClasses = await this.manuscriptDropzone.find('svg').classNames;
        const status = this.stringToFileStatus(
            iconSVGClasses.find(value => value.includes(iconClassPrefix)).split(iconClassPrefix)[1],
        );
        const text = await this.manuscriptDropzone.find('.file-upload__description').textContent;
        const extraText = await this.manuscriptDropzone.find('.file-upload__extra').textContent;

        return {
            status,
            text,
            extraText
        };
    }

    public async getSupportingFilesStatus(): Promise<SupportingFileStatus[]> {
        const fileItems = await this.supportFilesList.count;
        const result: SupportingFileStatus[] = [];
        const progressClassPrefix = 'upload-progress--';

        for (let i = 0; i < fileItems; i++) {
            const supportingFile = this.supportFilesList.nth(i);
            const progress = await supportingFile.find('.upload-progress').classNames;
            const status = this.stringToFileStatus(
                progress.find(value => value.includes(progressClassPrefix)).split(progressClassPrefix)[1],
            );

            const filename = await supportingFile.find('span').textContent;

            result.push({
                status,
                filename,
            });
        }
        return result;
    }

    public async uploadManuscriptFile(filePath: string): Promise<void> {
        await t.setFilesToUpload(this.manuscriptInput, filePath);
    }

    public async uploadSupportingFiles(filesPath: string[]): Promise<void> {
        await t.setFilesToUpload(this.supportingInput, filesPath);
        console.log('waiting for uploads');
        await this.waitForUploads();
    }

    public async waitForUploads(retries = 0): Promise<void> {
        const statuses = await this.getSupportingFilesStatus();
        const uploaded = statuses.every(status => status.status === FileStatus.Success);
        console.log('uploaded', uploaded);
        if (!uploaded && retries < 50) {
            console.log('retries', retries);
            await t.wait(100);
            await this.waitForUploads(retries++);
        } else if (!uploaded) {
            throw new Error('failed to upload in 5 seconds');
        }
    }

    public async deleteSupportingFile(index: number): Promise<void> {
        const supportingFiles = await this.supportFilesList;
        const initialCount = await supportingFiles.count;
        const supportingFile = await supportingFiles.nth(index);
        const icon = await supportingFile.find('.multifile-upload__delete');
        const status = await this.getSupportingFilesStatus();
        await t.expect(status.every(st => st.status !== FileStatus.Uploading)).ok();
        await t.debug();
        await t.click(icon);
        await t.wait(200);
        const expected = await Selector('.multifile-upload__upload-list-item').count;
        await t.expect(initialCount).gt(expected);
    }

    public async fillAndProceed(): Promise<void> {
        // await this.fillCoverLetterInput();
        // await t.expect(await hasError(this.coverLetterContainer)).notOk();
        await this.uploadManuscriptFile('../test-data/dummy-manuscript.docx');
        const dropzoneStatus = await this.getManuscriptDropzoneStatus();
        await t.expect(dropzoneStatus).eql({
            status: FileStatus.Success,
            text: 'Done! Preview or Replace your manuscript file.',
            extraText: 'dummy-manuscript.docx',
        });
    }
}
