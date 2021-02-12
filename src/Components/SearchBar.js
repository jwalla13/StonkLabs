import React from 'react';
import axios from 'axios';
import { TextField } from '@material-ui/core';

const SearchBar = (props) => {
  function checkSubmit(event){
    console.log(event);
  }

  return(
    <TextField
      className='search-container'
      variant="outlined"
      placeholder="Search for a stock..."
      onChange={checkSubmit}
     />
  )
}

export default SearchBar