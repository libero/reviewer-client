import { waitForReact } from 'testcafe-react-selectors';

import { NavigationHelper, SurveyPage } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';

fixture`Complete Path`.page`${BASE_URL}`.beforeEach(async () => {
    await waitForReact();
});

test('Complete Path', async () => {
    const navigationHelper = new NavigationHelper();
    const surveyPage = new SurveyPage();
    await navigationHelper.navigateToSurveyPage(true);
    await surveyPage.populateForm();
});
