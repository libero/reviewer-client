import { NavigationHelper, SurveyPage, ThankYouPage, DashboardPage } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';
import { beforeEach } from '../../test-utils/beforeEach';

fixture`Complete Path`.page(BASE_URL).beforeEach(beforeEach);

test('Complete Path', async () => {
    const navigationHelper = new NavigationHelper();
    const surveyPage = new SurveyPage();
    const thankYouPage = new ThankYouPage();
    const dashboardPage = new DashboardPage();
    const submissionId = await navigationHelper.navigateToSurveyPage(true);
    await surveyPage.populateForm();
    await surveyPage.completeSurvey();
    await thankYouPage.assertOnPage();
    await thankYouPage.finish();
    await dashboardPage.assertOnPage();
    await dashboardPage.assertSubmissionStatus(submissionId, 'submitted');
});
