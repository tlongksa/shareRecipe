import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';
import userDarkIconImg from '../../../../assets/img/user_dark.png';
import fourRectangleIconImg from '../../../../assets/img/four_rectangle.png';
import chefIconImg from '../../../../assets/img/chef.png';
import blogIconImg from '../../../../assets/img/blog.png';
import sheetIconImg from '../../../../assets/img/sheet.png';
import analyticsIconImg from '../../../../assets/img/analytics.png';
import warningIconImg from '../../../../assets/img/warning.png';

export const links = [
    {
        to: '/admin/accounts',
        label: 'Quản lí tài khoản',
        imgIconSrc: userDarkIconImg,
    },
    {
        to: '/admin/recipe-categories',
        label: 'Quản lí thể loại',
        imgIconSrc: fourRectangleIconImg,
    },
    {
        to: '/admin/recipes',
        label: 'Quản lí công thức',
        imgIconSrc: chefIconImg,
    },
    {
        to: '/admin/approve-blogs',
        label: 'Phê duyệt blog',
        imgIconSrc: blogIconImg,
    },
    {
        to: '/admin/blog-comment-reports',
        label: 'Quản lí report bình luận blog',
        imgIconSrc: sheetIconImg,
    },
    {
        to: '/admin/recipe-comment-reports',
        label: 'Quản lý cảnh báo bình luận công thức',
        imgIconSrc: analyticsIconImg,
    },
    {
        to: '/admin/ingredient-reports',
        label: 'Quản lý cảnh báo nguyên liệu',
        imgIconSrc: warningIconImg,
    },
];

const AdminSubMenu = ({ isShowMenu, setIsShowMenu }) => {
    return (
        <ul className={`admin-submenu shadow rounded-3 ${isShowMenu ? 'show' : ''}`}>
            {links.map(({ to, label, imgIconSrc }) => (
                <li key={to} className="admin-submenu__item" onClick={() => setIsShowMenu(false)}>
                    <NavLink to={to} className="d-flex align-items-center gap-2">
                        <img src={imgIconSrc} alt="" />
                        <span>{label}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
};

export default AdminSubMenu;
