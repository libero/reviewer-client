const dashboardCommands = {
    onPage: async function(): Promise<void> {
        await this.waitForElementVisible('@newSubmissionsButton', 10000);
        await this.assert.containsText('@newSubmissionsButton', 'NEW SUBMISSION');
        await this.assert.containsText('@menuLink', 'Dashboard');
    },
};

export = {
    commands: [dashboardCommands],
    elements: {
        newSubmissionsButton: {
            selector: '.dashboard__button_container',
        },
        menuLink: {
            selector: '.menu__link--active',
        },
    },
};
