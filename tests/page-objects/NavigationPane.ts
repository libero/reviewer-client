import { Selector, t } from 'testcafe';

export class NavigationPane {

    private readonly iconLink = Selector('.app-bar__icon-link');
    private readonly burgerMenu = Selector('.burger_menu');
    private readonly burgerMenuButton = Selector('.burger_menu__icon_button');
    private readonly burgerMenuContent = Selector('.burger_menu__overlay')
    private readonly profileDropdown = Selector('.profile_dropdown')

    public async assertOnPage(): Promise<void> {
        await t.expect(this.iconLink.visible).ok();
        await t.expect(this.burgerMenu.visible).notOk();
        await t.expect(this.burgerMenuContent.visible).notOk();
        await t.expect(this.profileDropdown.visible).notOk();
    }

    public async assertOnPageAuthenticated(): Promise<void> {
        await t.expect(this.iconLink.visible).ok();
        await t.expect(this.burgerMenu.visible).ok();
        await t.expect(this.burgerMenuContent.visible).ok();
        await t.expect(this.profileDropdown.visible).ok();
    }
}
