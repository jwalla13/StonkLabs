import React from 'react';
import apiClient from '../Util/apiClient.js'
import { TextField } from '@material-ui/core';

const SearchBar = (props) => {
  function checkSubmit(event){
    if(event.code === "Enter"){
      const ticker = event.target.value
      apiClient.getStock(ticker, props.setCurrentStock)
    }
  }

  return(
    <TextField
      className='search-container'
      variant="outlined"
      placeholder="Search for a stock..."
      onKeyDown={checkSubmit}
     />
  )
}

export default SearchBar