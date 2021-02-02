import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
    error: null,
    results: [],
    searchQuery: '',
    imageUrls: [],
    singleImageUrl: '',
    counter: 0
}

const fetchSingleImages = (state) => {
    let counter = state.counter;
    let imageUrl = '';
    imageUrl = state.imageUrls[counter];
    counter++;

    return updateObject(state, {
        singleImageUrl: imageUrl,
        counter: counter
    })
}

const fetchPhotoStart = (state) => {
    return updateObject(state, {
        error: null
    })
}

const fetchPhotoSuccess = (state, action) => {
    const imageUrls = [];
        action.results.forEach((item) => {
            imageUrls.push(item.urls.small)
    });

    console.log(imageUrls);

    return updateObject(state, {
        results: action.results,
        error: null,
        searchQuery: action.searchQuery,
        imageUrls: imageUrls
    })
}

const fetchPhotoFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_PHOTO_START:
            return fetchPhotoStart(state)
        case actionTypes.FETCH_PHOTO_SUCCESS:
            return fetchPhotoSuccess(state, action)
        case actionTypes.FETCH_PHOTO_FAIL:
            return fetchPhotoFail(state, action);
        case actionTypes.FETCH_SINGLE_IMAGE:
            return fetchSingleImages(state);
        default:
            return state;
    }
}

export default reducer;