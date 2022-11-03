import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

export const links = [
    {
        to: '/admin/accounts',
        label: 'Quản lí tài khoản',
    },
    {
        to: '/admin/recipe-categories',
        label: 'Quản lí thể loại',
    },
    {
        to: '/admin/recipes',
        label: 'Quản lí công thức',
    },
    {
        to: '/admin/approve-blogs',
        label: 'Phê duyệt blog',
    },
    {
        to: '/admin/blog-comment-reports',
        label: 'Quản lí report bình luận blog',
    },
    {
        to: '/admin/recipe-reports',
        label: 'Quản lý  cảnh báo bình luận  công  thức',
    },
];

const AdminSubMenu = ({ isShowMenu, setIsShowMenu }) => {
    return (
        <ul className={`admin-submenu shadow rounded-3 ${isShowMenu ? 'show' : ''}`}>
            {links.map(({ to, label }) => (
                <li key={to} className="admin-submenu__item" onClick={() => setIsShowMenu(false)}>
                    <NavLink to={to}>{label}</NavLink>
                </li>
            ))}
        </ul>
    );
};

export default AdminSubMenu;
