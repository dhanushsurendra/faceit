import * as actionTypes from '../actions/actionTypes';

import {updateObject} from '../../shared/utility';

const initialState = {
    loading: false,
    error: null,
    productType: []
}

const fetchPopularStart = (state) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchPopularSuccess = (state, action) => {
    return updateObject(state, {
            loading: false,
            error: null,
            productType: action.productType
    })
}

const fetchPopularFail = (state, action) => {
    return updateObject(state, {
        error: "Something went wrong",
        loading: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_POPULAR_START:
            return fetchPopularStart(state)
        case actionTypes.FETCH_POPULAR_SUCCESS:
            return fetchPopularSuccess(state, action);
        case actionTypes.FETCH_POPULAR_FAIL:
            return fetchPopularFail(state, action);
        default:
           return state;
    }
}

export default reducer;