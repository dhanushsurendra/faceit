import React from 'react';

import { connect } from 'react-redux';

import Toolbar from '../Toolbar/Toolbar';
import Spinner from '../../ui/Spinner/Spinner';
import SideDrawer from '../SideDrawer/SideDrawer';
import Footer from '../Footer/Footer';

import CartItem from './CartItem/CartItem';
import CartPrice from './CartPrice/CartPrice';

import NoResult from '../../assests/no_result.svg';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-firebase';

import classes from './Cart.module.css';

import Snackbar from '../../ui/Snackbar/Snackbar';

const Cart = props => {

    let [price, setPrice] = React.useState(0);
    let [originalPrice, setOriginalPrice] = React.useState(0);

    React.useEffect(() => {
        props.cartItemsArr.map(item => {
            price += Number.parseFloat(item.price);
            originalPrice += Number.parseFloat(item.originalPrice);
        })
    }, [])

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [openSideDrawer, setOpenSideDrawer] = React.useState(false);

    const toggleSideDrawer = () => {
        setOpenSideDrawer(!openSideDrawer);
    }

    let sideDrawer;
    if(openSideDrawer) {
        sideDrawer = <SideDrawer close={toggleSideDrawer} show={openSideDrawer} active="cart" />;
    }

    const priceDecrease = (value) => {
        setPrice(price - value);
    }

    const priceIncrease = (value) => {
        setPrice(price + value);
    }

    const priceOriginalIncrease = (value) => {
        setOriginalPrice(price + value);
    }

    const priceOriginalDecrease = (value) => {
        setOriginalPrice(price - value);
    }

    let snackbar = null;
    if(props.snackbarLoading) {
        snackbar = <Snackbar message="Deleting..." />
    }

    let cartItems = <Spinner width={100} height={100} margin={60}/>;

    if(!props.loading) {
        cartItems =
            <div className={classes.cartContainer}>
                <div className={classes.cartItemsContainer}>
                    {props.cartItemsArr.map(cartItem => (
                        <CartItem
                            key={cartItem.id}
                            description={cartItem.description}
                            name={cartItem.name}
                            id={cartItem.id}
                            cartItemId={cartItem.cartItemId}
                            price={cartItem.price}
                            originalPrice={cartItem.originalPrice}
                            brand={cartItem.brand}
                            imageUrl={cartItem.imageUrl}
                            priceIncrease={priceIncrease}
                            priceDecrease={priceDecrease}
                            originalPriceIncrease={priceOriginalIncrease}
                            originalPriceDecrease={priceOriginalDecrease}
                        />
                ))}
            </div>
                {!props.cartItemError || props.cartItemsArr.length !==0 ? <CartPrice originalPrice={originalPrice} price={price} cartItemsArr={props.cartItemsArr} /> : null}
            </div>
    }

    if(props.cartItemsArr.length === 0) {
        cartItems = <React.Fragment>
                        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                            <img className={classes.noResult} src={NoResult} alt="Empty"/>
                            <p style={{margin: '0 1rem 1rem 1rem', textAlign: 'center', marginTop: '4rem', fontSize: '2.5rem'}}>No Products In Cart!</p>
                        </div>
                    </React.Fragment>
    }

    return (
        <React.Fragment>
            {sideDrawer}
            <Toolbar toggleSideDrawer={toggleSideDrawer} active="cart" />
            <h2 style={{marginTop: '10rem', marginLeft: '10rem', fontSize: '2.5rem'}}>My Cart</h2>
            <h3 style={{marginLeft: '10rem', fontSize: '1.8rem', fontWeight: '300', marginTop: '1rem'}}>{props.cartItemsArr.length} Products in Cart</h3>
            {cartItems}
            {snackbar}
            <Footer />
        </React.Fragment>
    )
};

const mapStateToProps = state => {
    return {
        cartItemsArr: state.cart.cartItemsArr,
        loading: state.cart.loading,
        cartItemError: state.cart.error,
        snackbarLoading: state.cart.snackbarLoading
    }
}

export default connect(mapStateToProps)(withErrorHandler(Cart, axios));
