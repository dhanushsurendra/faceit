import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import axios from '../../axios-products';

import Spinner from '../../ui/Spinner/Spinner';
import SideDrawer from '../SideDrawer/SideDrawer';
import PopularProduct from './PopularProduct/PopularProduct';
import Toolbar from '../Toolbar/Toolbar';
import Footer from '../Footer/Footer';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import classes from './PopularProducts.module.css';

const PopularProducts = props => {

    const { onFetchPopularProducts } = props;

    const [openSideDrawer, setOpenSideDrawer] = React.useState(false);

    const toggleSideDrawer = () => {
        setOpenSideDrawer(!openSideDrawer);
    }

    React.useEffect(() => {
        onFetchPopularProducts();
    }, [onFetchPopularProducts]) //runs only for 1st time

    let content = <Spinner width={100} height={100} margin={60}/>;
    if(!props.loading) {
        content = props.popularProducts.map((item, index) => {
            if(index === 2) {
                return;
            }
            return <PopularProduct
                        key={index}
                        imgUrl={item.imgUrl}
                        title={item.productType} />
        })}

    let sideDrawer;
    if(openSideDrawer) {
        sideDrawer = <SideDrawer active='home' close={toggleSideDrawer} show={openSideDrawer} />;
    }

    return (
        <React.Fragment>
            {sideDrawer}
            <Toolbar toggleSideDrawer={toggleSideDrawer} favoriteArr={[]} wishlist={[]} />
            <main style={{marginTop: '10rem'}}>
                <div className={classes.popularProductContainer}>
                    <h4 className={classes.popularProuctHeading}>Popular Products</h4>
                    <div className={classes.popularProductGrid}>
                        {content}
                    </div>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchPopularProducts: () => dispatch(actions.fetchPopularProducts())
    }
}

const mapStateToProps = state => {
    return {
        popularProducts: state.popularProducts.productType,
        loading: state.popularProducts.loading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(PopularProducts, axios));