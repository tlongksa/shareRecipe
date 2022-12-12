import './App.scss';
import Navbar from './components/NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import Footer from './components/Footer/footer';
import AuthContext from './context/auth-context';

export const ROLES = {
    admin: 'ROLE_ADMIN',
    user: 'ROLE_USER',
    mod: 'ROLE_MOD',
};

function App() {
    const {
        userInfo: { roles, id },
    } = useContext(AuthContext);
    const { pathname } = useLocation();
    const [hideHeaderAndFooter, setHideHeaderAndFooter] = useState(false);
    const { onFetchProfile } = useContext(AuthContext);

    useEffect(() => {
        if (id) {
            onFetchProfile(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (roles && roles !== ROLES.user && pathname.includes('/admin')) {
            setHideHeaderAndFooter(true);
        } else {
            setHideHeaderAndFooter(false);
        }
    }, [roles, pathname]);

    return (
        <Fragment>
            {!hideHeaderAndFooter && (
                <header className="header bg-green-header">
                    <Navbar />
                </header>
            )}
            <div className="main-app__content-container">
                <Outlet />
            </div>
            {!hideHeaderAndFooter && <Footer />}
        </Fragment>
    );
}

export default App;
