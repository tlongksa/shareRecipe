import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, NavLink as NavLinkRoot, useLocation } from 'react-router-dom';
import { CAvatar, CDropdownToggle, CDropdown, CDropdownMenu, CDropdownItem } from '@coreui/react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, NavRight } from './NavbarElement';
import img from '../../img/logoDoAn.png';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './index.scss';
import AuthContext from '../../context/auth-context';

const Navbar = () => {
    const [logged, setLogged] = useState(false);
    const navigateTo = useNavigate();
    const {
        onLogoutSuccess,
        userInfo: { accessToken, id },
    } = useContext(AuthContext);
    const { pathname } = useLocation();

    useEffect(() => {
        if (accessToken) {
            setLogged(true);
        } else {
            setLogged(false);
        }
    }, [accessToken]);

    const handleLogout = () => {
        onLogoutSuccess();
        localStorage.clear();
        setLogged(false);
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
                <NavLink to="/" className="d-flex align-items-center gap-2">
                    <img src={require('../../img/logoDoAn1.png')} alt="logo" />
                    <strong className="main-logo__name">iShii</strong>
                </NavLink>
                <Bars />
                <NavMenu>
                    <NavLinkRoot
                        to="/"
                        className={({ isActive }) =>
                            isActive && pathname === '/' ? 'active ps-4 header-menu__link' : 'ps-4 header-menu__link'
                        }
                    >
                        Home
                    </NavLinkRoot>
                    <NavLink to="/blogs" className="ps-4">
                        Blog
                    </NavLink>
                    <NavLink to="/about" className="ps-4">
                        About
                    </NavLink>
                    <NavLink to="/save" className="ps-4">
                        Save
                    </NavLink>
                    <NavLink to="/contact" className="ps-4">
                        Contact
                    </NavLink>
                    <NavLink to="/bmi" className="ps-4">
                        BMI
                    </NavLink>
                </NavMenu>
                {!logged ? (
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
                        <CDropdown>
                            <CDropdownToggle
                                color="white"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <CAvatar src={img} />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem
                                    onClick={() => {
                                        navigateTo(`/profile/${id}`);
                                    }}
                                >
                                    Trang cá nhân
                                </CDropdownItem>
                                <CDropdownItem href="#">Yêu thích</CDropdownItem>
                                <CDropdownItem
                                    onClick={() => {
                                        navigateTo(`/change-password`);
                                    }}
                                >
                                    Đổi mật khẩu
                                </CDropdownItem>
                                <CDropdownItem onClick={handleLogout}>Đăng xuất</CDropdownItem>
                            </CDropdownMenu>
                        </CDropdown>
                    </NavRight>
                )}
            </Nav>
        </div>
    );
};

export default Navbar;
