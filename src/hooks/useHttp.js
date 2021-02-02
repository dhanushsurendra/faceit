import React from 'react';

const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null
}

const httpReducer = (curHttpState, action) => {
    switch(action.type) {
        case 'SEND':
            return { loading: true, error: false, data: null, extra: null, identifier: action.identifier};
        case 'RESPONSE':
            return { ...curHttpState, loading: false, error: null, data: action.data, extra: action.extra }
        case 'ERROR':
            return { loading: false, error: action.errorMessage }
        case 'CLEAR':
            return initialState;
        default:
            throw new Error('Should not get here')
    }
}

const useHttp = () => {
    
    const [httpState, dispatchHttp] = React.useReducer(httpReducer, initialState);

    const clear = React.useCallback(() => dispatchHttp({type: 'CLEAR'}), []);

    const sendRequest = React.useCallback((url, method, body, reqExtra, reqIdentifier) => {
        dispatchHttp({type: 'SEND', identifier: reqIdentifier})
        fetch(url, {
            method: method,
            body: body,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(responseData => {
            dispatchHttp({type: 'RESPONSE', data: responseData, extra: reqExtra})
            console.log(responseData);
        })
        .catch(error => {
            dispatchHttp({type: 'ERROR', errorMessage: "Something went wrong!"})
            console.log(error)
        })
    }, []);

    return {
        isLoading: httpState.loading,
        error: httpState.error,
        data: httpState.data,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        clear: clear
    }
}

export default useHttp;