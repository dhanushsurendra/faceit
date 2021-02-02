import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Footer.module.css';

import logo from '../../assests/logo.png';

const Footer = () => {
    return (
        <footer className={classes.footer}>
            <div className={classes.logoContainer}>
                <Link to="/">
                    <img src={logo} alt="Logo" className={classes.logo} />
                </Link>
            </div>
            <div className={classes.linkContainer}>
                <Link to="/" className={classes.link}>
                    Home
                </Link>
                <Link to="/orders" className={classes.link}>
                    My orders
                </Link>
                <Link to="/wishlist" className={classes.link}>
                    My wishlist
                </Link>
                <Link to="/cart" className={classes.link}>
                    My cart
                </Link>
            </div>
            <div className={classes.copy}>
                Copyrights &copy; 2020 by Faceit. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer;