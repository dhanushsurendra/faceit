import * as actionTypes from '../actions/actionTypes';

import { updateObject } from '../../shared/utility';

const initialState = {
    error: null,
    loading: false,
    compareItems: []
}

const addCompareStart = (state) => {
    return updateObject(state, {
        loading: true
    })
}

const addCompareSuccess = (state, action) => {
    const oldCompareItems = state.compareItems;
    oldCompareItems.push(action.compareItem);
    return updateObject(state, {
        compareItems: oldCompareItems,
        loading: false,
        error: null
    })
}

const addCompareFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const fetchCompareStart = (state) => {
    return updateObject(state, {
        loading: true
    });
}

const fetchCompareSuccess = (state, action) => {

    const loadedCompareItems = [];
    for(let key in action.compareItems) {
        loadedCompareItems.push({
            id: key,
            favItemId: action.compareItems[key].favItemId,
            brand: action.compareItems[key].brand,
            name: action.compareItems[key].name,
            price: action.compareItems[key].price,
            imageUrl: action.compareItems[key].imageUrl,
            originalPrice: action.compareItems[key].originalPrice,
            description: action.compareItems[key].description,
            colors: action.compareItems[key].colors,
            productType: action.compareItems[key].product_type,
            category: action.compareItems[key].category
        })
    }

    return updateObject(state, {
        loading: false,
        compareItems: loadedCompareItems
    });
}

const fetchCompareFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const deleteCompareStart = (state) => {
    return updateObject(state, {
        loading: true
    });
}

const deleteCompareSuccess = (state, action) => {
    const loadedCompareItems = state.compareItems;
    const newCompareItems = loadedCompareItems.filter(item => {
        return item.id !== action.compareItemId
    });

    return updateObject(state, {
        loading: false,
        compareItems: newCompareItems
    });
}

const deleteCompareFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_COMPARE_START:
            return addCompareStart(state)
        case actionTypes.ADD_COMPARE_SUCCESS:
            return addCompareSuccess(state, action)
        case actionTypes.ADD_COMPARE_FAIL:
            return addCompareFail(state, action)
        case actionTypes.FETCH_COMPARE_SUCCESS:
            return fetchCompareSuccess(state, action)
        case actionTypes.FETCH_COMPARE_FAIL:
            return fetchCompareFail(state, action)
        case actionTypes.FETCH_COMPARE_START:
            return fetchCompareStart(state)
        case actionTypes.DELETE_COMPARE_START:
            return deleteCompareStart(state)
        case actionTypes.DELETE_COMPARE_SUCCESS:
            return deleteCompareSuccess(state, action)
        case actionTypes.DELETE_COMPARE_FAIL:
            return deleteCompareFail(state, action)
        default:
            return state;
    }
}

export default reducer;