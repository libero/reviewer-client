// const { I } = inject();

module.exports = {
    fields: {
        menuHeader: '.menu__link--active',
        newSubmussionButton: '.dashboard__button_container',
    },

    onPage() {
        I.amOnPage('/');
        I.seeTextEquals('Dashboard', this.fields.menuHeader);
        I.seeElement(this.fields.newSubmussionButton);
    },
};
