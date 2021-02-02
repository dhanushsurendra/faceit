import React from 'react';

import classes from './Input.module.css';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CodeIcon from '@material-ui/icons/Code';

const Input = props => {

    let inputElement = null;
    const inputClass = [classes.inputClass];

    let validationError = null;
    if(props.invalid && props.touched) {
      validationError = <p className={classes.error}>{'Please enter a valid ' + props.valueType}</p>
    }

    if(props.invalid && props.shouldValidate && props.touched) {
        inputClass.push(classes.invalid);
    }

    let icon = <MailOutlineIcon />
    if(props.elementConfig.type === 'password') {
        icon = <LockOpenIcon />
    }

    if(props.elementConfig.type === 'number') {
        icon = <CodeIcon />
    }

    if(props.valueType === 'name') {
        icon = <PermIdentityIcon />
    }

    if(props.valueType === 'address') {
        icon = <BookmarkBorderIcon />
    }

    if(props.elementType === 'select') {
        inputClass.push(classes.select);
        icon = null;
    }

    switch(props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClass.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClass.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option
                            key={option.value}
                            value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            )
            break;
        default:
            inputElement = <input className={inputClass.join(' ')}
                {...props.elementConfig}
                />
    }

    return (
        <React.Fragment>
            <div className={classes.inputContainer}>
                <label htmlFor={props.valueType} className={classes.label}>{props.valueType}</label>
                <span className={classes.iconContainer}>
                    {icon}
                </span>
                {inputElement}
            </div>
            {validationError}
         </React.Fragment>
    )
}
export default Input;