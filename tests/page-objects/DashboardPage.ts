const dashboardCommands = {
    onPage: async function(): Promise<void> {
        return this.waitForElementVisible('@newSubmissionsButton', 10000)
            .assert.containsText('@newSubmissionsButton', 'NEW SUBMISSION')
            .assert.containsText('@menuLink', 'Dashboard');
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
