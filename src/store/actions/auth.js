import * as actionTypes from './actionTypes';

import axios from '../../axios-firebase';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authTimeCheckout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000 );
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbzqG3t11mSlqtX4tdmecunGV6J5RBl0s'

        if(!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbzqG3t11mSlqtX4tdmecunGV6J5RBl0s'
        }

        axios.post(url, authData)
            .then(reponse => {
                console.log(reponse)
                const expirationDate = new Date(new Date().getTime() + reponse.data.expiresIn * 1000);
                localStorage.setItem('token', reponse.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', reponse.data.localId);
                dispatch(authSuccess(reponse.data.idToken, reponse.data.localId));
                dispatch(authTimeCheckout(reponse.data.expiresIn))
            })
            .catch(err => {
                console.log(err.response.data.error.message)
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate >= new Date()) {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId));
                dispatch(authTimeCheckout((expirationDate.getTime() - new Date().getTime()) / 1000))
            } else {
                dispatch(logout());
            }
        }
    }
}