import * as actionTypes from './actionTypes';

//import axios from '../../axios-search';
import axios from 'axios';

export const fetchSingleImage = () => {
    return {
        type: actionTypes.FETCH_SINGLE_IMAGE,
    }
}

export const fetchPhotoStart = () => {
    return {
        type: actionTypes.FETCH_PHOTO_START
    }
}

export const fetchPhotoSuccess = (searchResults, searchQuery, imageUrls) => {
    return {
        type: actionTypes.FETCH_PHOTO_SUCCESS,
        results: searchResults,
        searchQuery
    }
}

export const fetchPhotoFail = (error) => {
    return {
        type: actionTypes.FETCH_PHOTO_FAIL,
        error: error
    }
}

export const fetchPhotoItems = (searchQuery) => {
    return dispatch => {
        dispatch(fetchPhotoStart());
        axios.get(`https://api.unsplash.com/search/photos?query=${searchQuery}+makeup&client_id=jn0mBwsRF8OXSB0feq2fBS6ulTf-eNUNWHUvBdOeZb8&per_page=30`)
            .then(responseData => {
                dispatch(fetchPhotoSuccess(responseData.data.results, searchQuery))
                dispatch(fetchSingleImage())
                console.log(responseData.data.results);
            })
            .catch(error => {
                dispatch(fetchPhotoFail())
                console.log(error);
            })
    }
}