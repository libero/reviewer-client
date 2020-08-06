import { Selector, t } from 'testcafe';
import { hasError } from './formHelper';

export enum FileStatus {
    Success = 0,
    Uploading = 1,
    Error = 2,
    Processing = 3,
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
    private readonly nextButton = Selector('.submission-wizard-next-button');
    private readonly stepWrapper = Selector('.files-step');
    private readonly coverLetterContainer = Selector('.cover-letter');
    private readonly coverLetterInput = Selector('.cover-letter__input .ProseMirror');
    private readonly manuscriptInput = Selector('.file-upload__dropzone > input');
    private readonly supportingInput = Selector('.multifile-upload__input');
    private readonly manuscriptDropzone = Selector('.file-upload__dropzone');
    private readonly manuscriptReplaceButton = Selector('.file-upload__description > button');
    private readonly supportFilesList = Selector('.multifile-upload__upload-list-item');

    private stringToFileStatus(status: string): FileStatus {
        if (status === 'success' || status === 'complete') {
            return FileStatus.Success;
        } else if (status === 'error') {
            return FileStatus.Error;
        } else if (status === 'uploading') {
            return FileStatus.Uploading;
        } else if (status === 'processing') {
            return FileStatus.Processing;
        }
        throw new Error(`${status} this value is an unknown file status!`);
    }

    public async assertOnPage(): Promise<void> {
        await t.expect(this.stepWrapper.visible).ok();
    }

    public async populateAllFields(): Promise<void> {
        await this.populateMinimalFields();
        await this.uploadSupportingFiles(Array(10).fill('../test-data/dummy-manuscript.docx'));
    }

    public async populateMinimalFields(): Promise<void> {
        await this.fillCoverLetterInput();
        await t.expect(await hasError(this.coverLetterContainer)).notOk();
        await this.uploadManuscriptFile('../test-data/dummy-manuscript.docx');
        const dropzoneStatus = await this.getManuscriptDropzoneStatus();
        await t.expect(dropzoneStatus).eql({
            status: FileStatus.Success,
            text: 'Done! Preview or Replace your manuscript file.',
            extraText: 'dummy-manuscript.docx',
        });
        await this.assertPopulatedValues();
    }

    // editablecontent component from prosemirror outputs spaces as nbsp characters so we need to parse to compare input to value
    private processProsemirrorTextContent(rawString: string): string {
        return unescape(escape(rawString).replace(/%A0/g, '%20'));
    }

    public async assertPopulatedValues(
        values = { coverLetter: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    ): Promise<void> {
        const coverLetterContent = await this.coverLetterInput.textContent;
        await t.expect(this.processProsemirrorTextContent(coverLetterContent)).eql(values.coverLetter);
    }

    public async fillCoverLetterInput(
        value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    ): Promise<void> {
        await t.typeText(this.coverLetterInput, value);
        // This is to allow the coverletter debounced onchange to be called.
        await t.wait(1000);
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
            extraText,
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
        await t.expect(await this.manuscriptReplaceButton.withText('Replace').visible).ok();
    }

    public async uploadSupportingFiles(filesPath: string[]): Promise<void> {
        await t.setFilesToUpload(this.supportingInput, filesPath);
        await this.waitForUploads();
    }

    public async waitForUploads(retries = 0): Promise<void> {
        const statuses = await this.getSupportingFilesStatus();
        const uploaded = statuses.every(status => status.status === FileStatus.Success);
        if (!uploaded && retries < 50) {
            await t.wait(100);
            await this.waitForUploads(retries + 1);
        } else if (!uploaded) {
            throw new Error('failed to upload in 5 seconds');
        }
    }

    public async deleteSupportingFile(index: number): Promise<void> {
        const supportingFiles = await this.supportFilesList;
        const initialCount = await supportingFiles.count;
        const supportingFile = await supportingFiles.nth(index);
        const icon = await supportingFile.find('.multifile-upload__delete');
        await t.click(icon);
        await t.expect(initialCount).gt(await this.supportFilesList.count);
    }

    public async next(): Promise<void> {
        await t.expect(this.nextButton.visible).ok();
        await t.click(this.nextButton);
    }
}
