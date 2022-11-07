import React, { useContext, useState } from 'react';
import { useNavigate, NavLink as NavLinkRoot, useLocation } from 'react-router-dom';
import { CDropdownToggle, CDropdown, CDropdownMenu, CDropdownItem } from '@coreui/react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, NavRight } from './NavbarElement';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './index.scss';
import AuthContext from '../../context/auth-context';
import Avatar from '../common/Avatar';
import { ROLES } from '../../App';
import MainLogo from '../common/Logo';

export const NavMenuCenter = ({ className }) => {
    const { pathname } = useLocation();
    const {
        userInfo: { accessToken },
    } = useContext(AuthContext);

    return (
        <NavMenu className={`${className || ''}`}>
            <NavLinkRoot
                to="/"
                className={({ isActive }) =>
                    isActive && pathname === '/' ? 'active ps-4 header-menu__link' : 'ps-4 header-menu__link'
                }
            >
                Trang chủ
            </NavLinkRoot>
            <NavLink to="/blogs" className="ps-4">
                Blog
            </NavLink>
            {accessToken && (
                <NavLink to="/favourite-recipes" className="ps-4">
                    Yêu thích
                </NavLink>
            )}
            {/* <NavLink to="/save" className="ps-4">
                Save
            </NavLink>
            <NavLink to="/contact" className="ps-4">
                Contact
            </NavLink> */}
            {accessToken && (
                <NavLink to="/bmi" className="ps-4">
                    BMI
                </NavLink>
            )}
        </NavMenu>
    );
};

export const ProfileTogglerMenu = ({ handleLogout }) => {
    const {
        userInfo: { id, avatarImage, roles },
    } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
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
                <CDropdownItem
                    onClick={() => {
                        navigate(`/profile/${id}`);
                    }}
                >
                    Thông tin cá nhân cá nhân
                </CDropdownItem>
                <CDropdownItem
                    onClick={() => {
                        navigate(`/favourite-recipes`);
                    }}
                >
                    Yêu thích
                </CDropdownItem>
                <CDropdownItem
                    onClick={() => {
                        navigate(`/change-password`);
                    }}
                >
                    Đổi mật khẩu
                </CDropdownItem>
                {roles !== ROLES.user && (
                    <CDropdownItem
                        onClick={() => {
                            navigate(`/admin/accounts`);
                        }}
                    >
                        Quản trị
                    </CDropdownItem>
                )}
                <CDropdownItem onClick={handleLogout}>Đăng xuất</CDropdownItem>
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
                <MainLogo />
                <Bars onClick={() => setShowSidebar((prevState) => !prevState)} />
                <NavMenuCenter className={`${showSidebar ? 'show' : ''}`} />
                {!accessToken ? (
                    <div className="d-flex align-items-center">
                        <NavMenu>
                            <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
                        </NavMenu>
                        <NavBtn buttonSignIn>
                            <NavBtnLink to="signin">Sign In</NavBtnLink>
                        </NavBtn>
                    </div>
                ) : (
                    <NavRight>
                        <ProfileTogglerMenu handleLogout={handleLogout} />
                    </NavRight>
                )}
            </Nav>
        </div>
    );
};

export default Navbar;
