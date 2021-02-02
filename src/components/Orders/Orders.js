import React from 'react';

import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';

import { useDispatch, useSelector } from 'react-redux';

import * as action from '../../store/actions/index';

import classes from './Orders.module.css';

const Orders = props => {

    const [openSideDrawer, setOpenSideDrawer] = React.useState(false);

    const toggleSideDrawer = () => {
        setOpenSideDrawer(!openSideDrawer);
    }

    const userId = useSelector(state => state.auth.userId)
    const token = useSelector(state => state.auth.token)

    const dispatch = useDispatch();

    const onFetchOrders = () => dispatch(action.fetchOrders(token, userId))

    React.useEffect(() => {
        onFetchOrders();
    }, [onFetchOrders])

    let sideDrawer;
    if(openSideDrawer) {
        sideDrawer = <SideDrawer close={toggleSideDrawer} show={openSideDrawer} active="orders" />;
    }

    return (
        <React.Fragment>
            {sideDrawer}
            <Toolbar toggleSideDrawer={toggleSideDrawer} />
        </React.Fragment>
    )
}

export default Orders;