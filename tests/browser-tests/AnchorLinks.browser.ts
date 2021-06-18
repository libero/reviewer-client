import { BASE_URL } from '../../test-utils/baseUrl';
import { ClientFunction, Selector, t } from 'testcafe';

fixture`AnchorLinks`.page`${BASE_URL}`;

const getWindowScollY = ClientFunction(() => window.scrollY);

test('No anchor, defaults to top of page', async () => {
    await t.navigateTo('/author-guide/journal-policies');
    await t.expect(getWindowScollY()).eql(0);
});

test('With anchor, scrolls element into view', async () => {
  await t.navigateTo('/author-guide/journal-policies#name-change');
  await t.wait(500);
  const elementOffsetTop = await Selector('#name-change').offsetTop;
  await t.expect(getWindowScollY()).eql(elementOffsetTop);
});
