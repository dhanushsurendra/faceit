import axios from '../../axios-firebase';

import * as actionTypes from './actionTypes';

export const fetchFavoritesStart = () => {
    return {
        type: actionTypes.FETCH_FAVORITES_START
    }
}

export const fetchFavoritesSuccess = (favorites) => {
    return {
        type: actionTypes.FETCH_FAVORITES_SUCCESS,
        favorites
    }
}

export const fetchFavoritesFail = (error) => {
    return {
        type: actionTypes.FETCH_FAVORITES_FAIL,
        error
    }
}

export const addFavoriteStart = () => {
    return {
        type: actionTypes.ADD_FAVORITE_START
    }
}

export const addFavoriteSuccess = (favoriteItem) => {
    return {
        type: actionTypes.ADD_FAVORITE_SUCCESS,
        favoriteItem
    }
}

export const addFavoriteFail = (error) => {
    return {
        type: actionTypes.ADD_FAVORITE_FAIL,
        error
    }
}

export const deleteFavoriteStart = () => {
    return {
        type: actionTypes.DELETE_FAVORITE_START,
    }
}

export const deleteFavoriteSuccess = (favoriteItemId, favItem) => {
    return {
        type: actionTypes.DELETE_FAVORITE_SUCCESS,
        favoriteItemId,
        favItem
    }
}

export const deleteFavoriteFail = (error) => {
    return {
        type: actionTypes.DELETE_FAVORITE_SUCCESS,
        error
    }
}

export const deleteFavoriteItem = (favItemId, favItem) => {
    console.log(favItemId)
    return dispatch => {
        dispatch(deleteFavoriteStart())
        axios.delete(`/favorites/${favItemId}.json`)
            .then(response => {
                dispatch(deleteFavoriteSuccess(favItemId, favItem))
            })
            .catch(error => {
                dispatch(deleteFavoriteFail(error))
            })
    }
}

export const addFavoriteItem = (favItem) => {
    return dispatch => {
        dispatch(fetchFavoritesStart())
        axios.post('./favorites.json', favItem)
            .then(responseData => {
                console.log(responseData)
                dispatch(addFavoriteSuccess({
                    id: responseData.data.name,
                    ...favItem
                }))
            })
            .catch(error => {
                dispatch(addFavoriteFail(error))
            })
        }
}

export const initFavorites = () => {
    return dispatch => {
        dispatch(fetchFavoritesStart())
        axios.get('/favorites.json')
            .then(responseData => {
                dispatch(fetchFavoritesSuccess(responseData.data));
            })
            .catch(error => {
                dispatch(fetchFavoritesFail(error))
           })
    }
}