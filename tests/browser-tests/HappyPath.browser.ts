// import { waitForReact } from 'testcafe-react-selectors';

import { NavigationHelper, SurveyPage, ThankYouPage, DashboardPage } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';

fixture`Happy Path`.page`${BASE_URL}`;

// .beforeEach(async () => {
//     await waitForReact();
// });

test('Happy path', async () => {
    const navigationHelper = new NavigationHelper();
    const surveyPage = new SurveyPage();
    const thankYouPage = new ThankYouPage();
    const dashboardPage = new DashboardPage();
    const submissionId = await navigationHelper.navigateToSurveyPage();
    await surveyPage.populateForm();
    await surveyPage.skipOrFinish();
    await thankYouPage.assertOnPage();
    await thankYouPage.finish();
    await dashboardPage.assertOnPage();
    await dashboardPage.assertSubmissionStatus(submissionId, 'submitted');
});
