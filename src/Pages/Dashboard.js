import React, { Component, useEffect, useState } from 'react'
import SearchBar from '../Components/SearchBar'
import StockView from '../Components/StockView'
import Watchlist from '../Components/Watchlist'
import { Grid, TextField, Container, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Spin } from 'antd'
import { makeStyles } from '@material-ui/styles'

function DashboardPage(props) {
  const [currentStock, setCurrentStock] = useState({
    isLoading: null,
    ticker: null,
    currentStockInfo: null
  })
  const StockDisplay = loadingStock();

  useEffect(() => {
    console.log(currentStock)
  },[currentStock]);

  function checkSubmit(event){
    console.log(event);
  }

  return (
    <div>
      <span className='search-container'>
        <SearchBar setCurrentStock={setCurrentStock}/>
      </span>
      <div>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={4}>
            <Watchlist/>
          </Grid>
          <Grid item xs={6} sm={4}>
            <StockDisplay currentStock = {currentStock} />
          </Grid>
          <Grid item xs={6} sm={4}>

          </Grid>
        </Grid>
      </div>
    </div>
  )
}

function loadingStock() {
  return function WithLoadingComponent({ currentStock, ...props}) {
  if (currentStock.isLoading == null) return <div/>

  else if(!currentStock.isLoading){
    return <StockView currentStock={currentStock} />
  }

  else{
    return <div class="loader"></div>
  }}}

export default DashboardPage
