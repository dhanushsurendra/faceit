import * as actionTypes from './actionTypes';

import axios from '../../axios-firebase';

export const addCompareStart = () => {
    return {
        type: actionTypes.ADD_COMPARE_START
    }
}

export const addCompareSuccess = (compareItem) => {
    return {
        type: actionTypes.ADD_COMPARE_SUCCESS,
        compareItem
    }
}

export const addCompareFail = (error) => {
    return {
        type: actionTypes.ADD_COMPARE_FAIL,
        error: error
    }
}

export const fetchCompareStart = () => {
    return {
        type: actionTypes.FETCH_COMPARE_START
    }
}

export const fetchCompareSuccess = (compareItems) => {
    return {
        type: actionTypes.FETCH_COMPARE_SUCCESS,
        compareItems
    }
}

export const fetchCompareFail = (error) => {
    return {
        type: actionTypes.FETCH_COMPARE_FAIL,
        error: error
    }
}

export const deleteCompareStart = () => {
    return {
        type: actionTypes.DELETE_COMPARE_START
    }
}

export const deleteCompareSuccess = (compareItemId) => {
    return {
        type: actionTypes.DELETE_COMPARE_SUCCESS,
        compareItemId
    }
}

export const deleteCompareFail = (error) => {
    return {
        type: actionTypes.DELETE_COMPARE_FAIL,
        error
    }
}

export const deleteCompare = (compareItemId) => {
    console.log(compareItemId)
    return dispatch => {
        dispatch(deleteCompareStart());
        axios.delete(`./compare/${compareItemId}.json`)
            .then(response => {
                dispatch(deleteCompareSuccess(compareItemId))
            })
            .catch(error => {
                dispatch(deleteCompareFail(error))
            })
    }
}

export const compare = (compareItem) => {
    console.log(compareItem)
    return dispatch => {
        dispatch(fetchCompareStart())
        axios.post('./compare.json', compareItem)
            .then(responseData => {
                console.log(responseData)
                dispatch(addCompareSuccess({
                    id: responseData.data.name,
                    ...compareItem
                }))
            })
            .catch(error => {
                dispatch(addCompareFail(error))
            })
        }
}

export const initCompare = () => {
    return dispatch => {
        dispatch(fetchCompareStart())
        axios.get('/compare.json')
            .then(responseData => {
                console.log(responseData)
                dispatch(fetchCompareSuccess(responseData.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchCompareFail(error))
           })
    }
}
