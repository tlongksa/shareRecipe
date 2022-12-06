import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
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
    position: absolute;
    right: 1rem;
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
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1.5rem 0 0;
    height: 100%;
    cursor: pointer;
    font-weight: 400;
    font-size: 20px;
    &.active {
        color: #000;
    }
    &:hover {
        transition: all 0.2s ease-in-out;
        color: #000;
    }
`;
export const NavLinkRight = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    height: 100%;
    cursor: pointer;
    margin-top: -5px;
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #fff;
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
            color: #131313;
        }
        &.show {
            transform: translateX(0);
        }
    }
`;
