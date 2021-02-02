import React from 'react';

import classes from './AddToCartButton.module.css';

import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import * as action from '../../../store/actions/index';

const AddToCart = React.memo(props => {

    console.log('RENDERING CART BUTTON')

    const [buttonTextCart, setButtonTextCart] = React.useState("Add to cart");
    const [buttonTextWishlist, setButtonTextWishlist] = React.useState("Add to wishlist");

    const goToCartHandler = () => {
        props.history.push('/cart')
    }

    const goToWishlistHandler = () => {
        props.history.push('/wishlist')
    }

    const cartItemsArr = useSelector(state => state.cart.cartItemsArr)
    const favItemsArr = useSelector(state => state.favorites.favorites)

    React.useEffect(() => {
        cartItemsArr.map(item => {
            if(item.cartItemId === props.item.favItemId) {
                console.log(item.id, props.item.id)
                setButtonTextCart("Go to cart")
            }
        })

        favItemsArr.map(item => {
            if(item.favItemId === props.item.favItemId) {
                setButtonTextWishlist("Go to wishlist")
            }
        })
    }, [])

    const dispatch = useDispatch();

    const onAddToCart = (cartItem) => dispatch(action.addCartItem(cartItem));
    const onAddToWishlist = (favItem) => dispatch(action.addFavoriteItem(favItem));

    const [disable, setDisable] = React.useState(false);

    const disableWishlistButton = (value) => {
        setDisable(value)
    }

    return <React.Fragment>
                <button className={classes.addToCart} onClick={() => {
                    setButtonTextCart("Go to cart");
                    if(buttonTextCart === "Go to cart") {
                        goToCartHandler()
                    } else if(buttonTextCart === "Add to cart") {
                            onAddToCart({
                                brand: props.item.brand,
                                description: props.item.description,
                                favItemId: props.item.favItemId,
                                name: props.item.name,
                                price: props.item.price,
                                imageUrl: props.item.imageUrl,
                                id: props.item.id,
                                originalPrice: props.item.originalPrice,
                                isFavorite: false
                            })
                    } disableWishlistButton(true)}}>{buttonTextCart}</button>

            <button disabled={disable} className={classes.addToWishlist} onClick={() => {
                setButtonTextWishlist("Go to wishlist");
                if(buttonTextWishlist === "Go to wishlist") {
                    goToWishlistHandler()
                } else if(buttonTextWishlist === "Add to wishlist") {
                        onAddToWishlist({
                            brand: props.item.brand,
                            description: props.item.description,
                            favItemId: props.item.favItemId,
                            name: props.item.name,
                            price: props.item.price,
                            imageUrl: props.item.imageUrl,
                            id: props.item.id,
                            originalPrice: props.item.originalPrice,
                            isFavorite: false
                        })
                }}}>{buttonTextWishlist}</button>
        </React.Fragment>
})

export default withRouter(AddToCart);