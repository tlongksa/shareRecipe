import './App.css';
import Navbar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import React from 'react';

import Footer from './components/Footer/footer';

export const ROLES = {
    admin: 'ROLE_ADMIN',
    user: 'ROLE_USER',
};

function App() {
    const ROLE = localStorage.getItem('roles');

    return (
        <>
            {(ROLE === ROLES.user || !ROLE) && (
                <div className="header">
                    <Navbar />
                </div>
            )}
            <div className="content">
                <Outlet />
            </div>
            {(ROLE === ROLES.user || !ROLE) && <Footer />}
        </>
    );
}

export default App;
