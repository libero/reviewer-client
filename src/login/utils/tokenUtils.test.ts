import { getTokenFromUrl } from './tokenUtils';

describe('getTokenFromUrl', (): void => {
    const { location } = window;

    afterAll(() => {
        window.location = location;
    });
    it('it extracts a token if there is one', (): void => {
        delete window.location;
        window.location = { search: 'http://foo.com/bar?token=someToken' } as Location;
        expect(getTokenFromUrl()).toBe('someToken');
    });
    it('returns null if no token param', (): void => {
        delete window.location;
        window.location = { search: 'http://foo.com/bar' } as Location;
        expect(getTokenFromUrl()).toBeNull();
    });
});
