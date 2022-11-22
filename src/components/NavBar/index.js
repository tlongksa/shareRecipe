import React, { useContext, useState } from 'react';
import { useNavigate, NavLink as NavLinkRoot, useLocation } from 'react-router-dom';
import { CDropdownToggle, CDropdown, CDropdownMenu, CDropdownItem } from '@coreui/react';
import { Nav, NavLink, Bars, NavMenu, NavRight } from './NavbarElement';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './index.scss';
import AuthContext from '../../context/auth-context';
import Avatar from '../common/Avatar';
import { ROLES } from '../../App';
import MainLogo from '../common/Logo';
import { useMediaQuery } from 'react-responsive';

export const NavMenuCenter = ({ className, onHide }) => {
    const { pathname } = useLocation();
    const {
        userInfo: { accessToken, roles },
    } = useContext(AuthContext);

    return (
        <NavMenu className={`${className || ''}`}>
            <NavLinkRoot
                to="/"
                className={({ isActive }) =>
                    isActive && pathname === '/' ? 'active ps-4 header-menu__link' : 'ps-4 header-menu__link'
                }
                onClick={onHide}
            >
                Trang chủ
            </NavLinkRoot>
            <NavLink to="/blogs" className="ps-4" onClick={onHide}>
                Blog
            </NavLink>

            {accessToken && (
                <NavLink to="/favourite-recipes" className="ps-4" onClick={onHide}>
                    Yêu thích
                </NavLink>
            )}
            {roles === ROLES.mod && (
                <NavLink to="/my-recipes" className="ps-4" onClick={onHide}>
                    Các công thức
                </NavLink>
            )}
            {accessToken && (
                <NavLink to="/bmi" className="ps-4" onClick={onHide}>
                    BMI
                </NavLink>
            )}
            <NavLink to="/introduce" className="ps-4" onClick={onHide}>
                Giới thiệu
            </NavLink>
        </NavMenu>
    );
};

export const ProfileTogglerMenu = ({ handleLogout, className }) => {
    const {
        userInfo: { id, avatarImage, roles },
    } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <CDropdown className={`profile_toggler-menu ${className || ''}`}>
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
                <CDropdownItem
                    onClick={() => {
                        navigate(`/profile/${id}`);
                    }}
                    className="cursor-pointer"
                >
                    Thông tin cá nhân cá nhân
                </CDropdownItem>
                <CDropdownItem
                    onClick={() => {
                        navigate(`/favourite-recipes`);
                    }}
                    className="cursor-pointer"
                >
                    Yêu thích
                </CDropdownItem>
                <CDropdownItem
                    onClick={() => {
                        navigate(`/change-password`);
                    }}
                    className="cursor-pointer"
                >
                    Đổi mật khẩu
                </CDropdownItem>
                {roles === ROLES.admin && (
                    <CDropdownItem
                        onClick={() => {
                            navigate(`/admin/accounts`);
                        }}
                        className="cursor-pointer"
                    >
                        Quản trị
                    </CDropdownItem>
                )}
                <CDropdownItem onClick={handleLogout} className="cursor-pointer">
                    Đăng xuất
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

const Navbar = () => {
    const navigateTo = useNavigate();
    const {
        onLogoutSuccess,
        userInfo: { accessToken },
    } = useContext(AuthContext);
    const [showSidebar, setShowSidebar] = useState(false);
    const isMobile = useMediaQuery({ query: '(max-width: 465px)' });

    const handleLogout = () => {
        onLogoutSuccess();
        localStorage.clear();
        navigateTo('/');
        navigateTo(0);
        notification.open({
            message: 'Đăng xuất thành công !',
            description: 'Chào bạn, OiShii rất vui lòng được phục vụ quý khách, chúc quý khác có một ngày tốt lành !!!',
            icon: (
                <SmileOutlined
                    style={{
                        color: '#108ee9',
                    }}
                />
            ),
        });
    };

    return (
        <div className="custom-page__container custom-page__container-no__margin">
            <Nav className="bg-white border-bottom">
                <div className="d-flex align-items-center gap-2">
                    <MainLogo className={`logo-md ${isMobile ? 'logo-extra-sm' : ''}`} />
                    <NavMenuCenter className={`${showSidebar ? 'show' : ''}`} onHide={() => setShowSidebar(false)} />
                </div>
                {!accessToken ? (
                    <div className="auth-links d-flex align-items-center gap-2">
                        <NavLinkRoot className={`button button-outlined-hover-green button-sm`} to="/sign-up">
                            Sign Up
                        </NavLinkRoot>
                        <NavLinkRoot className={`button button-outlined-hover-green button-sm`} to="/signin">
                            Sign In
                        </NavLinkRoot>
                    </div>
                ) : (
                    <NavRight>
                        <ProfileTogglerMenu handleLogout={handleLogout} className="keep-position" />
                    </NavRight>
                )}
                <Bars onClick={() => setShowSidebar((prevState) => !prevState)} />
            </Nav>
        </div>
    );
};

export default Navbar;
