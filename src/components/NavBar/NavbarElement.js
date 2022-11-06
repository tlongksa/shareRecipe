import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
    background: #cbcde5;
    height: 70px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
    color: #000;
`;
export const NavRight = styled.nav`
    height: 60px;
    display: flex;
    @media screen and (max-width: 768px) {
        position: relative;
        right: 50px;
    }
`;
export const NavLeft = styled.nav`
    width: 80%;
    background: #cbcde5;
    height: 60px;
    display: flex;
    z-index: 10;
    margin: 0px calc((50% - 1050px) / 2);
`;
export const NavLink = styled(Link)`
    color: #000;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1.5rem 0 0;
    height: 100%;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    &.active {
        color: #667eea;
    }
    &:hover {
        transition: all 0.2s ease-in-out;
        color: #667eea;
    }
`;
export const NavLinkRight = styled(Link)`
    color: #000;
    display: flex;
    align-items: center;
    text-decoration: none;
    height: 100%;
    cursor: pointer;
    margin-top: -5px;
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #000;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    @media screen and (max-width: 768px) {
        position: fixed;
        left: 0;
        top: 0;
        background-color: white;
        z-index: 100;
        height: 100vh;
        flex-direction: column;
        width: 250px;
        border-right: 1px solid #ccc;
        padding-top: 1.5rem;
        transition: all 0.3s ease-in-out;
        transform: translateX(-250px);
        a {
            height: auto;
            width: 100%;
            padding: 1rem 2rem;
        }
        &.show {
            transform: translateX(0);
        }
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #256ce1;
    padding: 10px 22px;
    color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    margin-left: 24px;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #8ba3ca;
        color: #010606;
    }
`;
