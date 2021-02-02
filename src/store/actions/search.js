import * as actionTypes from './actionTypes';

import axios from '../../axios-products';

//import axios from 'axios';

export const fetchSearchStart = () => {
    return {
        type: actionTypes.FETCH_SEARCH_START
    }
}

export const fetchSearchSuccess = (searchResults, searchQuery) => {
    return {
        type: actionTypes.FETCH_SEARCH_SUCCESS,
        results: searchResults,
        searchQuery
    }
}

export const fetchSearchFail = (error) => {
    return {
        type: actionTypes.FETCH_SEARCH_FAIL,
        error: error
    }
}

export const fetchSearchItems = (searchQuery) => {
    return dispatch => {
        dispatch(fetchSearchStart());
        //const proxy = 'https://cors-anywhere.herokuapp.com/';
        axios.get(`/?&product_type=${searchQuery}`)
            .then(responseData => {
                console.log(responseData)
                dispatch(fetchSearchSuccess(responseData.data, searchQuery));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchSearchFail(error))
            })
    }
}