import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
    loading: false,
    error: null,
    results: [],
    searchQuery: '',
    noResult: false
}

const fetchSearchStart = (state) => {
    return updateObject(state, {
        loading: true,
        error: null,
        noResult: false
    })
}

const fetchSearchSuccess = (state, action) => {
    let noResult = state.noResult;
    if(action.results.length === 0) {
        noResult = true;
    }
    return updateObject(state, {
        results: action.results,
        loading: false,
        error: null,
        searchQuery: action.searchQuery,
        noResult: noResult
    })
}

const fetchSearchFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        noResult: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_SEARCH_START:
            return fetchSearchStart(state)
        case actionTypes.FETCH_SEARCH_SUCCESS:
            return fetchSearchSuccess(state, action)
        case actionTypes.FETCH_SEARCH_FAIL:
            return fetchSearchFail(state, action);
        default:
            return state;
    }
}

export default reducer;