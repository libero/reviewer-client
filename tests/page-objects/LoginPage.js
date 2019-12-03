"use strict";
const loginCommands = {
    login: function () {
        return this.waitForElementVisible('@loginButton', 10000).click('@loginButton');
    },
};
module.exports = {
    commands: [loginCommands],
    url: 'http://localhost:9000',
    elements: {
        loginButton: {
            selector: '.button--orcid',
        },
    },
};
