import React from 'react';
import { AppBar, AppBarIcon } from '../../ui/atoms';
import { ProfileDropdown, Menu, BurgerMenu } from '../../ui/molecules';
import { useQuery } from '@apollo/react-hooks';
import { getCurrentUserQuery } from '../graphql';
import Logo from '../assets/elife-logo.svg';
import { User } from '../types';
import { isUserAuthenticatedQuery } from '../../core/graphql';

interface GetCurrentUser {
    getCurrentUser: User;
}

const staticMenuItems = [
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

const menuItems = [
    {
        display: 'common:navbar.dashboard',
        url: '/',
    },
    ...staticMenuItems,
];

const NavBar = (): JSX.Element => {
    const { data: authQuery = { isAuthenticated: false } } = useQuery(isUserAuthenticatedQuery);
    const { loading, data } = useQuery<GetCurrentUser>(getCurrentUserQuery, { skip: !authQuery.isAuthenticated });

    return (
        <AppBar>
            <BurgerMenu items={authQuery.isAuthenticated ? menuItems : staticMenuItems} />
            <AppBarIcon imgSrc={Logo} link="/" altText="eLife logo" />
            <Menu items={authQuery.isAuthenticated ? menuItems : staticMenuItems} />
            <ProfileDropdown user={loading ? null : data ? data.getCurrentUser : null} />
        </AppBar>
    );
};

export default NavBar;
