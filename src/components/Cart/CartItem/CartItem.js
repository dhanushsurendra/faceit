import React from 'react';

import classes from './CartItem.module.css';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';

import * as action from '../../../store/actions/index';

import { connect } from 'react-redux';

import axios from '../../../axios-firebase';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

const CartItem = props => {

    const placeHolder = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque eligendi alias qui officia recusandae, ea vero explicabo earum amet quos.'

    const [quantity, setQuantity] = React.useState(1);

    let price = props.price * quantity;
    let originalPrice = props.originalPrice * quantity;

    const reduceItemCount = () => {
        if(quantity >= 2) {
            setQuantity(quantity - 1);
            props.priceDecrease(props.price)
            props.originalPriceDecrease(props.price)
        }
    }

    const increaseItemCount = () => {
        if(quantity <= 99) {
            setQuantity(quantity + 1);
            props.priceIncrease(props.price);
            props.originalPriceIncrease(props.price);
        }
    }

    return (
        <div className={classes.cartItemContainer}>
            <div className={classes.cartItemImageContainer}>
                <img src={props.imageUrl} alt={props.name} className={classes.cartItemImage} />
            </div>
            <div className={classes.cartItemDetailsContainer}>
                <h2 style={{color: '#fd1783', fontSize: '2rem', fontWeight: '500', marginBottom: 0}} className={classes.cartItemHeading}>{props.name}</h2>
                <h3 style={{fontWeight: '400', fontSize: '1.8rem', margin: 0}}>{props.brand}</h3>
                <p style={{color: '#333', fontSize: '1.5rem', fontWeight: '300'}}>
                    {props.description !== "" || !props.description ? props.description : placeHolder}
                    {props.description === "" ? placeHolder : ""}
                    {props.description === undefined ? placeHolder : ""}
                </p>
                <div className={classes.cartItemPriceContainer}>
                    <h3 style={{fontSize: '2rem', fontWeight: '400', marginRight: '1rem'}}>$ {(price).toFixed(2)}</h3>
                    <del style={{fontSize: '1.6rem', fontWeight: '400', marginRight: '1rem', color: '#333'}}>$ {(originalPrice).toFixed(2)}</del>
                </div>

                <div className={classes.quantityContainer}>
                    <button className={classes.quantityButton} onClick={reduceItemCount}>
                        <div className={classes.iconContainer}>
                            <RemoveIcon />
                        </div>
                    </button>
                    <input type="text" value={quantity} onChange={event => event.target.value} className={classes.input} disabled />
                    <button className={classes.quantityButton} onClick={increaseItemCount}>
                        <div className={classes.iconContainer}>
                            <AddIcon />
                        </div>
                    </button>
                    <div className={classes.deleteIconContainer} onClick={() => { props.onDeleteCartItem(props.id);}}>
                        <IconButton>
                            <DeleteOutlineIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteCartItem: (id) => dispatch(action.deleteCartItem(id))
    }
}

export default connect(null, mapDispatchToProps)(withErrorHandler(CartItem, axios));