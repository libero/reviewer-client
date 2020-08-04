import { waitForReact } from 'testcafe-react-selectors';

import {
    DashboardPage,
    FilesPage,
    LoginPage,
    AuthorDetailsPage,
    DetailsPage,
    NavigationPane,
    EditorPage,
    DisclosurePage,
    SurveyPage,
    StaticPage,
    ValidationHelper,
} from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';

fixture`Getting Started`.page`${BASE_URL}`.beforeEach(async () => {
    await waitForReact();
});

test('static pages', async () => {
    const navigationPane = new NavigationPane();
    await navigationPane.assertOnPage();
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    await navigationPane.navigateToAuthorGuide();
    const staticPage = new StaticPage();
    await staticPage.assertAuthorGuideLinks();
    await navigationPane.navigateToReviewerGuide();
    await staticPage.assertReviewerGuideLinks();
    await navigationPane.navigateToContactUs();
    await staticPage.assertContactUsLinks();
});

test('assert nav bar', async () => {
    const navigationPane = new NavigationPane();
    await navigationPane.assertOnPage();
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    await navigationPane.assertOnPageAuthenticated();
    await navigationPane.assertNavItems();
    await navigationPane.assertProfileDropDown();
    await navigationPane.navigateToAuthorGuide();
    await navigationPane.navigateToReviewerGuide();
    await navigationPane.navigateToContactUs();
    await navigationPane.navigateToDashboard();
    await navigationPane.assertUserName();
    await navigationPane.logout();
});

test('My first test', async () => {
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    const dashboardPage = new DashboardPage();
    await dashboardPage.assertOnPage();
});

test('Happy path', async () => {
    const navigationPane = new NavigationPane();
    await navigationPane.assertOnPage();
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    await navigationPane.assertOnPageAuthenticated();

    const dashboardPage = new DashboardPage();
    await dashboardPage.assertOnPage();
    await dashboardPage.newSubmission('Feature Article');

    const authorDetailsPage = new AuthorDetailsPage();
    await authorDetailsPage.assertOnPage();
    await authorDetailsPage.populateForm();
    await authorDetailsPage.next();

    const filesPage = new FilesPage();
    await filesPage.assertOnPage();
    await filesPage.populateForm();
    await filesPage.next();

    const detailsPage = new DetailsPage();
    await detailsPage.assertOnPage();
    await detailsPage.populateForm();
    await detailsPage.next();

    const editorPage = new EditorPage();
    await editorPage.assertOnPage();
    await editorPage.populateForm();
    await editorPage.next();

    const disclosurePage = new DisclosurePage();
    await disclosurePage.assertOnPage();
    await disclosurePage.populateForm();

    const surveyPage = new SurveyPage();
    await surveyPage.assertOnPage();
    await surveyPage.populateForm();
});

test('validation', async () => {
    const navigationPane = new NavigationPane();
    await navigationPane.assertOnPage();
    const loginPage = new LoginPage();
    await loginPage.assertOnPage();
    await loginPage.login();
    await navigationPane.assertOnPageAuthenticated();

    const dashboardPage = new DashboardPage();
    await dashboardPage.assertOnPage();
    await dashboardPage.newSubmission('Feature Article');

    const authorDetailsPage = new AuthorDetailsPage();
    await authorDetailsPage.assertOnPage();
    await authorDetailsPage.next();
    const validationHelper = new ValidationHelper();
    await validationHelper.assertNumberOfErrors(4);
    await validationHelper.assertErrorMessage('.author-step__firstName', 'First name is required');
    await validationHelper.assertErrorMessage('.author-step__lastName', 'Last name is required');
    await validationHelper.assertErrorMessage('.author-step__email', 'Email is required');
    await validationHelper.assertErrorMessage('.author-step__institution', 'Institution is required');
});
