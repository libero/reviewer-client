import '../../../test-utils/i18n-mock';
import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import routerWrapper from '../../../test-utils/routerWrapper';
import NavBar from './NavBar';

const expectedStaticMenuItems = [
    {
        display: 'common:navbar.author-guide',
        url: '/author-guide',
    },
    {
        display: 'common:navbar.reviewer-guide',
        url: '/reviewer-guide',
    },
    {
        display: 'common:navbar.contact-us',
        url: '/contact-us',
    },
];

const authenticatedExpectedMenuItems = [
    {
        display: 'common:navbar.dashboard',
        url: '/',
    },
    ...expectedStaticMenuItems,
];

let isAuthenticated = true;

jest.mock('@apollo/react-hooks', () => ({
    useQuery: (): object => {
        return {
            data: {
                getCurrentUser: {
                    name: 'Blogs, Joe',
                    email: 'joe@blogs.com',
                    aff: 'somewhere',
                },
                isAuthenticated: isAuthenticated,
            },
        };
    },
}));

describe('NavBar', (): void => {
    it('should render correctly', (): void => {
        expect(
            (): RenderResult =>
                render(<NavBar />, {
                    wrapper: routerWrapper(),
                }),
        ).not.toThrow();
    });

    it('should render a nonauthenticated menu with expected items', (): void => {
        isAuthenticated = true;
        const { container } = render(<NavBar />, {
            wrapper: routerWrapper(),
        });
        for (const item of expectedStaticMenuItems) {
            const element = container.querySelector('.menu__link[href="' + item.url + '"]');
            expect(element).toBeInTheDocument();
            expect(element.textContent).toBe(item.display);
        }
    });

    it('should render a menu with expected items', (): void => {
        const { container } = render(<NavBar />, {
            wrapper: routerWrapper(),
        });
        for (const item of authenticatedExpectedMenuItems) {
            const element = container.querySelector('.menu__link[href="' + item.url + '"]');
            expect(element).toBeInTheDocument();
            expect(element.textContent).toBe(item.display);
        }
    });
    it('should render a burger menu with expected items', (): void => {
        const { container } = render(<NavBar />, {
            wrapper: routerWrapper(),
        });
        fireEvent.click(container.querySelector('.burger_menu button'));

        for (const item of authenticatedExpectedMenuItems) {
            const element = container.querySelector('.burger_menu__link[href="' + item.url + '"]');
            expect(element).toBeInTheDocument();
            expect(element.textContent).toBe(item.display);
        }
    });
});
