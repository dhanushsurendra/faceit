import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
    loading: false,
    error: null,
    cartItemsArr: [],
    favoriteId: -1,
    snackbarLoading: false
}

const fetchCartStart = (state) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchCartSuccess = (state, action) => {
    const loadedCartItems = [];
    for(const key in action.results) {
        loadedCartItems.push({
            id: key,
            cartItemId: action.results[key].favItemId,
            brand: action.results[key].brand,
            name: action.results[key].name,
            price: action.results[key].price,
            imageUrl: action.results[key].imageUrl,
            originalPrice: action.results[key].originalPrice,
            description: action.results[key].description
        })
    }

    return updateObject(state, {
        loading: false,
        error: null,
        cartItemsArr: loadedCartItems
    })
}

const fetchCartFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const addCartItemStart = (state) => {
    return updateObject(state, {
        loading: false
    })
}

const addCartItemSuccess = (state, action) => {
    const newCartItemsArr = state.cartItemsArr;
    newCartItemsArr.push(action.cartItem);
    return updateObject(state, {
        cartItemsArr: newCartItemsArr,
        isFavorite: action.cartItem.favItemId
    })
}

const addCartItemFail = (state, action) => {
    return updateObject(state, {
        snackbarLoading: false,
        error: action.error
    })
}

const deleteCartItemStart = (state) => {
    return updateObject(state, {
        snackbarLoading: true
    })
}

const deleteCartItemSuccess = (state, action) => {
    const cartItems = state.cartItemsArr;
    let newCartItemArr = [];
    newCartItemArr = cartItems.filter(cartItem => {
        return cartItem.id !== action.cartItemId;
    })

    return updateObject(state, {
        cartItemsArr: newCartItemArr,
        snackbarLoading: false
    })
}

const deleteCartItemFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_CART_START:
            return fetchCartStart(state);
        case actionTypes.FETCH_CART_SUCCESS:
            return fetchCartSuccess(state, action);
        case actionTypes.FETCH_CART_FAIL:
            return fetchCartFail(state, action);
        case actionTypes.ADD_CART_START:
            return addCartItemStart(state);
        case actionTypes.ADD_CART_SUCCESS:
            return addCartItemSuccess(state, action);
        case actionTypes.ADD_CART_FAIL:
            return addCartItemFail(state, action);
        case actionTypes.DELETE_CART_START:
            return deleteCartItemStart(state)
        case actionTypes.DELETE_CART_SUCCESS:
            return deleteCartItemSuccess(state, action);
        case actionTypes.DELETE_CART_FAIL:
            return deleteCartItemFail(state, action)
        default:
            return state;
    }
}

export default reducer;



