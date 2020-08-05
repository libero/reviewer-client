import { AuthorDetailsPage, NavigationHelper, ValidationHelper } from '../page-objects';
import { BASE_URL } from '../../test-utils/baseUrl';
import { waitForReact } from 'testcafe-react-selectors';

fixture`Validation`.page`${BASE_URL}`.beforeEach(async () => {
    await waitForReact();
});

test('validation', async () => {
    const navigationHelper = new NavigationHelper();
    await navigationHelper.navigateToAuthorPage();
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
