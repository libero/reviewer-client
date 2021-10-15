import { NavigationHelper, SurveyPage, ThankYouPage, DashboardPage } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';
import { beforeEach } from '../../test-utils/beforeEach';

fixture`Happy Path`
    .page(BASE_URL)
    .meta('fixtureID', 'staging')
    .meta('umbrella', 'true')
    .beforeEach(beforeEach);

test('Happy path', async () => {
    const navigationHelper = new NavigationHelper();
    const surveyPage = new SurveyPage();
    const thankYouPage = new ThankYouPage();
    const dashboardPage = new DashboardPage();
    const submissionId = await navigationHelper.navigateToSurveyPage();
    await surveyPage.populateForm();
    await surveyPage.completeSurvey();
    await thankYouPage.assertOnPage();
    await thankYouPage.finish();
    await dashboardPage.assertOnPage();
    await dashboardPage.assertSubmissionStatus(submissionId, 'submitted');
});
