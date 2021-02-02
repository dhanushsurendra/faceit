import * as actionTypes from './actionTypes';

import axios from '../../axios-products';

export const fetchPopularStart = () => {
    return {
        type: actionTypes.FETCH_POPULAR_START,
    }
}

export const fetchPopularSuccess = (productType) => {
    return {
        type: actionTypes.FETCH_POPULAR_SUCCESS,
        productType
    }
}

export const fetchPopularFail = (error) => {
    return {
        type: actionTypes.FETCH_POPULAR_FAIL,
        error: error
    }
}

export const fetchPopularProducts = () => {
       return dispatch => {
        dispatch(fetchPopularStart());
        axios.get('/')
            .then(responseData => {
                console.log(responseData);
                const productType = [];
                responseData.data.forEach(product => {

                    const productTypeIndex = productType.findIndex(item => item.productType === product.product_type);

                    if(productTypeIndex === -1) {
                        productType.push({
                            productType: product.product_type,
                            imgUrl: product.image_link,
                        });
                    }
                });
                dispatch(fetchPopularSuccess(productType));
            })
            .catch(error => {
                dispatch(fetchPopularFail(error))
                console.log(error)
            })
    }
}
