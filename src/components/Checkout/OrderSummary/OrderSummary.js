import React from 'react';

import classes from './OrderSummary.module.css';

const OrderSummary = props => {

    const placeHolder = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque eligendi alias qui officia recusandae, ea vero explicabo earum amet quos.'

    return (
        <div className={classes.orderSummaryItemContainer}>
            <div className={classes.imageContainer}>
                <img src={props.item.imageUrl} alt={props.item.name}  className={classes.image}/>
            </div>
            <div className={classes.orderSummaryDetailsContainer}>
                <h2 style={{color: '#fd1783', fontSize: '2rem', fontWeight: '500', marginBottom: 0}}>{props.item.name}</h2>
                <h3 style={{fontWeight: '400', fontSize: '1.8rem', margin: 0}}>{props.item.brand}</h3>
                <p style={{color: '#333', fontSize: '1.5rem', fontWeight: '300'}}>
                    {props.item.description !== "" || !props.item.description ? props.item.description : placeHolder}
                    {props.item.description === "" ? placeHolder : ""}
                    {props.item.description === undefined ? placeHolder : ""}
                </p>
                <div className={classes.orderSummaryPriceContainer}>
                    <h3 style={{fontSize: '2rem', fontWeight: '400', marginRight: '1rem'}}>$ {props.item.price}</h3>
                    <del style={{fontSize: '1.6rem', fontWeight: '400', marginRight: '1rem', color: '#333'}}>$ {props.item.originalPrice}</del>
                </div>
            </div>
        </div>
    )
}
export default OrderSummary;