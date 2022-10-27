import { Outlet } from 'react-router-dom';
import AdminHeader from './components/AdminHeader';

const AdminLayout = (props) => {
    return (
        <main className="main__admin-layout">
            <AdminHeader />
            <div className="custom-page__container-management">
                <Outlet />
            </div>
        </main>
    );
};

export default AdminLayout;
