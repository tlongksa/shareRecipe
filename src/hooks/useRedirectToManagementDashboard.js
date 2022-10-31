import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../App';
import AuthContext from '../context/auth-context';

const useRedirectToManagementDashboard = () => {
    const {
        userInfo: { roles },
    } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (roles && roles !== ROLES.user) {
            if (roles === ROLES.admin) {
                navigate('/admin/accounts');
            }
        }
    }, [roles, navigate]);
};

export default useRedirectToManagementDashboard;
