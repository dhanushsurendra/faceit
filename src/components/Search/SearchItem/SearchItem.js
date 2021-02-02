import React from "react";

import classes from "./SearchItem.module.css";

import { IconButton } from "@material-ui/core";

import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import * as action from '../../../store/actions/index';

import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";

const SearchItem = React.memo((props) => {
  const [favorite, setIsFavorite] = React.useState(false);

  const  { removeFavOnCartAdd } = props;

  const isFav = props.isFavOnLoad(props.id)

  React.useEffect(() => {
    console.log('CHECKING IF SEARCH ITEM IS ALREADY LIKED');
    if(isFav) {
      console.log(isFav);
    }
  })

  React.useEffect(() => {
      if(removeFavOnCartAdd) {
        setIsFavorite(false)
      }
  }, [removeFavOnCartAdd])

  let favoriteIcon = (
    <FavoriteBorderOutlinedIcon className={classes.iconOutline} />
  );

  if (favorite) {
    favoriteIcon = <FavoriteOutlinedIcon className={classes.iconFilled} />;
  }

  const alternateImageLoad = event => {
    props.onFetchSingleImage();
    console.log(props.errorImage)
    event.target.src = `${props.errorImage}`;
  }

  const reduceTitle = (limit = 20, name) => {
    const newArr = name.trim().split("");
    const newName = [];
    newArr.reduce((acc, cur) => {
              if ((acc + cur).length <= limit) {
              newName.push(cur);
              }
              return acc + cur;
         }, "");
         return `${newName.join("")}...`;
  };

  let price = props.price;
  let originalPrice = 0;

  if(Number.parseFloat(props.price) === 0.00) {
      price = 8.99;
  }

  originalPrice = ((Number.parseFloat(price) * 0.18) + Number.parseFloat(price)).toFixed(2);

  const toggleFavorite = () => {
    setIsFavorite(!favorite);
  }

  const favItem = {
      favItemId: props.id,
      name: props.name,
      price: Number.parseFloat(price),
      imageUrl: props.image,
      brand: props.brand,
      originalPrice: Number.parseFloat(originalPrice),
      description: props.description,
      isFavorite: true
  }

  return (
    <div className={classes.searchItemContainer}>
      <div className={classes.imageContainer}>
        <img
          onError={alternateImageLoad}
          src={props.image}
          alt={props.name}
          className={classes.image}
        />
      </div>
      <div className={classes.detailsContainer}>
        <Link className={classes.searchItemHeading} to={{pathname: '/searchitemdetails', state: {index: props.index}}} >{reduceTitle(17, props.name)}</Link>
        <div onClick={() => {toggleFavorite(); props.favorite(!favorite, favItem); }}>
          <IconButton>{favoriteIcon}</IconButton>
        </div>
      </div>
      <div className={classes.priceContainer}>
        <h2>$ {price}</h2>
        <h5>
          <del>$ {originalPrice}</del>
        </h5>
      </div>
    </div>
  );
});

const mapDispatchToProps = dispatch => {
  return {
    onFetchSingleImage: () => dispatch(action.fetchSingleImage())
  }
}

const mapStateToProps = state => {
    return {
        errorImage: state.images.singleImageUrl,
        searchQuery: state.search.searchQuery
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchItem));
