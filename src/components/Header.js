import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/components/Header.css';

import Logo from '../static/Logo.svg';
import User from '../static/User.svg';

const Header = () => {
    return(
        <div className="Header">
            <div className="Header_container">
                <div className="Header_left">
                    <Link to="/">
                        <h1>Gula <strong>Up</strong></h1>
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className="Header_search">
                    <input type="text" placeholder="Buscar acción" />
                </div>
                <div className="Header_right">
                    <h3 className="LogIn">Log In</h3>
                    <img src={User} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Header;