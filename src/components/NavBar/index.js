import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CAvatar, CDropdownToggle, CDropdown, CDropdownMenu, CDropdownItem } from '@coreui/react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, NavRight } from './NavbarElement';
import img from '../../img/logoDoAn.png';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import './index.scss';

const Navbar = () => {
    const [logged, setLogged] = useState(false);
    const navigateTo = useNavigate();

    const currentAccessToken = localStorage.getItem('token');
    const id = localStorage.getItem('id');

    useEffect(() => {
        if (currentAccessToken) {
            setLogged(true);
        } else {
            setLogged(false);
        }
    }, [currentAccessToken]);

    const handleLogout = () => {
        localStorage.clear();
        setLogged(false);
        navigateTo('/');
        navigateTo(0);
        openNotification();
    };
    const openNotification = () => {
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
                    <NavLink to="/" className="ps-4">
                        Home
                    </NavLink>
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
                    <>
                        <NavMenu>
                            <NavLink to="/sign-up">Sign Up</NavLink>
                        </NavMenu>
                        <NavBtn buttonSignIn>
                            <NavBtnLink to="signin">Sign In</NavBtnLink>
                        </NavBtn>
                    </>
                ) : (
                    <NavRight>
                        <CDropdown>
                            <CDropdownToggle color="#cbcde5">
                                <CAvatar src={img} status="success" />{' '}
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
