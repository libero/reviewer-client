import { Selector, t } from 'testcafe';
import { hasError } from './formHelper';

interface DropzoneStatus {
    status: string;
    text: string;
    extraText: string;
}

export class FilesPage {
    private readonly stepWrapper = Selector('.files-step');
    private readonly coverLetterContainer = Selector('.cover-letter');
    private readonly coverLetterInput = Selector('.cover-letter__input');
    private readonly manuscriptInput = Selector('.file-upload__dropzone > input');
    private readonly manuscriptDropzone = Selector('.file-upload__dropzone');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.stepWrapper.visible).ok();
    }

    public async fillCoverLetterInput(
        value = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    ): Promise<void> {
        await t.typeText(this.coverLetterInput, value);
    }

    public async getManuscriptDropzoneStatus(): Promise<DropzoneStatus> {
        const dropzoneStatus: DropzoneStatus = {
            status: '',
            text: '',
            extraText: '',
        };

        const iconClassPrefix = 'upload-progress__icon--';
        const iconSVGClasses = await this.manuscriptDropzone.find('svg').classNames;
        dropzoneStatus.status = iconSVGClasses
            .find(value => value.includes(iconClassPrefix))
            .split('upload-progress__icon--')[1];
        dropzoneStatus.text = await this.manuscriptDropzone.find('.file-upload__description').textContent;
        dropzoneStatus.extraText = await this.manuscriptDropzone.find('.file-upload__extra').textContent;

        return dropzoneStatus;
    }

    public async uploadManuscriptFile(filePath: string): Promise<void> {
        await t.setFilesToUpload(this.manuscriptInput, filePath);
    }

    public async fillAndProceed(): Promise<void> {
        await this.fillCoverLetterInput();
        await t.expect(await hasError(this.coverLetterContainer)).notOk();
        await this.uploadManuscriptFile('../test-data/dummy-manuscript.docx');
        const dropzoneStatus = await this.getManuscriptDropzoneStatus();
        await t.expect(dropzoneStatus).eql({
            status: 'success',
            text: 'Done! Preview or Replace your manuscript file.',
            extraText: 'dummy-manuscript.docx',
        });
    }
}
