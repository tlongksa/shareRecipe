import React from 'react';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../../../components/common/Avatar';
import { CDropdownToggle, CDropdown, CDropdownMenu, CDropdownItem } from '@coreui/react';

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
                    <CDropdown>
                        <CDropdownToggle
                            color="white"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar imgSrc={avatarImg || ''} />
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem
                                onClick={() => {
                                    // navigate(`/profile/${id}`);
                                }}
                            >
                                Thông tin cá nhân cá nhân
                            </CDropdownItem>
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
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;
