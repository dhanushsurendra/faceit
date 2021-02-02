import React from 'react';

import * as action from '../../../store/actions/index';

import classes from './AddToWishlistButton.module.css';

import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

const AddToWishlistButton = React.memo(props => {

    console.log('RENDERING WISHLIST BUTTON')

    React.useEffect(() => {
        favItemsArr.map(item => {
            if(item.favItemId === props.item.favItemId) {
                setButtonTextWishlist("Go to wishlist")
            }
        })
    }, [])
    
    return
})

export default withRouter(AddToWishlistButton);