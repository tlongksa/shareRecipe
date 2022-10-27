import { MenuOutlined, CloseOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './components/AdminHeader';
import AdminSubMenu from './components/AdminSubMenu';
import './index.scss';

const AdminLayout = (props) => {
    const [isShowMenu, setIsShowMenu] = useState(false);

    return (
        <main className="main__admin-layout">
            <AdminHeader />
            <div className="custom-page__container-management">
                <div className="main__admin-layout-sidebar my-3">
                    <button className="button button-sm" onClick={() => setIsShowMenu((prevState) => !prevState)}>
                        {isShowMenu ? (
                            <CloseOutlined className="toggler-admin__menu" />
                        ) : (
                            <MenuOutlined className="toggler-admin__menu" />
                        )}
                    </button>
                    <AdminSubMenu isShowMenu={isShowMenu} />
                </div>
                <Outlet />
            </div>
        </main>
    );
};

export default AdminLayout;
