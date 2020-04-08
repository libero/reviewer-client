// This script is ran before the tests begin.

//required to set global fetch for testing ApolloClient
import 'whatwg-fetch';
// give us extra assertion options on jests expect
import '@testing-library/jest-dom/extend-expect';
import I18n from '../src/core/utils/i18n';

//for testing react-hook-form see: https://react-hook-form.com/faqs#TestingfailedduetoMutationObserver
import 'mutationobserver-shim';

const jestDom = require('@testing-library/jest-dom');
expect.extend({...jestDom});
