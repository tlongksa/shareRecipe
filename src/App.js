import './App.css';
import Navbar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Footer from './components/Footer/footer';

export const ROLES = {
    admin: 'ROLE_ADMIN',
    user: 'ROLE_USER',
    mod: 'ROLE_MOD',
};

function App() {
    const ROLE = localStorage.getItem('roles');

    const [hideHeaderAndFooter, setHideHeaderAndFooter] = useState(false);

    useEffect(() => {
        if (ROLE && ROLE !== ROLES.user) {
            setHideHeaderAndFooter(true);
        } else {
            setHideHeaderAndFooter(false);
        }
    }, [ROLE]);

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
