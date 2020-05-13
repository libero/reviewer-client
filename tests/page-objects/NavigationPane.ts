import { Selector, t } from 'testcafe';

export class NavigationPane {
    private readonly iconLink = Selector('.app-bar__icon-link');
    private readonly burgerMenuContainer = Selector('.burger_menu');
    private readonly burgerMenuButton = Selector('.burger_menu__icon_button');
    private readonly burgerMenuContent = Selector('.burger_menu__overlay');
    private readonly menu = Selector('.menu__list');
    private readonly profileDropdown = Selector('.profile_dropdown');

    public async assertOnPage(): Promise<void> {
        await t.expect(this.iconLink.visible).ok();
        await t.expect(this.burgerMenuContainer.visible).notOk();
        await t.expect(this.burgerMenuContent.visible).notOk();
        await t.expect(this.menu.visible).notOk();
        await t.expect(this.burgerMenuButton.visible).notOk();
        await t.expect(this.profileDropdown.visible).notOk();
    }

    public async assertOnPageAuthenticated(): Promise<void> {
        await t.expect(this.iconLink.visible).ok();
        await t.expect(this.menu.visible).ok();
        await t.expect(this.profileDropdown.visible).ok();
        // should only appear in responsive mode
        await t.expect(this.burgerMenuContainer.visible).notOk();
        await t.expect(this.burgerMenuContent.visible).notOk();
        await t.expect(this.burgerMenuButton.visible).notOk();
    }

    public async assertNavItems(): Promise<void> {
        await t.expect(this.menu.visible).ok();
        await t.expect(this.menu.child().count).eql(4);
        await t.expect(this.menu.child(0).innerText).eql('Dashboard');
        await t.expect(this.menu.child(0).innerText).eql('Author Guide');
        await t.expect(this.menu.child(0).innerText).eql('Reviewer Guide');
        await t.expect(this.menu.child(0).innerText).eql('Contact Us');
    }

    public async assertProfileDropDown(): Promise<void> {
        const profileSelector = this.profileDropdown.child('.profile_dropdown__panel');
        await t.expect(this.profileDropdown.visible).ok();
        await t.expect(profileSelector.visible).notOk();
        await t.click(this.profileDropdown.child('button'));
        await t.expect(profileSelector.visible).ok();
        await t.expect(profileSelector.child('.profile_dropdown__panel_heading').visible).ok();
        await t.expect(profileSelector.child('.profile_dropdown__list').child().count).eql(2);
        await t.expect(profileSelector.child('.profile_dropdown__list').child(0).textContent).eql('Manage ORCID');
        await t.expect(profileSelector.child('.profile_dropdown__list').child(1).textContent).eql('Logout');
    }

    public async logout(): Promise<void> {
        const profileSelector = this.profileDropdown.child('.profile_dropdown__panel');
        await t.expect(this.profileDropdown.visible).ok();
        await t.expect(profileSelector.visible).notOk();
        await t.click(this.profileDropdown.child('button'));
        await t.expect(profileSelector.visible).ok();
        await t.click(
            profileSelector
                .child('.profile_dropdown__list')
                .child('.profile_dropdown__list_item')
                .child('.profile_dropdown__link'),
        );
    }
}
