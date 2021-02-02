import React from "react";

import SearchItem from "./SearchItem/SearchItem";

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from "react-redux";

import NoResult from '../../assests/no_result.svg';

import Spinner from "../../ui/Spinner/Spinner";

import SideDrawer from "../SideDrawer/SideDrawer";
import Toolbar from "../Toolbar/Toolbar";
import Footer from "../Footer/Footer";

import classes from "./Search.module.css";

import * as action from '../../store/actions/index';

import axios from '../../axios-firebase';

const Search = (props) => {

     const [isLoading, setIsLoading] = React.useState(false);

     const [openSideDrawer, setOpenSideDrawer] = React.useState(false);

     const toggleSideDrawer = () => {
          setOpenSideDrawer(!openSideDrawer);
     };

     const isFavorite = (isFav, favItem) => {
          if(isFav) {
               props.onAddFavorite(favItem)
          } else {
               const index = props.favoriteItemsArr.findIndex(item => item.favItemId === favItem.favItemId);
               props.onDeleteFavorite(props.favoriteItemsArr[index].id);
          }
     }

     const removeFavorite = () => {
          let favorite = false;
          if(props.favoriteId !== 1) {
               favorite = true;
          } else {
               favorite = false;
          }
          return favorite;
     }

     const checkIfFav = (favItemId) => {
          let favorite = false;
          props.favoriteItemArr.forEach(favItem => {
               console.log(favItem.favItemId)
               if(favItem.favItemId === favItemId) {
                    console.log(favItem.isFavorite)
                    favorite = true;
               } else {
                    favorite = false;
               }
          })
          return favorite;
     }

     let searchItems = <Spinner width={100} height={100} margin={60}/>;

     if (!props.loading) {
          searchItems = props.searchResults.map((result, index) => {
               return (
                    <SearchItem
                         key={result.id}
                         id={result.id}
                         image={result.image_link}
                         favorite={isFavorite}
                         removeFavOnCartAdd={removeFavorite}
                         name={result.name}
                         price={result.price}
                         description={result.description}
                         brand={result.brand}
                         price_sign={result.price_sign}
                         index={index}
                         isFavOnLoad={checkIfFav}
                    />
               );
          });
     }

     let heading = null;
     if(!props.loading) {
          heading = <React.Fragment>
                         <h2 style={{ fontSize: "2.5rem", marginTop: '10rem' }}>
                              Search results for{" "}
                              <span style={{ color: "#fd1783" }}>"{props.searchQuery}"</span>
                         </h2>
                         <h4 style={{ color: "#333", fontWeight: "300", fontSize: "1.6rem" }}>
                              {props.searchResults.length} results
                         </h4>
                    </React.Fragment>
     }

     if (props.noResult && props.searchResults.length === 0) {
          searchItems = (
               <React.Fragment>
                    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                         <img className={classes.noResult} src={NoResult} alt="Empty"/>
                         <p style={{margin: '0 1rem 1rem 1rem', textAlign: 'center', marginTop: '4rem', fontSize: '2.5rem'}}>No Results!</p>
                    </div>
               </React.Fragment>
          );
     }

     let sideDrawer;
     if (openSideDrawer) {
          sideDrawer = <SideDrawer close={toggleSideDrawer} show={openSideDrawer} />;
     }

     return (
          <React.Fragment>
               {sideDrawer}
               <Toolbar toggleSideDrawer={toggleSideDrawer} isLoading={() => setIsLoading(true)}/>
               <div style={{ margin: "5rem 8rem", minHeight: '30rem' }}>
                    {heading}
                    <div className={classes.searchContainer}>{searchItems}</div>
               </div>
               <Footer />
          </React.Fragment>
     );
};

const mapStateToProps = state => {
     return {
          searchResults: state.search.results,
          loading: state.search.loading,
          searchQuery: state.search.searchQuery,
          imageLoad: state.images.results,
          noResult: state.search.noResult,
          favoriteItemsArr: state.favorites.favorites,
          isFavorite: state.cart.favoriteId,
          favoriteItemArr: state.favorites.favorites
     };
};

const mapDispatchToProps = dispatch => {
     return {
          onAddFavorite: (favItem) => dispatch(action.addFavoriteItem(favItem)),
          onDeleteFavorite: (favItemId) => dispatch(action.deleteFavoriteItem(favItemId))
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Search, axios));
