import { Selector, t } from 'testcafe';
import { clickSelector } from './formHelper';

export class ThankYouPage {
	private readonly pageWrapper: Selector = Selector('.thank-you-page-step');
	private readonly finishButton = '.button.button--primary';

	public async assertOnPage(): Promise<void> {
		await t.expect(this.pageWrapper.exists).ok();
        await t.expect(this.pageWrapper.visible).ok();
	}
	
	public async finish(): Promise<void> {
		await clickSelector(this.finishButton);
		await t.wait(1000);
	}
}
