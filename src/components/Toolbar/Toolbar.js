import React from 'react';
import SearchInput from '../Search/SearchInput/SearchInput';

import logo from '../../assests/logo.png';

import classes from './Toolbar.module.css';

import CartDropdown from '../Cart/CartDropdown/CartDropdown';
import WishlistDropdown from '../Wishlist/WishlistDropdown/WishlistDropdown';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import NotificationsOutlinedIcon from '@material-ui/icons/NotificationsOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import { useSelector } from 'react-redux';

import * as action from '../../store/actions/index';

const Toolbar = props => {

    const { onInitCartItems } = props;
    const { onInitFavoritesItems } = props;

    React.useEffect(() => {
        onInitCartItems();
        onInitFavoritesItems();
    }, [onInitCartItems, onInitFavoritesItems]);

    const cartIcon = [classes['badge'], classes['cartIconBadge']].join(' ');
    const wishListIcon = [classes['badge'], classes['wishListIconBadge']].join(' ');
    const notificationIcon = [classes['badge'], classes['notificationIconBadge']].join(' ');

    const [showWishlist, setShowWishlist] = React.useState(false);
    const [showCart, setShowCart] = React.useState(false);

    const toggleCart = () => {
        setShowCart(!showCart)
    }

    const toggleWishlist = () => {
        setShowWishlist(!showWishlist)
    }

    const goToCart = () => {
        props.history.push('/cart');
    }

    const goToWishlist = () => {
        props.history.push('/wishlist')
    }

    const goToAuth = () => {
        props.history.push('/auth');
    }

    let favoritesArrLength = props.favoriteItemsArr.length > 0;

    const isAuthenticated = useSelector(state => state.auth.token !== null);

    let navItems = (
        <React.Fragment>
            <div className={classes.iconContainer} onMouseEnter={toggleWishlist} onMouseLeave={toggleWishlist} onClick={goToWishlist}>
                <IconButton>
                    <FavoriteBorderOutlinedIcon className={classes.icon} />
                </IconButton>
                {favoritesArrLength ? <div className={wishListIcon} /> : null}
                {showWishlist ? <WishlistDropdown /> : null}
            </div>
            <button className={classes.loginButton} onClick={goToAuth}>Log in</button>
            <button className={classes.signupButton} onClick={goToAuth}>Sign up</button>
        </React.Fragment>
    )

    if(isAuthenticated) {
        navItems = (
            <React.Fragment>
                <div className={classes.iconContainer} onMouseEnter={toggleCart} onMouseLeave={toggleCart} onClick={goToCart}>
                    <IconButton>
                        <ShoppingCartOutlinedIcon className={classes.icon} />
                    </IconButton>
                    {props.cartItemsArr.length > 0 ? <div className={cartIcon} /> : null}
                    {showCart ? <CartDropdown /> : null }
                </div>
                <div className={classes.iconContainer} onMouseEnter={toggleWishlist} onMouseLeave={toggleWishlist} onClick={goToWishlist}>
                    <IconButton>
                        <FavoriteBorderOutlinedIcon className={classes.icon} />
                    </IconButton>
                    {favoritesArrLength ? <div className={wishListIcon} /> : null}
                    {showWishlist ? <WishlistDropdown /> : null}
                </div>
                <div className={classes.iconContainer}>
                    <IconButton>
                        <NotificationsOutlinedIcon className={classes.icon} />
                    </IconButton>
                    <div className={notificationIcon}></div>
                </div>
                <div className={classes.iconContainer} style={{marginTop: '2.5rem'}} onClick={props.toggleSideDrawer}>
                        <MenuIcon className={classes.icon}/>
                    <div className={classes.menuIcon}></div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <header className={classes.ToolbarContainer}>
            <div className={classes.Toolbar}>
                <img src={logo} alt="Logo" className={classes.logo}/>
                <SearchInput isLoading={props.isLoading}/>
                {navItems}
            </div>
        </header>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onInitFavoritesItems: () => dispatch(action.initFavorites()),
        onInitCartItems: () => dispatch(action.initCart()),
    }
}

const mapStateToProps = state => {
    return {
        cartItemsArr: state.cart.cartItemsArr,
        favoriteItemsArr: state.favorites.favorites
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Toolbar));