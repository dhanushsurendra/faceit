import React from "react";

import { Redirect } from "react-router-dom";

import { withRouter } from "react-router";

import { connect } from "react-redux";

import classes from "./SearchInput.module.css";

import * as action from "../../../store/actions/index";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

const Search = React.memo((props) => {
  const [query, setQuery] = React.useState("");

  console.log(props.searchResults);

  let redirectToSearch = null;

  const handleSearch = (event) => {
    event.preventDefault();
    props.search(query.trim());
    props.onfetchPhotoItems(props.searchQuery);
    props.history.push("/search");
  };

  console.log(props.imageLoad);

  return (
    <React.Fragment>
      {redirectToSearch}
      <form className={classes.searchContainer} onSubmit={handleSearch}>
        <input
          type="text"
          className={classes.search}
          placeholder="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <SearchOutlinedIcon className={classes.searchIcon} />
      </form>
    </React.Fragment>
  );
});

const mapDispatchToProps = (dispatch) => {
  return {
    search: (query) => dispatch(action.fetchSearchItems(query)),
    onfetchPhotoItems: (query) => dispatch(action.fetchPhotoItems(query)),
  };
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.search.results,
    imageLoad: state.images.imageUrls,
    searchQuery: state.search.searchQuery,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
