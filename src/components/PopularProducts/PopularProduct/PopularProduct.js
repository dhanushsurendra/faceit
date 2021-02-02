import React from 'react';

import classes from './PopularProduct.module.css';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as action from '../../../store/actions/index';

const PopularProduct = props => {

    const newTitle = props.title.split('_').join(' ');

    const redirectToSearch = () => {
        props.history.push('/search');
    }

    return (
        <div className={classes.popularProductContainer} onClick={() => {props.search(newTitle); redirectToSearch()}}>
            <div className={classes.productImageContainer}>
                <img src={props.imgUrl} className={classes.productImage}/>
            </div>
            <div className={classes.productDescription}>
                <h3>{newTitle}</h3>
                <h4>Shop Now</h4>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        search: (query) => dispatch(action.fetchSearchItems(query))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(PopularProduct));