import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
    error: null,
    loading: false,
    favorites: [],
    snackbarLoading: false
}

const fetchFavoritesStart = (state) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchFavoritesSuccess = (state, action) => {
    const loadedFavoriteItems = [];
    for(let key in action.favorites) {
        loadedFavoriteItems.push({
            id: key,
            favItemId: action.favorites[key].favItemId,
            brand: action.favorites[key].brand,
            name: action.favorites[key].name,
            price: action.favorites[key].price,
            imageUrl: action.favorites[key].imageUrl,
            originalPrice: action.favorites[key].originalPrice,
            isFavorite: action.favorites[key].isFavorite,
            description: action.favorites[key].description
        })
    }

    return updateObject(state, {
        loading: false,
        error: null,
        favorites: loadedFavoriteItems
    })
}

const fetchFavoritesFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const addFavoriteStart = (state) => {
    return updateObject(state, {
        loading: true
    })
}

const addFavoriteSuccess = (state, action) => {
    let favoritesArr = state.favorites;
    favoritesArr.push(action.favoriteItem)
    return updateObject(state, {
        favorites: favoritesArr,
        loading: false,
        error: null
    })
}

const addFavoriteFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const deleteFavoriteStart = (state) => {
    return updateObject(state, {
        loading: false,
        snackbarLoading: true
    })
}

const deleteFavoriteSuccess = (state, action) => {
    const favoriteItemsArr = state.favorites;
    const newFavoriteItemsArr = favoriteItemsArr.filter(item => item.id !== action.favoriteItemId);
    return updateObject(state,  {
        favorites: newFavoriteItemsArr,
        loading: false,
        snackbarLoading: false
    })
}

const deleteFavoriteFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        snackbarLoading: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_FAVORITES_START:
            return fetchFavoritesStart(state)
        case actionTypes.FETCH_FAVORITES_SUCCESS:
            return fetchFavoritesSuccess(state, action);
        case actionTypes.FETCH_FAVORITES_FAIL:
            return fetchFavoritesFail(state, action)
        case actionTypes.ADD_FAVORITE_START:
            return addFavoriteStart(state)
        case actionTypes.ADD_FAVORITE_SUCCESS:
            return addFavoriteSuccess(state, action);
        case actionTypes.ADD_FAVORITE_FAIL:
            return addFavoriteFail(state, action)
        case actionTypes.DELETE_FAVORITE_START:
            return deleteFavoriteStart(state)
        case actionTypes.DELETE_FAVORITE_SUCCESS:
            return deleteFavoriteSuccess(state, action)
        case actionTypes.DELETE_FAVORITE_FAIL:
            return deleteFavoriteFail(state, action)
        default:
            return state;
    }
}

export default reducer;