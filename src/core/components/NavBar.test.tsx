import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import routerWrapper from '../../../test-utils/routerWrapper';
import NavBar from './NavBar';
import * as AppContext from '../providers/AppProvider';

const expectedMenuItems = [
    {
        display: 'navbar.dashboard',
        url: '/',
    },
    {
        display: 'navbar.author-guide',
        url: '/author-guide',
    },
    {
        display: 'navbar.reviewer-guide',
        url: '/reviewer-guide',
    },
    {
        display: 'navbar.contact-us',
        url: '/contact-us',
    },
];

jest.mock('@apollo/react-hooks', () => ({
    useQuery: (): object => {
        return {
            data: {
                getCurrentUser: {
                    name: 'Blogs, Joe',
                    email: 'joe@blogs.com',
                    aff: 'somewhere',
                },
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

    it('should render a menu with expected items', (): void => {
        jest.spyOn(AppContext, 'useAppContext').mockImplementation(() => ({
            isAuthenticated: true,
        }));
        const { container } = render(<NavBar />, {
            wrapper: routerWrapper(),
        });
        for (const item of expectedMenuItems) {
            const element = container.querySelector('.menu__link[href="' + item.url + '"]');
            expect(element).toBeInTheDocument();
            expect(element.textContent).toBe(item.display);
        }
    });
    it('should render a burger menu with expected items', (): void => {
        jest.spyOn(AppContext, 'useAppContext').mockImplementation(() => ({
            isAuthenticated: true,
        }));
        const { container } = render(<NavBar />, {
            wrapper: routerWrapper(),
        });
        fireEvent.click(container.querySelector('.burger_menu button'));

        for (const item of expectedMenuItems) {
            const element = container.querySelector('.burger_menu__link[href="' + item.url + '"]');
            expect(element).toBeInTheDocument();
            expect(element.textContent).toBe(item.display);
        }
    });
});
