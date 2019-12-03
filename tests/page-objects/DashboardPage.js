"use strict";
const dashboardCommands = {
    onPage: function () {
        this.assert
            .containsText('.dashboard__button_container', 'NEW SUBMISSION')
            .assert.containsText('.menu__link--active', 'Dashboard');
    },
};
module.exports = {
    commands: [dashboardCommands],
    url: 'http://localhost:9000',
    elements: {
        newSubmissionsButton: {
            selector: '.dashboard__button_container',
        },
        menuLink: {
            selector: '.menu__link--active',
        },
    },
};
