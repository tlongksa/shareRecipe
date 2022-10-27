import './App.css';
import Navbar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import React from 'react';

import Footer from './components/Footer/footer';

function App() {
    return (
        <div className="App">
            <div className="header">
                <Navbar />
            </div>
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default App;
