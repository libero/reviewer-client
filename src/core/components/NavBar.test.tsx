import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import routerWrapper from '../../../test-utils/routerWrapper';
import NavBar from './NavBar';

const expectedMenuItems = [
    {
        display: 'common:navbar.dashboard',
        url: '/',
    },
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
