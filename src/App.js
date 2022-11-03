import './App.css';
import Navbar from './components/NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import Footer from './components/Footer/footer';
import AuthContext from './context/auth-context';

export const ROLES = {
    admin: 'ROLE_ADMIN',
    user: 'ROLE_USER',
    mod: 'ROLE_MOD',
};

function App() {
    const {
        userInfo: { roles },
    } = useContext(AuthContext);
    const { pathname } = useLocation();
    const [hideHeaderAndFooter, setHideHeaderAndFooter] = useState(false);

    useEffect(() => {
        if (roles && roles !== ROLES.user && pathname.includes('/admin')) {
            setHideHeaderAndFooter(true);
        } else {
            setHideHeaderAndFooter(false);
        }
    }, [roles, pathname]);

    return (
        <>
            {!hideHeaderAndFooter && (
                <div className="header">
                    <Navbar />
                </div>
            )}
            <Outlet />
            {!hideHeaderAndFooter && <Footer />}
        </>
    );
}

export default App;
