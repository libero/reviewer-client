import { waitForReact } from 'testcafe-react-selectors';

import { NavigationHelper, SurveyPage } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';

fixture`Happy Path`.page`${BASE_URL}`.beforeEach(async () => {
    await waitForReact();
});

test('Happy path', async () => {
    const navigationHelper = new NavigationHelper();
    const surveyPage = new SurveyPage();
    await navigationHelper.navigateToSurveyPage();
    await surveyPage.populateForm();
});
