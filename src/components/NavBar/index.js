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
import { UserIcon } from '../../assets/svg-icons/submenu-icons';
import heartIconImg from '../../assets/img/heart_Dark.png';
import lockIconImg from '../../assets/img/lock.png';
import userSettingIconImg from '../../assets/img/user_setting.png';
import signoutIconImg from '../../assets/img/signout.png';
import Modal from 'react-bootstrap/Modal';

export const NavMenuCenter = ({ className, onHide }) => {
    const { pathname } = useLocation();
    const {
        userInfo: { accessToken, roles },
    } = useContext(AuthContext);
    const [showAuthOptionModal, setShowAuthOptionModal] = useState(false);
    const navigate = useNavigate();

    return (
        <>
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
                <NavLink to="/ing-report" className="ps-4" onClick={onHide}>
                    Nguyên liệu xung khắc
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
                <NavLink
                    to="/bmi"
                    className="ps-4"
                    onClick={(e) => {
                        onHide();
                        if (!accessToken) {
                            e.preventDefault();
                            setShowAuthOptionModal(true);
                        }
                    }}
                >
                    BMI
                </NavLink>
                <NavLink to="/introduce" className="ps-4" onClick={onHide}>
                    Giới thiệu
                </NavLink>
            </NavMenu>
            <Modal
                show={showAuthOptionModal}
                fullscreen={'md-down'}
                onHide={() => setShowAuthOptionModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Bạn cần đăng nhập để sử dụng tính năng này?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex gap-2 align-items-center py-3">
                        <button
                            className="button button-sm button-green"
                            type="button"
                            onClick={() => {
                                navigate(`/signin?redirectUrl=/bmi`);
                                setShowAuthOptionModal(false);
                            }}
                        >
                            Đăng nhập
                        </button>
                        <button
                            className="button button-sm button-secondary"
                            type="button"
                            onClick={() => setShowAuthOptionModal(false)}
                        >
                            Hủy
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export const ProfileTogglerMenu = ({ handleLogout, className }) => {
    const {
        userInfo: { id, avatarImage, roles },
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const {
        profile: { dataResponse },
    } = useContext(AuthContext);

    return (
        <CDropdown className={`profile_toggler-menu ${className || ''}`}>
            <CDropdownToggle
                color="white"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                }}
            >
                <Avatar imgSrc={avatarImage || ''} />
                <div>
                    <p>Xin chào</p>
                    <span>{dataResponse?.name}</span>
                </div>
            </CDropdownToggle>
            <CDropdownMenu>
                <CDropdownItem
                    onClick={() => {
                        navigate(`/profile/${id}`);
                    }}
                    className="cursor-pointer f-16 d-flex gap-2 align-items-center"
                >
                    <UserIcon /> Thông tin cá nhân cá nhân
                </CDropdownItem>
                <CDropdownItem
                    onClick={() => {
                        navigate(`/favourite-recipes`);
                    }}
                    className="cursor-pointer f-16 d-flex gap-2 align-items-center"
                >
                    <img src={heartIconImg} alt="" /> Yêu thích
                </CDropdownItem>
                <CDropdownItem
                    onClick={() => {
                        navigate(`/change-password`);
                    }}
                    className="cursor-pointer f-16 d-flex gap-2 align-items-center"
                >
                    <img src={lockIconImg} alt="" /> Đổi mật khẩu
                </CDropdownItem>
                {roles === ROLES.admin && (
                    <CDropdownItem
                        onClick={() => {
                            navigate(`/admin/accounts`);
                        }}
                        className="cursor-pointer f-16 d-flex gap-2 align-items-center"
                    >
                        <img src={userSettingIconImg} alt="" /> Quản trị
                    </CDropdownItem>
                )}
                <CDropdownItem onClick={handleLogout} className="cursor-pointer f-16 d-flex gap-2 align-items-center">
                    <img src={signoutIconImg} alt="" /> Đăng xuất
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
            description: 'Chào bạn, FSRS rất vui lòng được phục vụ quý khách, chúc quý khác có một ngày tốt lành !!!',
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
        <div className="position-relative">
            <div className="custom-page__container custom-page__container-no__margin">
                <Nav>
                    <div className="d-flex align-items-center gap-2">
                        <MainLogo className={`logo-md ${isMobile ? 'logo-extra-sm' : ''}`} />
                        <NavMenuCenter
                            className={`${showSidebar ? 'show' : ''}`}
                            onHide={() => setShowSidebar(false)}
                        />
                    </div>
                    {!accessToken ? (
                        <div className="auth-links d-flex align-items-center gap-2">
                            <NavLinkRoot className={`button button-outlined-hover-green button-sm`} to="/sign-up">
                                Đăng kí
                            </NavLinkRoot>
                            <NavLinkRoot className={`button button-outlined-hover-green button-sm`} to="/signin">
                                Đăng nhập
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
        </div>
    );
};

export default Navbar;
