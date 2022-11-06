import React, { useContext, useState } from 'react';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/auth-context';
import { NavMenuCenter, ProfileTogglerMenu } from '../../../components/NavBar';
import { Bars } from '../../../components/NavBar/NavbarElement';

const AdminHeader = () => {
    const { onLogoutSuccess } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);

    const handleLogout = () => {
        localStorage.clear();
        onLogoutSuccess();
        navigate('/signin');
    };

    return (
        <header className="py-2 admin-header__management border-bottom">
            <div className="custom-page__container-management">
                <nav className="d-flex justify-content-between align-items-center">
                    <Link to={'/admin'} className="admin-header__logo-text">
                        Food <span className="text-green">Recipes</span>
                    </Link>
                    <NavMenuCenter className={`${showSidebar ? 'show' : ''}`} />
                    <div className="d-flex gap-2">
                        <ProfileTogglerMenu handleLogout={handleLogout} />
                        <Bars onClick={() => setShowSidebar((prevState) => !prevState)} />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;
