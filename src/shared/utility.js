export const updateObject = (oldObject, updatedObject) => {
    return {
        ...oldObject,
        ...updatedObject
    }
}

export const checkValidity = (value, rules) => {

    let isValid = true;

    if(!rules) {
        return true;
    }

    if(rules.required && rules.isValid) {
        isValid = value.trim().length >= rules.minLength;
    }

    if(rules.minLength && isValid) {
        isValid = value.length >= rules.minLength;
    }

    if(rules.maxLength && isValid) {
        isValid = value.length >= rules.maxLength;
    }

    if(rules.isEmail) {
        let pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return pattern.test(value) && isValid;
    }

    if(rules.isNumeric) {
        let pattern = /^\d+$/;
        return pattern.test(value) && isValid;
    }

    return isValid;
}
