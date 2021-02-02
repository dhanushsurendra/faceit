import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import classes from './CartDropdown.module.css';

import { connect } from 'react-redux';

const CartDropdown = props => {

    let price = 0;
    let originalPrice = 0;

    props.cartItemsArr.forEach(item => {
        price += Number.parseFloat(item.price);
    });

    props.cartItemsArr.forEach(item => {;
        originalPrice += Number.parseFloat(item.originalPrice);
    })

    const handleClick = () => {
        props.history.push('/cart');
    }

    const reduceTitle = (limit = 20, name) => {
        const newArr = name.trim().split("");
        const newName = [];
        newArr.reduce((acc, cur) => {
                  if ((acc + cur).length <= limit) {
                  newName.push(cur);
                  }
                  return acc + cur;
             }, "");
             return `${newName.join("")}...`;
    };

    return (
        <div className={classes.cartContainer}>
            {props.cartItemsArr.length === 0 ? <p style={{margin: '1rem 1rem 1rem 1rem', textAlign: 'center'}}>No Items In Cart!</p> : null}
            {props.cartItemsArr.length > 0 ?
            <div className={classes.cartFullContainer}>
                { props.cartItemsArr.map(item =>
                    <div className={classes.cartItemContainer} key={item.id}>
                        <div className={classes.cartItem}>
                            <div className={classes.imageContainer}>
                                <img src={item.imageUrl} alt={item.name} className={classes.cartItemImage} />
                            </div>
                            <div className={classes.cartItemDetails}>
                                <h2 style={{color: '#fd1783', fontWeight: '500', fontSize: '1.6rem'}} className={classes.cartItemHeading}>
                                    {reduceTitle(17, item.name)}
                                </h2>
                                <h3 style={{color: '#73726c', fontWeight: '300', fontSize: '1.3rem'}} className={classes.cartItemBrand}>{item.brand}</h3>
                                <div className={classes.cartItemPrice}>
                                <h4 style={{color: '#333', marginRight: '1rem', fontWeight: '300'}}>$ {item.price}</h4>
                                <del style={{color: '#73726c', fontSize: '1.3rem', fontWeight: '300'}}>$ {item.originalPrice}</del>
                                </div>
                            </div>
                        </div>
                        <div className={classes.divider}/>
                    </div>
                )}
            </div> : null}

            {props.cartItemsArr.length > 0 ? <div className={classes.priceContainer}>
                <div className={classes.priceDetails}>
                    <h3 style={{marginRight: '1.5rem', fontWeight: '500', fontSize: '2rem'}}>Total: $ {price.toFixed(2)}</h3>
                    <del>$ {originalPrice.toFixed(2)}</del>
                </div>
                <button className={classes.goToCart} onClick={handleClick}>
                    Go to cart
                </button>
            </div>  : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cartItemsArr: state.cart.cartItemsArr
    }
}

export default connect(mapStateToProps)(withRouter(CartDropdown));