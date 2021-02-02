import React from 'react';

import classes from './Spinner.module.css';

const Spinner = props => {

    const width = props.width;
    const height = props.height;
    const margin = props.margin;
    return (
        <div>
            <div className={classes.loader} style={{width: width, height: height, marginTop: margin, marginBottom: margin}} />
        </div>
    )
}

export default Spinner;