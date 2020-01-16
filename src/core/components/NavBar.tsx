import React from 'react';
import { AppBar, AppBarIcon } from '../../ui/atoms';
import { ProfileDropdown, Menu, BurgerMenu } from '../../ui/molecules';
import { useQuery } from '@apollo/react-hooks';
import { getCurrentUserQuery } from '../graphql';
import Logo from '../assets/elife-logo.png';
import * as Auth from '../utils/auth';

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

const NavBar: React.FC = (): JSX.Element => {
    if (!Auth.isAuthenticated()) {
        return (
            <AppBar>
                <AppBarIcon imgSrc={Logo} link="/" altText="eLife logo" />
            </AppBar>
        );
    }
    const { loading, data } = useQuery(getCurrentUserQuery);
    return (
        <AppBar>
            <BurgerMenu items={menuItems} />
            <AppBarIcon imgSrc={Logo} link="/" altText="eLife logo" />
            <Menu items={menuItems} />
            <ProfileDropdown
                name={loading ? 'Loading' : data.getCurrentUser.name}
                role={loading ? 'Loading' : data.getCurrentUser.role}
            />
        </AppBar>
    );
};

export default NavBar;
