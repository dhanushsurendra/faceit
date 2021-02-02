import React from 'react';

import classes from './CartPrice.module.css';

import { withRouter } from 'react-router-dom';

const CartPrice = props => {

    console.log('RENDERING CART PRICE')

    const { price } = props;
    const { originalPrice } = props;

    const redirectToCheckout = () => {
        props.history.push('/checkout')
    }

    let totalPrice = React.useState(0)[0];
    let totalOriginalPrice = React.useState(0)[0];

    props.cartItemsArr.map(item => {
        totalPrice += Number.parseFloat(item.price);
        totalOriginalPrice += Number.parseFloat(item.originalPrice);
    })

    let discountPercent = Math.round(((totalOriginalPrice - totalPrice) / totalOriginalPrice) * 100);

    return (
            <div className={classes.cartPriceContainer}>
                <h3 style={{fontSize: '2.5rem', fontWeight: 400}}>Total:</h3>
                <h1 style={{color: '#fd1783', fontSize: '4rem', fontWeight: '700'}}>$ {(totalPrice + price).toFixed(2)} </h1>
                <del style={{color: '#333', fontWeight: '300', fontSize: '1.8rem', marginTop: 0}}>$ {(totalOriginalPrice + originalPrice).toFixed(2)}</del>
                <h5 style={{color: '#333', fontWeight: '400', fontSize: '1.4rem', marginBottom: '1rem'}}>{discountPercent}% off</h5>
                <button className={classes.checkout} onClick={redirectToCheckout}>Checkout</button>
            </div>
    )
}

export default withRouter(CartPrice);