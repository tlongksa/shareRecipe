import React from 'react';
import { NavLink } from '../../NavBar/NavbarElement';
import './index.scss';

const MainLogo = ({ className }) => {
    return (
        <NavLink to="/" className={`main-logo__container d-flex align-items-center gap-0 ${className || ''}`}>
            <span>Food</span>
            <span className="text-green">Recipes</span>
        </NavLink>
    );
};

export default MainLogo;
