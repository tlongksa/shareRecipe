import React from 'react';
import { NavLink } from '../../NavBar/NavbarElement';
import './index.scss';
import whiteImg from '../../../assets/img/logo.png';
import greenImg from '../../../assets/img/logo_green.png';

const MainLogo = ({ className, isGreen }) => {
    return (
        <NavLink to="/" className={`main-logo__container d-flex align-items-center gap-0 ${className || ''}`}>
            <img src={isGreen ? greenImg : whiteImg} alt="" />
        </NavLink>
    );
};

export default MainLogo;
