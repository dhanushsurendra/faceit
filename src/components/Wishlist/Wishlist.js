import React from 'react';

import classes from './Wishlist.module.css'

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Footer from '../Footer/Footer';
import WishlistItem from './WishlistItem/WishlistItem';
import Spinner from '../../ui/Spinner/Spinner';
import Snackbar from '../../ui/Snackbar/Snackbar';

import NoResult from '../../assests/no_result.svg';

import { connect } from 'react-redux';
import axios from '../../axios-firebase';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Wishlist = props => {

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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

    const [openSideDrawer, setOpenSideDrawer] = React.useState(false);

    const toggleSideDrawer = () => {
        setOpenSideDrawer(!openSideDrawer);
    }

    let sideDrawer;

    if(openSideDrawer) {
        sideDrawer = <SideDrawer close={toggleSideDrawer} show={openSideDrawer} active="wishlist" />;
    }

    let favItems = <Spinner width={100} height={100} margin={60}/>;
    if(!props.loading) {
        favItems = (
            props.favItemsArr.map(favItem => (
                <WishlistItem
                    id={favItem.id}
                    key={favItem.id}
                    name={reduceTitle(17, favItem.name)}
                    brand={favItem.brand}
                    price={favItem.price}
                    originalPrice={favItem.originalPrice}
                    isFavorite={favItem.isFavorite}
                    imageUrl={favItem.imageUrl} />
            ))
        )
    }

    let cartItemsContainer = (
            <div className={classes.favItemsContainer}>
                {favItems}
            </div>
    )

    if(props.favItemsArr.length === 0) {
        cartItemsContainer = <React.Fragment>
                        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                            <img className={classes.noResult} src={NoResult} alt="Empty"/>
                            <p style={{margin: '0 1rem 1rem 1rem', textAlign: 'center', marginTop: '4rem', fontSize: '2.5rem'}}>No Products In Wishlist!</p>
                        </div>
                    </React.Fragment>
    }

    let snackbar = null;
    if(props.snackbarLoading) {
        snackbar = <Snackbar message="Removing Item" />
    }



    return (
        <React.Fragment>
            {sideDrawer}
            <Toolbar toggleSideDrawer={toggleSideDrawer} favoriteArr={[]} wishlist={[]} />
            <h2 style={{marginTop: '10rem', marginLeft: '10rem', fontSize: '2.5rem'}}>My Wishlist</h2>
            <h3 style={{marginLeft: '10rem', fontSize: '1.8rem', fontWeight: '300', marginTop: '1rem'}}>{props.favItemsArr.length} Products in Favorites</h3>
            {cartItemsContainer}
            {snackbar}
            <Footer />
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        favItemsArr: state.favorites.favorites,
        isLoading: state.favorites.loading,
        snackbarLoading: state.favorites.snackbarLoading
    }
}

export default connect(mapStateToProps)(withErrorHandler(Wishlist, axios));