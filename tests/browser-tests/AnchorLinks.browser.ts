import { BASE_URL } from '../../test-utils/baseUrl';
import { ClientFunction, Selector, t } from 'testcafe';

fixture`AnchorLinks`.page`${BASE_URL}`;

const getWindowScollY = ClientFunction(() => window.scrollY);

test('No anchor, defaults to top of page', async () => {
    await t.navigateTo('/author-guide/journal-policies');
    await t.wait(500); // Wait, so the useScrollToAnchor hook has run.
    await t.expect(getWindowScollY()).eql(0);
});

test('With anchor, scrolls the section into view', async () => {
    await t.navigateTo('/author-guide/journal-policies#name-change');
    await t.wait(500); // Wait, so the useScrollToAnchor hook has run.
    const elementOffsetTop = await Selector('#name-change').offsetTop;
    await t.expect(getWindowScollY()).eql(elementOffsetTop);
});

test('Clicking an anchor link scrolls the section into view', async () => {
  await t.navigateTo('/author-guide/journal-policies');
  await t.wait(500); // Wait, so the useScrollToAnchor hook has run.
  await t.click('a[href=\'#author-identification\']');
  const elementOffsetTop = await Selector('#author-identification').offsetTop;
  await t.expect(getWindowScollY()).eql(elementOffsetTop);
});