import React from 'react';

import Backdrop from '../../ui/Backdrop/Backdrop';

import classes from './withErrorHandler.module.css';

import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {

        const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);

        return (
            <React.Fragment>
                <Backdrop show={error} onClose={errorConfirmedHandler} />
                {error ? <div className={classes.errorModalContainer}>
                    <div style={{height: '5rem', backgroundColor: '#fd1783', borderTopLeftRadius: '5px', borderTopRightRadius: '5px'}} />
                    <div className={classes.errorContainer}>
                        <p style={{margin: '0rem 0 3rem 0'}}>{error ? error.message : null}</p>
                        <button className={classes.errorButton} onClick={errorConfirmedHandler}>Okay</button>
                    </div>
                </div> : null}
                <WrappedComponent {...props} />
            </React.Fragment>
        )
    }
}

export default withErrorHandler;