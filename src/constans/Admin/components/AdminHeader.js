import React from 'react';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../../../components/common/Avatar';

const AdminHeader = () => {
    const avatarImg = localStorage.getItem('img');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/signin');
    };

    return (
        <header className="py-2 admin-header__management border-bottom">
            <div className="custom-page__container-management">
                <nav className="d-flex justify-content-between align-items-center">
                    <Link to={'/admin'} className="admin-header__logo-text">
                        Food <span className="text-green">Recipes</span>
                    </Link>
                    <Avatar imgSrc={avatarImg || ''} onClick={handleLogout} />
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;
