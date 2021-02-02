import * as actionTypes from './actionTypes';

import axios from '../../axios-firebase';

export const purchaseProductSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseProductFail = (error) => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_FAIL,
        error: error
    }
}

export const purchaseProductStart = () => {
    return {
        type: actionTypes.PURCHASE_PRODUCT_START
    }
}

export const purchaseProduct = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseProductStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                console.log(response)
                dispatch(purchaseProductSuccess(response.data, orderData))
            })
            .catch(error => {
                console.log(error)
                dispatch(purchaseProductFail(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                console.log(res)
                const fetchOrders = [];
                for (let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                console.log(fetchOrders)
                dispatch(fetchOrdersSuccess(fetchOrders))
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            })
    }
}