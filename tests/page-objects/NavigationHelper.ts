import {
    AuthorDetailsPage,
    DashboardPage,
    DetailsPage,
    DisclosurePage,
    EditorPage,
    FilesPage,
    LoginPage,
    SurveyPage,
} from '.';

export class NavigationHelper {
    public async navigateToDashboard(): Promise<void> {
        const loginPage = new LoginPage();
        await loginPage.assertOnPage();
        await loginPage.login();
        const dashboardPage = new DashboardPage();
        await dashboardPage.assertOnPage();
    }

    public async navigateToAuthorPage(): Promise<void> {
        await this.navigateToDashboard();
        const dashboardPage = new DashboardPage();
        await dashboardPage.newSubmission('Feature Article');
        const authorPage = new AuthorDetailsPage();
        await authorPage.assertOnPage();
    }

    public async navigateToFilesPage(): Promise<void> {
        await this.navigateToAuthorPage();
        const authorPage = new AuthorDetailsPage();
        await authorPage.populateForm();
        await authorPage.next();
        const filesPage = new FilesPage();
        await filesPage.assertOnPage();
    }

    public async navigateToDetailsPage(): Promise<void> {
        await this.navigateToFilesPage();
        const filesPage = new FilesPage();
        await filesPage.populateForm();
        await filesPage.next();
        const detailsPage = new DetailsPage();
        await detailsPage.assertOnPage();
    }

    public async navigateToEditorsPage(): Promise<void> {
        await this.navigateToDetailsPage();
        const detailsPage = new DetailsPage();
        await detailsPage.populateForm();
        await detailsPage.next();
        const editorPage = new EditorPage();
        await editorPage.assertOnPage();
    }

    public async navigateToDisclosurePage(): Promise<void> {
        await this.navigateToEditorsPage();
        const editorPage = new EditorPage();
        await editorPage.populateForm();
        await editorPage.next();
        const disclosurePage = new DisclosurePage();
        await disclosurePage.assertOnPage();
    }

    public async navigateToSurveyPage(): Promise<void> {
        await this.navigateToDisclosurePage();
        const disclosurePage = new DisclosurePage();
        await disclosurePage.populateForm();
        await disclosurePage.submit();
        const surveyPage = new SurveyPage();
        await surveyPage.assertOnPage();
    }
}