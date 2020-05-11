import { Selector, t } from 'testcafe';

export class DetailsPage {
    private readonly titleInput = Selector('#title');
    private readonly subjectsInput = Selector('#subjects');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.titleInput.visible).ok();
        await t.expect(this.subjectsInput.visible).ok();
    }

}
