import React from 'react';
import { withRouter } from 'react-router-dom';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Footer from '../Footer/Footer';
import Spinner from '../../ui/Spinner/Spinner'

import ClearIcon from '@material-ui/icons/Clear';

import classes from './Compare.module.css';

import AddToCartButton from './AddToCartButton/AddToCartButton';
import AddToWishlistButton from './AddToWishlistButton/AddToWishlistButton';

import * as action from '../../store/actions/index';

import NoResult from '../../assests/no_result.svg'

import { connect } from 'react-redux';

const Compare = props => {

    const { onInitCompare } = props;

    React.useEffect(() => {
        onInitCompare();
    }, [onInitCompare]);

    const reduceTitle = (limit = 120, name) => {
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
        sideDrawer = <SideDrawer active="compare"  close={toggleSideDrawer} show={openSideDrawer} />;
    }

    let compareTable = <Spinner width={100} height={100} margin={60}/>;
    if(!props.loading) {
        compareTable =
        <table className={classes.compareTable}>
            <thead>
                <tr className={classes.tableRow}>
                    <td></td>
                    {props.compareItems.map(item => {
                        return  <td key={item.id}>
                                    <div className={classes.removeIcon} onClick={() => props.onDeleteCompare(item.id)}>
                                        <h4 style={{color: '#fd1783', marginRight: '1rem', fontWeight: 400}}>Remove</h4>
                                        <div className={classes.iconContainer}>
                                            <ClearIcon />
                                        </div>
                                    </div>
                                </td>
                        })}
                </tr>
            </thead>
            <tbody>
            <tr className={classes.tableRow}>
                <td style={{color: '#fd1783', fontWeight: 400, fontSize: '1.6rem', padding: '1rem'}}>
                    Product Overview
                </td>
                {props.compareItems.map(item => (
                    <td style={{padding: '1rem'}} key={item.id}>
                        <h2 style={{marginRight: '1rem', textAlign: 'center', maxWidth: '28rem', fontWeight: 400, fontSize: '2rem'}}>{item.name}</h2>
                        <div classes={classes.imageContainer}>
                            <img src={item.imageUrl} alt={item.name} className={classes.image} />
                        </div>
                    </td>
                ))}
            </tr>
            <tr className={classes.tableRow}>
                <td></td>
                {props.compareItems.map(item => (
                    <td key={item.id}>
                        <div className={classes.priceContainer} style={{padding: '1rem'}} key={item.id}>
                            <h3 style={{marginRight: '1rem', fontWeight: 400, fontSize: '2rem'}}>$ {item.price}</h3>
                            <del style={{fontWeight: 400, fontSize: '1.6rem'}}>$ {item.originalPrice}</del>
                        </div>
                        {props.isAuthenticated ? <AddToCartButton item={item} /> : null}
                    </td>
                ))}
            </tr>
            <tr className={classes.tableRow}>
                <td style={{color: '#fd1783', fontWeight: 400, fontSize: '1.6rem', padding: '1rem'}}>Product Type</td>
                {props.compareItems.map(item => (
                    <td style={{padding: '1rem'}} key={item.id}>
                        <h3 style={{fontWeight: 400, fontSize: '1.6rem',  textTransform: 'capitalize'}}>{item.productType}</h3>
                    </td>
                ))}
            </tr>
            <tr className={classes.tableRow}>
                <td style={{color: '#fd1783', fontWeight: 400, fontSize: '1.6rem', padding: '1rem'}}>
                    Product Category
                </td>
                {props.compareItems.map(item => (
                    <td style={{padding: '1rem'}} key={item.id}>
                        <h3 style={{fontWeight: 400, fontSize: '1.6rem', textTransform: 'capitalize'}}>{item.category}</h3>
                    </td>
                ))}
            </tr>
            <tr className={classes.tableRow}>
                <td style={{color: '#fd1783', fontWeight: 400, fontSize: '1.6rem', padding: '1rem'}}>
                    Brand
                </td>
                {props.compareItems.map(item => (
                    <td style={{padding: '1rem'}} key={item.id}>
                        <h3 style={{maxWidth: '30rem', marginRight: '1rem', fontWeight: 400, fontSize: '1.6rem'}}>{item.brand}</h3>
                    </td>
                ))}
            </tr>
            <tr className={classes.tableRow} style={{padding: '1rem'}}>
                <td style={{maxWidth: '30rem',color: '#fd1783', fontWeight: 400, fontSize: '1.6rem', padding: '1rem'}}>
                    Description
                </td>
                {props.compareItems.map(item => (
                    <td key={item.id}>
                        <p style={{maxWidth: '30rem', padding: '1rem'}}>{reduceTitle(120, item.description)}</p>
                    </td>
                ))}
            </tr>
            <tr className={classes.tableRow}>
                <td style={{color: '#fd1783', fontWeight: 400, fontSize: '1.6rem', padding: '1rem'}}>
                    Colors
                </td>
                {props.compareItems.map((item, index) => {
                    return <td style={{padding: '1rem'}} key={item.id}>
                            <div className={classes.colorContainer}>
                                {item.colors.map((color, index) => (
                                    <div key={color.hex_value} className={classes.color} style={{backgroundColor: `${color.hex_value}`}} />
                                ))}
                            </div>
                        </td>
                    })}
            </tr>
            </tbody>
        </table>
    }

    if(props.compareItems.length === 0) {
        compareTable = <React.Fragment>
                        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                            <img className={classes.noResult} src={NoResult} alt="Empty"/>
                            <p style={{margin: '0 1rem 1rem 1rem', textAlign: 'center', marginTop: '4rem', fontSize: '2.5rem'}}>No Products To Compare!</p>
                        </div>
                    </React.Fragment>
    }

    return (
        <React.Fragment>
            {sideDrawer}
            <Toolbar toggleSideDrawer={toggleSideDrawer}/>
            <h2 style={{marginTop: '14rem', fontSize: '2.5rem', marginLeft: '13rem'}}>Compare</h2>
            <div className={classes.compareContainer} style={{marginTop: '3rem'}}>
                {compareTable}
            </div>
            <Footer />
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onInitCompare: () => dispatch(action.initCompare()),
        onDeleteCompare: (compareItemId) => dispatch(action.deleteCompare(compareItemId)),
    }
}

const mapStateToProps = state => {
    return {
        compareItems: state.compare.compareItems,
        favoriteItemsArr: state.favorites.favorites,
        cartItemsArr: state.cart.cartItemsArr,
        isAuthenticated: state.auth.token !== null,
        loading: state.compare.loading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Compare));