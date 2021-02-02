import React from 'react';

import * as action from '../../../store/actions/index';

import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

const Logout = props => {
    const { onLogout } = props;

    React.useEffect(() => {
        onLogout();
    }, [onLogout])

    return <Redirect to="/auth" />
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(action.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);