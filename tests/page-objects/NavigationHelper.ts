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
import { ClientFunction } from 'testcafe';
import { ArticleType } from './DashboardPage';

export class NavigationHelper {
    private async getIdFromUrl(): Promise<string> {
        const getWindowLocation = ClientFunction(() => window.location);
        const location = await getWindowLocation();
        return location.href.split('/')[4];
    }
    public async navigateToDashboard(): Promise<void> {
        const loginPage = new LoginPage();
        await loginPage.assertOnPage();
        await loginPage.login();
        const dashboardPage = new DashboardPage();
        await dashboardPage.assertOnPage();
    }

    public async navigateToAuthorPage(articleType: ArticleType = 'Feature Article'): Promise<string> {
        await this.navigateToDashboard();
        const dashboardPage = new DashboardPage();
        await dashboardPage.newSubmission(articleType);
        const authorPage = new AuthorDetailsPage();
        await authorPage.assertOnPage();
        return this.getIdFromUrl();
    }

    public async navigateToFilesPage(complete = false, articleType: ArticleType = 'Feature Article'): Promise<string> {
        await this.navigateToAuthorPage(articleType);
        const authorPage = new AuthorDetailsPage();
        if (complete) {
            await authorPage.populateAllFields();
        } else {
            await authorPage.populateMinimalFields();
        }
        await authorPage.next();
        const filesPage = new FilesPage();
        await filesPage.assertOnPage();
        return this.getIdFromUrl();
    }

    public async navigateToDetailsPage(
        complete = false,
        articleType: ArticleType = 'Feature Article',
    ): Promise<string> {
        await this.navigateToFilesPage(complete, articleType);
        const filesPage = new FilesPage();
        if (complete) {
            await filesPage.populateAllFields();
        } else {
            await filesPage.populateMinimalFields();
        }
        await filesPage.next();
        const detailsPage = new DetailsPage();
        await detailsPage.assertOnPage();
        return this.getIdFromUrl();
    }

    public async navigateToEditorsPage(
        complete = false,
        articleType: ArticleType = 'Feature Article',
    ): Promise<string> {
        await this.navigateToDetailsPage(complete, articleType);
        const detailsPage = new DetailsPage();
        if (complete) {
            await detailsPage.populateAllFields();
        } else {
            await detailsPage.populateMinimalFields();
        }
        await detailsPage.next();
        const editorPage = new EditorPage();
        await editorPage.assertOnPage();
        return this.getIdFromUrl();
    }

    public async navigateToDisclosurePage(
        complete = false,
        articleType: ArticleType = 'Feature Article',
    ): Promise<string> {
        await this.navigateToEditorsPage(complete, articleType);
        const editorPage = new EditorPage();
        if (complete) {
            await editorPage.populateAllFields();
        } else {
            await editorPage.populateMinimalFields();
        }
        await editorPage.next();
        const disclosurePage = new DisclosurePage();
        await disclosurePage.assertOnPage();
        return this.getIdFromUrl();
    }

    public async navigateToSurveyPage(complete = false, articleType: ArticleType = 'Feature Article'): Promise<string> {
        await this.navigateToDisclosurePage(complete, articleType);
        const disclosurePage = new DisclosurePage();
        if (complete) {
            await disclosurePage.populateAllFields();
        } else {
            await disclosurePage.populateMinimalFields();
        }
        await disclosurePage.submit();
        const surveyPage = new SurveyPage();
        await surveyPage.assertOnPage();
        return this.getIdFromUrl();
    }
}
