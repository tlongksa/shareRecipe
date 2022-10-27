import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

export const links = [
    {
        to: '/admin/accounts',
        label: 'Quản lí tài khoản',
    },
    {
        to: '/admin/recipes',
        label: 'Quản lí công thức',
    },
    {
        to: '/admin/blogs',
        label: 'Quản lí blog',
    },
    {
        to: '/admin/reports',
        label: 'Quản lí report',
    },
];

const AdminSubMenu = ({ isShowMenu }) => {
    return (
        <ul className={`admin-submenu shadow rounded-3 ${isShowMenu ? 'show' : ''}`}>
            {links.map(({ to, label }) => (
                <li key={to} className="admin-submenu__item">
                    <NavLink to={to}>{label}</NavLink>
                </li>
            ))}
        </ul>
    );
};

export default AdminSubMenu;
