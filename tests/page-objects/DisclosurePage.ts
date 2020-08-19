import { Selector, t } from 'testcafe';
import { clickNext } from './formHelper';

export class DisclosurePage {
    private readonly disclosureStep = Selector('.disclosure-step');
    private readonly submitterSignature = Selector('#submitterSignature');
    private readonly disclosureConsent = Selector('#disclosureConsent');
    private readonly modalOverlay = Selector('.modal__overlay');
    private readonly modalAcceptButton = Selector('.modal__buttons .button--primary');
    private readonly nextButton = Selector('.submission-wizard-next-button');
    private readonly backButton = Selector('.submission-wizard-back-button');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.disclosureStep.exists).ok();
        await t.expect(this.disclosureStep.visible).ok();
    }

    public async populateAllFields(): Promise<void> {
        await this.populateMinimalFields();
    }

    public async assertPopulatedValues(values = { signature: 'Bob Ross', consent: true }): Promise<void> {
        await t.expect(this.submitterSignature.value).eql(values.signature);
        await t.expect(this.disclosureConsent.checked).eql(values.consent);
    }

    async populateMinimalFields(): Promise<void> {
        await this.setSubmitterSignature();
        const currentConsent = await this.getDisclosureConsent();
        if (!currentConsent) {
            await this.toggleDisclosureConsent();
        }
    }

    public async setSubmitterSignature(input = 'Bob Ross'): Promise<void> {
        await t.expect(this.submitterSignature.visible).ok();
        await t.typeText(this.submitterSignature, input);
        await t.expect(this.submitterSignature.value).eql(input);
    }

    public async getSubmitterSignature(): Promise<string> {
        return await this.submitterSignature.value;
    }

    public async toggleDisclosureConsent(): Promise<void> {
        await t.expect(this.disclosureConsent.visible).ok();
        await t.click(this.disclosureConsent);
    }

    public async getDisclosureConsent(): Promise<boolean> {
        return this.disclosureConsent.checked;
    }

    public async submit(): Promise<void> {
        await this.next();
        await t.expect(this.modalOverlay.visible).ok();
        await t.expect(this.modalAcceptButton.visible).ok();
        await t.click(this.modalAcceptButton);
        // todo: can an assert suggest this page no longer exists?
    }

    public async next(): Promise<void> {
        await t.expect(this.nextButton.visible).ok();
        await clickNext();
    }

    public async back(): Promise<void> {
        await t.expect(this.backButton.visible).ok();
        await t.click(this.backButton);
        await t.expect(this.disclosureStep.exists).notOk({ timeout: 5000 });
    }
}
