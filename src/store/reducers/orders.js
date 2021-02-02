import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state) => {
    return updateObject(state, { purchased: false })
}

const purchaseProductStart = (state) => {
    return updateObject(state, { loading: true })
}

const purchaseProductSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId })
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
}

const purchaseProductFail = (state) => {
    return updateObject(state, { loading: false })
}

const fetchOrderStart = (state) => {
    return updateObject(state, { loading: true })
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        orders: action.orders
     })
}

const fetchOrderFail = (state) => {
    return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state);
        case actionTypes.PURCHASE_PRODUCT_START: return purchaseProductStart(state);
        case actionTypes.PURCHASE_PRODUCT_SUCCESS: return purchaseProductSuccess(state, action);
        case actionTypes.PURCHASE_PRODUCT_FAIL: return purchaseProductFail(state);
        case actionTypes.FETCH_ORDER_START: return fetchOrderStart(state);
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action);
        case actionTypes.FETCH_ORDER_FAIL: return fetchOrderFail(state);
        default: return state;
    }
}

export default reducer;