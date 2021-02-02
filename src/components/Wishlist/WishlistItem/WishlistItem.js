import React from 'react';

import classes from './WishlistItem.module.css';

import testing from '../../../assests/testing.jpg';

import * as action from '../../../store/actions/index';

import { connect } from 'react-redux';

import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";

const WishlistItem = props => {

    const [favorite, setIsFavorite] = React.useState(true);

    const toggleFavorite = () => {
        setIsFavorite(!favorite);
    }

    let favoriteIcon = (
        <FavoriteBorderOutlinedIcon className={classes.iconOutline} />
    );

    if (favorite) {
        favoriteIcon = <FavoriteOutlinedIcon className={classes.iconFilled} />;
    }

    return (
        <div className={classes.favItemContainer}>
            <div className={classes.imageContainer}>
                <img src={props.imageUrl} alt={props.name} className={classes.image} />
            </div>
            <div className={classes.favItemDetailsContainer}>
                <div className={classes.favItemDetails}>
                    <h2 style={{color: '#fd1783', fontSize: '2rem', fontWeight: '500', marginBottom: 0}}>{props.name}</h2>
                    <h3 style={{fontWeight: '400', fontSize: '1.8rem', margin: 0}}>{props.brand}</h3>
                </div>
                <div className={classes.favItemPriceContainer}>
                    <h3 style={{fontSize: '2rem', fontWeight: '400', marginRight: '1rem'}}>$ {props.price}</h3>
                    <del style={{fontSize: '1.6rem', fontWeight: '400', marginRight: '1rem', color: '#333'}}>$ 766</del>
                </div>
            </div>
            <div className={classes.iconContainer} onClick={() => { toggleFavorite(); if(favorite) { props.onFavoriteItemRemove(props.id) } }}>
                {favoriteIcon}
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onFavoriteItemRemove: (id) => dispatch(action.deleteFavoriteItem(id))
    }
}

export default connect(null, mapDispatchToProps)(WishlistItem);