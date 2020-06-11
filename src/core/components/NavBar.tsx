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

const menuItems = [
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

const NavBar = (): JSX.Element => {
    const { data: authQuery = { isAuthenticated: false } } = useQuery(isUserAuthenticatedQuery);
    const { loading, data } = useQuery<GetCurrentUser>(getCurrentUserQuery, { skip: !authQuery.isAuthenticated });

    if (!data) {
        return (
            <AppBar>
                <AppBarIcon imgSrc={Logo} link="/" altText="eLife logo" />
            </AppBar>
        );
    }
    return (
        <AppBar>
            <BurgerMenu items={menuItems} />
            <AppBarIcon imgSrc={Logo} link="/" altText="eLife logo" />
            <Menu items={menuItems} />
            <ProfileDropdown user={loading ? null : data.getCurrentUser} />
        </AppBar>
    );
};

export default NavBar;
