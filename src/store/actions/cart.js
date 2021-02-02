import * as actionTypes from './actionTypes';

import axios from '../../axios-firebase';

export const fetchCartStart = () => {
    return {
        type: actionTypes.FETCH_CART_START
    }
}

export const fetchCartSuccess = (results) => {

    return {
        type: actionTypes.FETCH_CART_SUCCESS,
        results
    }
}

export const fetchCartFail = (error) => {
    return {
        type: actionTypes.FETCH_CART_FAIL,
        error
    }
}

export const addCartItemStart = () => {
    return {
        type: actionTypes.ADD_CART_START
    }
}

export const addCartItemSuccess = (cartItem) => {
    return {
        type: actionTypes.ADD_CART_SUCCESS,
        cartItem
    }
}

export const addCartItemFail = (error) => {
    return {
        type: actionTypes.ADD_CART_FAIL,
        error
    }
}

export const deleteCartItemStart = () => {
    return {
        type: actionTypes.DELETE_CART_START,
    }
}

export const deleteCartItemSuccess = (cartItemId) => {
    return {
        type: actionTypes.DELETE_CART_SUCCESS,
        cartItemId
    }
}

export const deleteCartItemFail = (error) => {
    return {
        type: actionTypes.DELETE_FAVORITE_FAIL,
        error
    }
}

export const deleteCartItem = (cartItemId) => {
    console.log(cartItemId);
    return dispatch => {
        dispatch(deleteCartItemStart())
        axios.delete(`/cart/${cartItemId}.json`)
            .then(response => {
                dispatch(deleteCartItemSuccess(cartItemId))
            })
            .catch(error => {
                dispatch(deleteCartItemFail(error))
            })
    }
}

export const addCartItem = (cartItem) => {
    return dispatch => {
        dispatch(addCartItemStart())
        axios.post('/cart.json', cartItem)
            .then(response => {
                dispatch(addCartItemSuccess(cartItem));
            })
            .catch(error => {
                dispatch(addCartItemFail(error))
            })
    }
}

export const initCart = () => {
    return dispatch =>{
        dispatch(fetchCartStart());
        axios.get('/cart.json')
            .then(responseData => {
                dispatch(fetchCartSuccess(responseData.data));
                console.log(responseData.data);
            })
            .catch(error => {
                dispatch(fetchCartFail(error));
                console.log(error);
            })
        }
}

