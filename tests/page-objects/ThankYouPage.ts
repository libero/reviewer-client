import { Selector, t } from 'testcafe';

export class ThankYouPage {
	private readonly pageWrapper: Selector = Selector('.thank-you-page-step');
	private readonly finishButton: Selector = Selector('.button.button--primary');

	public async assertOnPage(): Promise<void> {
		await t.expect(this.pageWrapper.exists).ok();
        await t.expect(this.pageWrapper.visible).ok();
	}
	
	public async finish(): Promise<void> {
		await t.click(this.finishButton);
	}
}
