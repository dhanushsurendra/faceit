import React from 'react';

import { connect } from 'react-redux';

import classes from './SearchRelated.module.css';

import * as action from '../../../store/actions/index';

const SearchRelated = props => {

    const alternateImage = (event) => {
        props.onFetchSingleImage();
        event.target.src = `${props.errorImage}`;
    }

    const placeHolder = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque eligendi alias qui officia recusandae, ea vero explicabo earum amet quos.'

    let originalPrice = 0
    originalPrice = ((Number.parseFloat(props.price) * 0.18) + Number.parseFloat(props.price)).toFixed(2);

    return (
        <div className={classes.searchRelatedItemContainer}>
            <div className={classes.searchRelatedImageContainer}>
                <img onError={alternateImage} src={props.imageUrl} alt={props.name} className={classes.searchRelatedImage} />
            </div>
            <div className={classes.searchRelatedDetailsContainer}>
                <h2 style={{color: '#fd1783', fontSize: '2rem', fontWeight: '500', marginBottom: 0}}>{props.name}</h2>
                <h3 style={{fontWeight: '400', fontSize: '1.8rem', margin: 0}}>{props.brand}</h3>
                <p style={{color: '#333', fontSize: '1.5rem', fontWeight: '300'}}>
                    {props.description !== "" || !props.description ? props.description : placeHolder}
                    {props.description === "" ? placeHolder : ""}
                    {props.description === undefined ? placeHolder : ""}
                </p>
                <div className={classes.searchRelatedPriceContainer}>
                    <h3 style={{fontSize: '2rem', fontWeight: '400', marginRight: '1rem'}}>$ {props.price}</h3>
                    <del style={{fontSize: '1.6rem', fontWeight: '400', marginRight: '1rem', color: '#333'}}>$ {originalPrice}</del>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = state => {
    return {
        errorImage: state.images.singleImageUrl
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onFetchSingleImage: () => dispatch(action.fetchSingleImage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchRelated);