import { Selector, t } from 'testcafe';

class DashboardPage {
    private newSubmissionButton: Selector;
    private menuHeader: Selector;

    constructor() {
        this.menuHeader = Selector('.menu__link--active');
        this.newSubmissionButton = Selector('.dashboard__button_container');
    }

    async onPage(): Promise<void> {
        await t.expect(this.menuHeader.innerText).eql('Dashboard');
        await t.expect(this.newSubmissionButton.visible).ok();
    }
}

export default new DashboardPage();
