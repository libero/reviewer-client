import {
    AuthorDetailsPage,
    DetailsPage,
    EditorPage,
    FilesPage,
    NavigationHelper,
    ValidationHelper
} from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';
import { waitForReact } from 'testcafe-react-selectors';
import { t } from 'testcafe';

fixture`Validation`.page`${BASE_URL}`.beforeEach(async () => {
    await waitForReact();
});

test('author page', async () => {
    const navigationHelper = new NavigationHelper();
    await navigationHelper.navigateToAuthorPage();
    const authorDetailsPage = new AuthorDetailsPage();
    await authorDetailsPage.assertOnPage();
    await authorDetailsPage.next();
    const validationHelper = new ValidationHelper();
    await validationHelper.assertNumberOfErrors(4);
    await validationHelper.assertErrorMessage('.author-step__firstName', 'First name is required');
    await validationHelper.assertErrorMessage('.author-step__lastName', 'Last name is required');
    await validationHelper.assertErrorMessage('.author-step__email', 'Email is required');
    await validationHelper.assertErrorMessage('.author-step__institution', 'Institution is required');
    await authorDetailsPage.populateMinimalFields();
    await validationHelper.assertNumberOfErrors(0);
});

test('files page', async () => {
    const navigationHelper = new NavigationHelper();
    await navigationHelper.navigateToFilesPage();
    const filesPage = new FilesPage();
    await filesPage.assertOnPage();
    await filesPage.next();
    const validationHelper = new ValidationHelper();
    await validationHelper.assertNumberOfErrors(2);
    await validationHelper.assertErrorMessage('.cover-letter', 'Please write or paste in your cover letter');
    await validationHelper.assertErrorMessage('.file-upload', 'Please upload a manuscript');
    await filesPage.populateMinimalFields();
    await validationHelper.assertNumberOfErrors(0);
});

test.only('details page', async () => {
    const navigationHelper = new NavigationHelper();
    await navigationHelper.navigateToDetailsPage();
    const detailsPage = new DetailsPage();
    await detailsPage.assertOnPage();
    await detailsPage.clearTitle();
    await detailsPage.togglePreviouslyConsidered();
    await detailsPage.togglePreviouslyDiscussed();
    await detailsPage.toggleCosubmission();
    await detailsPage.next();
    await detailsPage.next();
    const validationHelper = new ValidationHelper();
    await t.debug();
    console.log(await validationHelper.getAllErrors());
    await validationHelper.assertNumberOfErrors(5);
    await validationHelper.assertErrorMessage('.expanding-text-field', 'Title is required');
    await validationHelper.assertErrorMessage('.subject-area', 'Subject area(s) required');
    await validationHelper.assertErrorMessage(
        '.multiline-text-field:first-child()',
        'Please describe your previous interaction',
    );
    await validationHelper.assertErrorMessage('.multiline-text-field:nth-child(2)', 'Article title is required');
    await validationHelper.assertErrorMessage('.text-field', 'Article title is required');
    await detailsPage.populateMinimalFields();
    await validationHelper.assertNumberOfErrors(0);
});

test.skip('editors page', async () => {
    const navigationHelper = new NavigationHelper();
    await navigationHelper.navigateToEditorsPage();
    const editorsPage = new EditorPage();
    await editorsPage.assertOnPage();
    await t.debug();
    await editorsPage.next();
    const validationHelper = new ValidationHelper();
    await validationHelper.assertNumberOfErrors(2);
    await validationHelper.assertErrorMessage('.senior-editors-picker', 'Please suggest at least 2 editors');
    await validationHelper.assertErrorMessage('.reviewing-editors-picker', 'Please suggest at least 2 editors');
    await editorsPage.populateMinimalFields();
    await validationHelper.assertNumberOfErrors(0);
});