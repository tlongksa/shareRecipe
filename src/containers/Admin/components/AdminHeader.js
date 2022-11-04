import React, { useContext, useState } from 'react';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../../../components/common/Avatar';
import { CDropdownToggle, CDropdown, CDropdownMenu, CDropdownItem } from '@coreui/react';
import AuthContext from '../../../context/auth-context';
import { NavMenuCenter } from '../../../components/NavBar';
import { Bars } from '../../../components/NavBar/NavbarElement';

const AdminHeader = () => {
    const {
        onLogoutSuccess,
        userInfo: { avatarImage },
    } = useContext(AuthContext);
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
                        <CDropdown className="profile_toggler-menu">
                            <CDropdownToggle
                                color="white"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar imgSrc={avatarImage || ''} />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem onClick={() => {}}>Thông tin cá nhân cá nhân</CDropdownItem>
                                <CDropdownItem onClick={() => {}}>Yêu thích</CDropdownItem>
                                <CDropdownItem
                                    onClick={() => {
                                        navigate(`/change-password`);
                                    }}
                                >
                                    Đổi mật khẩu
                                </CDropdownItem>
                                <CDropdownItem onClick={handleLogout}>Đăng xuất</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                        <Bars onClick={() => setShowSidebar((prevState) => !prevState)} />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;
