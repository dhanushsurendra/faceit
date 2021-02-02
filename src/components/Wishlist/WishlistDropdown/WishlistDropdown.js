import React from 'react';

import classes from './WishlistDropdown.module.css';

import { connect } from 'react-redux';

import * as action from '../../../store/actions/index';

const WishlistDropdown = props => {

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
        <div className={classes.wishlistContainer}>
            {props.favoriteItemsArr.length === 0 ? <p style={{margin: '1rem 1rem 1rem 1rem', textAlign: 'center'}}>No Favorites!</p> : null}
            {props.favoriteItemsArr.length > 0 ?
                <div className={classes.wishlistItemContainer}>
                {props.favoriteItemsArr.map(fav => (
                        <div className={classes.wishlistFullItemContainer} key={fav.favItemId}>
                            <div className={classes.wishlistItem}>
                                <div className={classes.imageContainer}>
                                    <img src={fav.imageUrl} alt={fav.name} className={classes.wishlistItemImage}/>
                                </div>
                                <div className={classes.wishlistDetails}>
                                    <h2 style={{color: '#fd1783', fontWeight: '500', fontSize: '1.6rem'}} className={classes.cartItemHeading}>
                                        {reduceTitle(17, fav.name)}
                                    </h2>
                                    <h3 style={{color: '#73726c', fontWeight: '300', fontSize: '1.3rem'}} className={classes.cartItemBrand}>{fav.brand}</h3>
                                    <div className={classes.wishlistPrice}>
                                    <h4 style={{color: '#000', marginRight: '1rem', fontWeight: '300'}}>$ {fav.price}</h4>
                                        <del style={{color: '#73726c', fontSize: '1.3rem', fontWeight: '300'}}>$ {fav.originalPrice}</del>
                                    </div>
                                </div>
                            </div>
                            <div>
                               {props.isAuthenticated ? <button className={classes.addToCart} onClick={() => { props.onDeleteFavorite(fav.id, fav); props.onAddToCart(fav); console.log(fav) }}>Add to cart</button> : null}
                            </div>
                            <div className={classes.divider}/>
                        </div>
                ))}
            </div> : null}

            {props.favoriteItemsArr.length !==0 ?  <div className={classes.goToWishlistButtonContainer}>
                <button className={classes.goToWishlist}>
                    Go to wishlist
                </button>
            </div> : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        favoriteItemsArr: state.favorites.favorites,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (fav) => dispatch(action.addCartItem(fav)),
        onDeleteFavorite: (favItemId, favItem) => dispatch(action.deleteFavoriteItem(favItemId, favItem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistDropdown);