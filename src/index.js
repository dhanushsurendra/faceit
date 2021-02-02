import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { Provider } from "react-redux";

import popularProductsReducer from "./store/reducers/popularProducts";
import searchReducer from "./store/reducers/search";
import imagesReducer from "./store/reducers/imageLoadFail";
import cartReducer from "./store/reducers/cart";
import favoritesReducer from "./store/reducers/favorites";
import authReducer from "./store/reducers/auth";
import compareReducer from "./store/reducers/compare";
import ordersReducer from "./store/reducers/orders";

import thunk from "redux-thunk";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  popularProducts: popularProductsReducer,
  search: searchReducer,
  images: imagesReducer,
  favorites: favoritesReducer,
  cart: cartReducer,
  auth: authReducer,
  compare: compareReducer,
  orders: ordersReducer,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
