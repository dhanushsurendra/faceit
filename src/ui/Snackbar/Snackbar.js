import React from 'react';

import classes from './Snackbar.module.css';

const Snackbar = props => (
    <div className={classes.snackbarContainer}>
        <h3 style={{fontWeight: 400, textAlign: 'center'}}>{props.message}</h3>
    </div>
)

export default Snackbar;