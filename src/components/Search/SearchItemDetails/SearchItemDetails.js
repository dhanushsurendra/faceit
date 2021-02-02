import React from 'react';

import Toolbar from '../../Toolbar/Toolbar';

import classes from './SearchItemDetails.module.css';

import { withRouter, Redirect } from 'react-router-dom';

import { useSelector, connect } from 'react-redux';

import * as action from '../../../store/actions/index';

import SearchRelated from '../SearchRelated/SearchRelated';

import Spinner from '../../../ui/Spinner/Spinner';

const SearchItemDetails = props => {

    const searchDetails = useSelector(state => state.search.results[props.location.state.index]);
    const [buttonText, setButtonText] = React.useState("Add to cart");

    React.useEffect(() => {
        console.log('CHECKING IF CART ITEM EXISTS')
        props.cartItemsArr.forEach(cartItem => {
            if(cartItem.cartItemId === searchDetails.id) {
                console.log(cartItem.id === searchDetails.id);
                setButtonText("Go to cart")
            }
        })
    }, [])

    const placeHolder = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque eligendi alias qui officia recusandae, ea vero explicabo earum amet quos.'

    const alternateImage = (event) => {
        props.onFetchSingleImage();
        let count = 0;
        if(count <= 0) {
            event.target.src = `${props.errorImage}`;
            count++;
        }
    }

    const { searchResults } = props;

    // React.useEffect(() => {
    //     if(searchResults.length === 0) {
    //         props.history.push('/')
    //     }
    // }, [searchResults])

    let originalPrice = 0
    originalPrice = ((Number.parseFloat(searchDetails.price) * 0.18) + Number.parseFloat(searchDetails.price)).toFixed(2);

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const goToCartHandler = () => {
        props.history.push('/cart');
    }

    const goToCheckout = () => {
        props.history.push('/checkout')
    }

    const cartItem = {
        favItemId: searchDetails.id,
        name: searchDetails.name,
        brand: searchDetails.brand,
        description: searchDetails.description,
        imageUrl: searchDetails.image_link,
        price: searchDetails.price,
        originalPrice: originalPrice,
        product_type: searchDetails.product_type,
        category: searchDetails.category,
        colors: searchDetails.product_colors,
    }

    let searchItemDetails = <Spinner width={100} height={100} margin={60}/>;
    if(!props.loading) {
        searchItemDetails = (
            <React.Fragment>
                <div className={classes.productContainer}>
                    <div className={classes.imageContainer}>
                        <img onError={alternateImage} src={searchDetails.image_link} alt="testing" className={classes.productImage} />
                    </div>
                    <div className={classes.productDetailsContainer}>
                        <h2 style={{color: '#fd1783', fontSize: '2rem', fontWeight: '500', marginBottom: 0}}>{searchDetails.name}</h2>
                        <h3 style={{fontWeight: '400', fontSize: '1.8rem', margin: 0}}>{searchDetails.brand}</h3>
                        <p style={{color: '#333', fontSize: '1.5rem', fontWeight: '300'}}>
                            {searchDetails.description !== "" || !searchDetails.description ? searchDetails.description : placeHolder}
                            {searchDetails.description === "" ? placeHolder : ""}
                            {searchDetails.description === undefined ? placeHolder : ""}
                        </p>
                        <div className={classes.priceContainer}>
                            <h3 style={{fontSize: '2rem', fontWeight: '400', marginRight: '1rem'}}>$ {searchDetails.price}</h3>
                            <del style={{fontSize: '1.6rem', fontWeight: '400', marginRight: '1rem', color: '#333'}}>$ {originalPrice}</del>
                        </div>
                        {searchDetails.product_colors !== undefined || searchDetails.tag_list.length !== 0 ?
                        <div className={classes.colorsContainer}>
                            {searchDetails.product_colors.length !== 0 ? <h3 style={{fontWeight: '400', fontSize: '1.8rem', margin: 0, color: '#fd1783'}}>Colors</h3> : null}
                            <div className={classes.colorsItemContainer}>
                                {searchDetails.product_colors.map(color => (
                                    <div key={color.color_name} className={classes.colors} style={{backgroundColor: `${color.hex_value}`}} />
                                ))}
                            </div>
                        </div> : null}
                        {searchDetails.tag_list !== undefined || searchDetails.tag_list.length !== 0 ? <div className={classes.tagContainer}>
                            {searchDetails.tag_list.length !== 0 ? <h3 style={{fontWeight: '400', fontSize: '1.8rem', margin: 0, color: '#fd1783'}}>Tags</h3> : null}
                            <div className={classes.tagItemContainer}>
                                {searchDetails.tag_list.map((tag) => (
                                    <div key={tag} className={classes.tagItem}>{tag}</div>
                                ))}
                            </div>
                        </div> : null }
                        <h4 style={{color: '#7ecf13', fontWeight: 500, fontSize: '1.8rem'}}>In stock</h4>
                        <div className={classes.buttonContainer}>
                            <button className={classes.buyButton} onClick={goToCheckout}>Buy now</button>
                            <button className={classes.addToCartButton} onClick={() => {
                                            setButtonText("Go to cart");
                                            if(buttonText === "Go to cart") {
                                              goToCartHandler()
                                            }
                                            if(buttonText === "Add to cart") {
                                                props.onAddToCart(cartItem)
                                            }}}>{buttonText}</button>
                        </div>
                        <h4 style={{fontWeight: 400, fontSize: '1.6rem'}}>Seller's Website: <a href={searchDetails.website_link} target="_blank" className={classes.link}>{searchDetails.name}</a></h4>
                        <button className={classes.addToCompareButton} onClick={() => props.onCompareAdd(cartItem)}>Add to compare</button>
                    </div>
                </div>

                <div className={classes.searchRelatedContainer}>
                    <h2>Related To Search</h2>
                    {props.search.map((item, index) => {
                        if(index === props.location.state.index) {
                            return;
                        } else {
                            return <SearchRelated
                                        imageUrl={item.image_link}
                                        name={item.name}
                                        brand={item.brand}
                                        key={item.id}
                                        description={item.description}
                                        price={item.price} />
                        }})}
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Toolbar />
            {searchItemDetails}
        </React.Fragment>

    )
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchSingleImage: () => dispatch(action.fetchSingleImage()),
        onAddToCart: (fav) => dispatch(action.addCartItem(fav)),
        onCompareAdd: (compareItem) => dispatch(action.compare(compareItem))
    }
}

const mapStateToProps = state => {
    return {
        errorImage: state.images.singleImageUrl,
        search: state.search.results,
        loading: state.search.loading,
        cartItemsArr: state.cart.cartItemsArr,
        searchResults: state.search.searchResults
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchItemDetails));