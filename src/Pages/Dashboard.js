import React, { Component } from 'react'
import SearchBar from '../Components/SearchBar'
import { InputAdornment, TextField, Container, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

function DashboardPage(props) {
  function checkSubmit(event){
    console.log(event);
  }
  return (
    <span className='search-container'>
      <SearchBar/>
    </span>
  )
}

export default DashboardPage
