import { Selector } from 'testcafe';

fixture`Getting Started`.page`http://localhost:9000`;

test('My first test', async t => {
    await t.expect(Selector('.button--orcid').visible).ok();
});
