import React from 'react';

import SideDrawer from "../SideDrawer/SideDrawer";
import Toolbar from "../Toolbar/Toolbar";
import Footer from "../Footer/Footer";

import { connect } from 'react-redux';

import { updateObject, checkValidity } from '../../shared/utility';

import OrderSummary from './OrderSummary/OrderSummary';

import * as action from '../../store/actions/index';

import classes from './Checkout.module.css';

import { withRouter } from 'react-router-dom';

import Input from '../../ui/Input/Input';
import Spinner from '../../ui/Spinner/Spinner';

const Checkout = props => {

    const [orderForm, setOrderForm] = React.useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            validation: {
                required: true,
                minLength: 1
            },
            valid: false,
            touched: false,
            valueType: 'name'
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false,
            valueType: 'email'
        },
        address: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Address'
            },
            value: '',
            validation: {
                required: true,
                minLength: 1
            },
            valid: false,
            touched: false,
            valueType: 'address'
        },
        zipcode: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
                maxLength: 6
            },
            valid: false,
            touched: false,
            valueType: 'zip code'
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest'},
                    { value: 'cheapest', displayValue: 'Cheapest'},
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true,
            valueType: 'Delivery Method'
        }
    });

    const setIsLoading = React.useState(false)[1];

    const [openSideDrawer, setOpenSideDrawer] = React.useState(false);

     const toggleSideDrawer = () => {
          setOpenSideDrawer(!openSideDrawer);
     };

    let sideDrawer;
     if (openSideDrawer) {
          sideDrawer = <SideDrawer close={toggleSideDrawer} show={openSideDrawer} />;
    }

    let redirect = null;

    const [isFormValid, setFormIsValid] = React.useState(false);

    let sum = 0;
    props.cartItemsArr.map(item => {
        sum += Number.parseFloat(item.price);
    })

    const orderHandler = async event => {
        event.preventDefault();
        // sending the data to firebase database
        // .json specifies that the data is in json
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        const order = {
            orders: props.cartItemsArr,
            price: sum,
            orderData: formData,
            userId: props.userId
        };

        props.onOrderProduct(order, props.token)

        if(props.purchased) {
            props.history.push('/');
        }
    }

    const inputChangedHandler = (event, inputIdentifier) => {

        //deep cloning as learnt in refrence types
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        })

        let isFormValid = true;
        for (let formIdentifier in updatedOrderForm) {
            isFormValid = updatedOrderForm[formIdentifier].valid && isFormValid;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(isFormValid)
    }

    const formElementArray = [];
    for (let key in orderForm) {
        //here key is name, email etc
        //this.state.orderForm[key] right side to key
        formElementArray.push({
            id: key,
            config: orderForm[key]
        })
    }

    let form = (
        <form onSubmit={orderHandler} className={classes.form}>
            {formElementArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    valueType={formElement.config.valueType}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <button className={classes.submitButton} disabled={!isFormValid} onClick={orderHandler}>Pay $ {sum}</button>
        </form>
    )

    return (
        <React.Fragment>
            {redirect}
            {sideDrawer}
            <Toolbar toggleSideDrawer={toggleSideDrawer} isLoading={() => setIsLoading(true)}/>
            <div style={{marginTop: '15rem'}} className={classes.orderSummaryContainer}>
                <h2 style={{marginBottom: '3rem', marginLeft: '15rem', color: '#333', fontWeight: 700}}>Order Summary</h2>
                {props.cartItemsArr.map(item => (
                    <OrderSummary key={item.id} item={item} />
                ))}
            </div>
            <div className={classes.formBody}>
                <div style={{marginTop: '5rem'}} className={classes.formContainer}>
                    <h2 style={{textAlign: 'center', marginBottom: '3rem', color: '#fd1783', fontWeight: 500}}>Contact Data</h2>
                        {form}
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        cartItemsArr: state.cart.cartItemsArr,
        purchased: state.orders.purchased
     }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderProduct: (orderData, token) => dispatch(action.purchaseProduct(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));