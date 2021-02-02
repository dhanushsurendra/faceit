import React from 'react';
import { Link } from 'react-router-dom';

import Backdrop from '../../ui/Backdrop/Backdrop';

import logo from '../../assests/logo.png';

import classes from './SideDrawer.module.css';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import TurnedInNotOutlinedIcon from '@material-ui/icons/TurnedInNotOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import CompareIcon from '@material-ui/icons/Compare';

const SideDrawer = props => {

    let attachedClasses = [classes['sideDrawer'], classes['close']];
    if(props.show) {
        attachedClasses = [classes['sideDrawer'], classes['open']];
    }

    let classname = [classes.navLink];

    return (
        <React.Fragment>
            <Backdrop close={props.close} show={props.show} />
                <div className={attachedClasses.join(' ')} onClick={props.close}>
                    <div className={classes.logoContainer}>
                        <img src={logo} alt="Logo" className={classes.logo} />
                    </div>
                    <div className={classes.list}>
                        {console.log(classname)}
                        <Link to="/" className={props.active === 'home' ? [classes.navLink, classes.home].join(' ') : classes.navLink }>
                            <HomeOutlinedIcon className={classes.drawerIcon} />
                            <p>Home</p>
                            <div className={classes.indicator}></div>
                        </Link>
                        <Link to="/wishlist" className={props.active === 'wishlist' ? [classes.navLink, classes.wishlist].join(' ') : classes.navLink }>
                            <FavoriteBorderOutlinedIcon className={classes.drawerIcon} />
                            <p>My Wishlist</p>
                            <div className={classes.indicator}></div>
                        </Link>
                        <Link to="/cart" className={props.active === 'cart' ? [classes.navLink, classes.cart].join(' ') : classes.navLink }>
                            <ShoppingCartOutlinedIcon className={classes.drawerIcon}/>
                            <p>My Cart</p>
                            <div className={classes.indicator}></div>
                        </Link>
                        <Link to="/compare" className={props.active === 'compare' ? [classes.navLink, classes.compare].join(' ') : classes.navLink }>
                            <CompareIcon className={classes.drawerIcon}/>
                            <p>Compare</p>
                            <div className={classes.indicator}></div>
                        </Link>
                        <Link to="/orders" className={props.active === 'orders' ? [classes.navLink, classes.orders].join(' ') : classes.navLink }>
                            <TurnedInNotOutlinedIcon className={classes.drawerIcon}/>
                            <p>My Orders</p>
                            <div className={classes.indicator}></div>
                        </Link>
                        <Link to="/settings" className={props.active === 'settings' ? [classes.navLink, classes.settings].join(' ') : classes.navLink }>
                            <SettingsOutlinedIcon className={classes.drawerIcon}/>
                            <p>Settings</p>
                            <div className={classes.indicator}></div>
                        </Link>
                        <Link to="/logout" className={classes.navLink}>
                            <ExitToAppOutlinedIcon className={classes.drawerIcon}/>
                            <p>Logout</p>
                            <div className={classes.indicator}></div>
                        </Link>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default SideDrawer;