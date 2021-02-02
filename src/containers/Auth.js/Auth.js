import React from 'react';

import classes from './Auth.module.css';

import Toolbar from '../../components/Toolbar/Toolbar';
import Input from '../../ui/Input/Input';
import Spinner from '../../ui/Spinner/Spinner';

import { connect } from 'react-redux';

import { updateObject, checkValidity } from '../../shared/utility';

import * as action from '../../store/actions/index';

import { Redirect } from 'react-router-dom'

const Auth = props => {

    const [controls, setControls] = React.useState({
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    isRequired: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                valueType: 'password'
            }
    })

    const [isSignup, setIsSignup] = React.useState(true);

    const inputChangedHandler = (event, controlName) => {
        console.log(event.target.value)
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, controls[controlName].validation)
            })
        })

        setControls(updatedControls);
    }

    const formElementArr = [];
    for(let key in controls) {
        formElementArr.push({
            id: key,
            config: controls[key]
        })
    }

    let form = formElementArr.map(formElement => {
        return <Input
                    key={formElement.id}
                    value={formElement.config.value}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    touched={formElement.config.touched}
                    valueType={formElement.config.valueType}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
    });

    let errMessage = null;
    if (props.error) {
        props.error.message = props.error.message.replace('_', ' ')
        errMessage = <p style={{color: '#fd1783', textAlign: 'center'}}>{props.error.message}</p>
    }

    if(props.loading) {
        form = <Spinner width={100} height={100} margin={60}/>;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(
            controls.email.value,
            controls.password.value,
            isSignup
        )
    }

    let authRedirect = null;
    if(props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }

    let signInText = <p>Already have an account? <span className={classes.textModifier}>Sign In</span></p>
    let signUpText = <p>Don't have an account? <span className={classes.textModifier}>Sign Up</span></p>

    return (
        <div className={classes.authContainer}>
            {authRedirect}
             <Toolbar />
             <div className={classes.formContainer}>
                <h2 style={{textAlign: 'center', marginBottom: '2rem', color: '#fd1783', fontSize: '3rem', fontWeight: 600}}>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
                <form onSubmit={submitHandler} className={classes.form}>
                    {errMessage}
                    {form}
                    <button className={classes.authButton}>{isSignup ? 'Sign Up' : 'Sign In'}</button>
                </form>
                <button className={classes.toggleAuthButton} onClick={switchAuthModeHandler}>{isSignup ? signInText  : signUpText} </button>
             </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        error: state.auth.error,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(action.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);