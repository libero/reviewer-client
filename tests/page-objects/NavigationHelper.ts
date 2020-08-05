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

    public async navigateToFilesPage(complete: boolean = false): Promise<void> {
        await this.navigateToAuthorPage();
        const authorPage = new AuthorDetailsPage();
        if (complete) {
            await authorPage.populateAllFields();
        } else {
            await authorPage.populateMinimalFields();
        }
        await authorPage.next();
        const filesPage = new FilesPage();
        await filesPage.assertOnPage();
    }

    public async navigateToDetailsPage(complete: boolean = false): Promise<void> {
        await this.navigateToFilesPage(complete);
        const filesPage = new FilesPage();
        if (complete) {
            await filesPage.populateAllFields();
        } else {
            await filesPage.populateMinimalFields();
        }
        await filesPage.next();
        const detailsPage = new DetailsPage();
        await detailsPage.assertOnPage();
    }

    public async navigateToEditorsPage(complete: boolean = false): Promise<void> {
        await this.navigateToDetailsPage(complete);
        const detailsPage = new DetailsPage();
        if (complete) {
            await detailsPage.populateAllFields();
        } else {
            await detailsPage.populateMinimalFields();
        }
        await detailsPage.next();
        const editorPage = new EditorPage();
        await editorPage.assertOnPage();
    }

    public async navigateToDisclosurePage(complete: boolean = false): Promise<void> {
        await this.navigateToEditorsPage(complete);
        const editorPage = new EditorPage();
        if (complete) {
            await editorPage.populateAllFields();
        } else {
            await editorPage.populateMinimalFields();
        }
        await editorPage.next();
        const disclosurePage = new DisclosurePage();
        await disclosurePage.assertOnPage();
    }

    public async navigateToSurveyPage(complete: boolean = false): Promise<void> {
        await this.navigateToDisclosurePage(complete);
        const disclosurePage = new DisclosurePage();
        if (complete) {
            await disclosurePage.populateAllFields();
        } else {
            await disclosurePage.populateMinimalFields();
        }
        await disclosurePage.submit();
        const surveyPage = new SurveyPage();
        await surveyPage.assertOnPage();
    }
}