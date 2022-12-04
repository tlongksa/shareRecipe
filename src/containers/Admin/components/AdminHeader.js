import React, { useContext, useState } from 'react';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/auth-context';
import { NavMenuCenter, ProfileTogglerMenu } from '../../../components/NavBar';
import { Bars } from '../../../components/NavBar/NavbarElement';
import MainLogo from '../../../components/common/Logo';

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
        <header className="admin-header__management border-bottom bg-green-header">
            <div className="custom-page__container-management">
                <nav className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <MainLogo className="logo-md" />
                        <NavMenuCenter
                            className={`${showSidebar ? 'show' : ''}`}
                            onHide={() => setShowSidebar(false)}
                        />
                    </div>
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
