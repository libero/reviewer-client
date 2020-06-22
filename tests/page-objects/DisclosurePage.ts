import { Selector, t } from 'testcafe';

export class DisclosurePage {
    private readonly disclosureStep = Selector('.disclosure-step');
    private readonly submitterSignature = Selector('#submitterSignature');
    private readonly disclosureConsent = Selector('#disclosureConsent');
    private readonly modalOverlay = Selector('.modal__overlay');
    private readonly modalAcceptButton = Selector('.modal__buttons button__primary');
    private readonly nextButton = Selector('.submission-wizard-next-button');
    private readonly backButton = Selector('.submission-wizard-back-button');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.disclosureStep.visible).ok();
    }

    async populateForm(): Promise<void> {
        await this.setSubmitterSignature();
        const currentConsent = await this.getDisclosureConsent();
        if (!currentConsent) {
            await this.toggleDisclosureConsent();
        }
        this.submit();
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
        return !!this.disclosureConsent.value;
    }

    public async submit(): Promise<void> {
        await this.next();
        await t.expect(this.modalOverlay.visible).ok();
        await t.click(this.modalAcceptButton);
    }

    public async next(): Promise<void> {
        await t.expect(this.nextButton.visible).ok();
        await t.click(this.nextButton);
    }

    public async back(): Promise<void> {
        await t.expect(this.backButton.visible).ok();
        await t.click(this.backButton);
    }
}
