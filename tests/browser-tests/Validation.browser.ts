import {
    AuthorDetailsPage,
    DetailsPage, DisclosurePage,
    EditorPage,
    FilesPage,
    NavigationHelper,
    ValidationHelper,
} from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';

fixture`Validation`.page`${BASE_URL}`;

test('author page', async () => {
    const navigationHelper = new NavigationHelper();
    await navigationHelper.navigateToAuthorPage();
    const authorDetailsPage = new AuthorDetailsPage();
    await authorDetailsPage.assertOnPage();
    await authorDetailsPage.next(true);
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
    await filesPage.next(true);
    await filesPage.assertManuscriptUploadError('Please upload a manuscript');
    await filesPage.populateMinimalFields();
});

test('details page', async () => {
    const navigationHelper = new NavigationHelper();
    await navigationHelper.navigateToDetailsPage(false, 'Research Article');
    const detailsPage = new DetailsPage();
    await detailsPage.assertOnPage();
    await detailsPage.clearTitle();
    await detailsPage.togglePreviouslyConsidered();
    await detailsPage.togglePreviouslyDiscussed();
    await detailsPage.toggleCosubmission();
    await detailsPage.next(true);
    const validationHelper = new ValidationHelper();
    await validationHelper.assertNumberOfErrors(5);
    await validationHelper.assertErrorMessage('.expanding-text-field', 'Title is required');
    await validationHelper.assertErrorMessage('.subject-area', 'Subject area(s) required');
    await validationHelper.assertErrorMessage(
        '.multiline-text-field:first-child',
        'Please describe your previous interaction',
    );
    await validationHelper.assertErrorMessage('.expanding-text-field', 'Title is required');
    await validationHelper.assertErrorMessage('.text-field', 'Article title is required');
    await detailsPage.togglePreviouslyConsidered();
    await detailsPage.togglePreviouslyDiscussed();
    await detailsPage.toggleCosubmission();
    await detailsPage.populateAllFields();
    await validationHelper.assertNumberOfErrors(0);
});

test('editors page', async () => {
    const navigationHelper = new NavigationHelper();
    await navigationHelper.navigateToEditorsPage(false, 'Research Article');
    const editorsPage = new EditorPage();
    await editorsPage.assertOnPage();
    await editorsPage.next(true);
    const validationHelper = new ValidationHelper();
    await validationHelper.assertNumberOfErrors(2);
    await validationHelper.assertErrorMessage('.senior-editors-picker', 'Please suggest at least 2 editors');
    await validationHelper.assertErrorMessage('.reviewing-editors-picker', 'Please suggest at least 2 editors');
    await editorsPage.populateMinimalFields();
    await validationHelper.assertNumberOfErrors(0);
});

test('disclosure page', async () => {
    const navigationHelper = new NavigationHelper();
    await navigationHelper.navigateToDisclosurePage(false, 'Research Article');
    const disclosurePage = new DisclosurePage();
    await disclosurePage.assertOnPage();
    await disclosurePage.next();
    const validationHelper = new ValidationHelper();
    await validationHelper.assertNumberOfErrors(2);
    await validationHelper.assertErrorMessage('.text-field', 'Please enter your name to acknowledge this statement');
    await validationHelper.assertErrorMessage('.disclosure__consent', 'We are unable to proceed without this consent');
    await disclosurePage.populateMinimalFields();
    await validationHelper.assertNumberOfErrors(0);
});
