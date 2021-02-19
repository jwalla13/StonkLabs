import React from 'react';
import apiClient from '../Util/apiClient.js'
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  searchBarBack: {
    backgroundColor: 'white'
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();

  function checkSubmit(event){
    if(event.code === "Enter"){
      const ticker = event.target.value
      apiClient.getStock(ticker, props.setCurrentStock)
    }
  }

  return(
    <TextField
      className={classes.searchBarBack}
      variant="outlined"
      placeholder="Search for a stock..."
      onKeyDown={checkSubmit}
     />
  )
}

export default SearchBar