import React from 'react';
import { NavLink } from '../../NavBar/NavbarElement';

const MainLogo = () => {
    return (
        <NavLink to="/" className="d-flex align-items-center gap-2">
            <img src={require('../../../assets/img/logoDoAn1.png')} alt="logo" />
            <strong className="main-logo__name">iShii</strong>
        </NavLink>
    );
};

export default MainLogo;
