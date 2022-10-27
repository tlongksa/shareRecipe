import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../App';

const useRedirectToManagementDashboard = () => {
    const ROLE = localStorage.getItem('roles');
    const navigate = useNavigate();

    useEffect(() => {
        if (ROLE && ROLE !== ROLES.user) {
            if (ROLE === ROLES.admin) {
                navigate('/admin/accounts');
            }
        }
    }, [ROLE, navigate]);
};

export default useRedirectToManagementDashboard;
