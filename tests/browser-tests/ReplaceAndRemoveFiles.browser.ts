import { NavigationHelper, FilesPage } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';
import { sleep } from '../../test-utils/sleep';

fixture`Replace and remove files`
    .page(BASE_URL)
    .meta('fixtureID', 'staging')
    .beforeEach(async () => {
        await sleep(10000);
    });

test('Replace manuscript', async () => {
    const navigationHelper = new NavigationHelper();
    const filesPage = new FilesPage();
    await navigationHelper.navigateToFilesPage();
    await filesPage.uploadManuscriptFile('../test-data/dummy-manuscript.docx');
    await filesPage.assertManuscriptStored('dummy-manuscript.docx');
    await filesPage.uploadManuscriptFile('../test-data/dummy-manuscript2.pdf');
    await filesPage.assertManuscriptStored('dummy-manuscript2.pdf');
});

test('Remove supporting files', async () => {
    const navigationHelper = new NavigationHelper();
    const filesPage = new FilesPage();
    await navigationHelper.navigateToFilesPage();
    await filesPage.uploadSupportingFiles(['../test-data/dummy-manuscript.docx', '../test-data/supporting-file.docx']);
    await filesPage.assertSupportingFilesCount(2);
    await filesPage.assertSupportingFileExists('supporting-file.docx');
    await filesPage.assertSupportingFileExists('dummy-manuscript.docx');
    await filesPage.deleteSupportingFile(0);
    await filesPage.assertSupportingFilesCount(1);
    await filesPage.assertSupportingFileExists('supporting-file.docx');
    await filesPage.assertSupportingFileExists('dummy-manuscript.docx', false);
});
