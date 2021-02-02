import React from 'react';
import './App.css';

import PopularProducts from './components/PopularProducts/PopularProducts';
import Search from './components/Search/Search';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Wishlist from './components/Wishlist/Wishlist';
import SearchItemDetails from './components/Search/SearchItemDetails/SearchItemDetails';
import Auth from './containers/Auth.js/Auth';
import Logout from './containers/Auth.js/Logout/Logout';
import Compare from './components/Compare/Compare';
import Orders from './components/Orders/Orders';

import { useSelector, connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';

import { Switch, Route, Redirect } from 'react-router-dom';

import * as action from './store/actions/index';

const App = props => {

  const isAuthenticated = useSelector(state => state.auth.token !== null);

  const { onTryAutoSignIn } = props;

  React.useEffect(() => {
    onTryAutoSignIn();
  }, [onTryAutoSignIn])

  let routes = (
      <Switch>
        <Route path="/search" exact render={(props) => <Search {...props} />} />
        <Route path="/searchitemdetails" exact render={(props) => <SearchItemDetails {...props} /> } />
        <Route path="/auth" exact render={(props) => <Auth {...props} /> } />
        <Route path="/compare" component={(props) => <Compare {...props} /> } />
        <Route path="/" exact component={(props) => <PopularProducts {...props} />} />
        <Redirect to="/" />
      </Switch>
  )

  if(isAuthenticated) {
    routes = (
        <Switch>
          <Route path="/search" exact render={(props) => <Search {...props} />} />
          <Route path="/cart" exact render={(props) => <Cart {...props} /> } />
          <Route path="/checkout" exact render={(props) => <Checkout {...props} />} />
          <Route path="/wishlist" exact render={(props) => <Wishlist {...props} />} />
          <Route path="/searchitemdetails" exact render={(props) => <SearchItemDetails {...props} /> } />
          <Route path="/logout" exact component={Logout} />
          <Route path="/orders" component={(props) => <Orders {...props} />} />
          <Route path="/auth" component={(props) => <Auth {...props} /> } />
          <Route path="/compare" component={(props) => <Compare {...props} /> } />
          <Route path="/" component={(props) => <PopularProducts {...props} />} />
          <Redirect to="/" />
        </Switch>
    )
  }

  return (
    <div>
      <Layout>
        <Switch>
          {routes}
        </Switch>
      </Layout>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(action.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
