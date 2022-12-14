import { MenuOutlined, CloseOutlined } from '@mui/icons-material';
import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ROLES } from '../../App';
import ClickOutsideWrapper from '../../components/common/ClickOutsideWrapper';
import AuthContext from '../../context/auth-context';
import AdminHeader from './components/AdminHeader';
import AdminSubMenu from './components/AdminSubMenu';
import './index.scss';

const AdminLayout = (props) => {
    const [isShowMenu, setIsShowMenu] = useState(false);
    const {
        userInfo: { roles },
    } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (roles && roles !== ROLES.admin) {
            navigate('/');
        }
    }, [roles, navigate]);

    return (
        <main className="main__admin-layout">
            <AdminHeader />
            <div className="custom-page__container-management">
                <div className="main__admin-layout-sidebar my-3">
                    <ClickOutsideWrapper
                        cb={() => {
                            // hide menu
                            setIsShowMenu(false);
                        }}
                        idToIgnore="btn-toggler__admin-submenu"
                    >
                        <>
                            <button
                                className="button button-sm button-green"
                                onClick={() => setIsShowMenu((prevState) => !prevState)}
                                id="btn-toggler__admin-submenu"
                            >
                                {isShowMenu ? (
                                    <CloseOutlined className="toggler-admin__menu" />
                                ) : (
                                    <MenuOutlined className="toggler-admin__menu" />
                                )}
                            </button>
                            <AdminSubMenu isShowMenu={isShowMenu} setIsShowMenu={setIsShowMenu} />
                        </>
                    </ClickOutsideWrapper>
                </div>
                <Outlet />
            </div>
        </main>
    );
};

export default AdminLayout;
