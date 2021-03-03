import React, { Component, Typography, useEffect, useState } from 'react'
import SearchBar from '../Components/SearchBar'
import BasicStockView from '../Components/BasicStockView'
import DetailedStockView from '../Components/DetailedStockView'
import Watchlist from '../Components/Watchlist'
import Portfolio from '../Components/Portfolio'
import { Grid, TextField, Container, Box } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Spin } from 'antd'
import { makeStyles } from '@material-ui/styles'
import SellPrompt from '../Components/SellPrompt'
import BuyPrompt from '../Components/BuyPrompt'
import Button from '@material-ui/core/Button';

function DashboardPage(props) {
  const [currentStock, setCurrentStock] = useState({
    isLoading: null,
    ticker: null,
    currentStockInfo: null,
    view: null
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
            <Watchlist setCurrentStock={setCurrentStock}/>
          </Grid>
          <Grid item xs={6} sm={4}>
            <StockDisplay currentStock={currentStock} setCurrentStock={setCurrentStock} loggedUsername={props.loggedUsername} loggedIn={props.loggedIn}/>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Portfolio setCurrentStock={setCurrentStock} loggedUsername={props.loggedUsername} loggedIn={props.loggedIn} />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

function loadingStock() {
  return function WithLoadingComponent({ currentStock, setCurrentStock, loggedUsername, loggedIn, ...props}) {
  if (currentStock.isLoading == null) return <div/>

  else if(!currentStock.isLoading && currentStock.view == "basic"){
    return <BasicStockView currentStock={currentStock} setCurrentStock={setCurrentStock} loggedUsername={loggedUsername} loggedIn={loggedIn}/>
  }
  else if(!currentStock.isLoading && currentStock.view == "detailed"){
    return <DetailedStockView currentStock={currentStock} setCurrentStock={setCurrentStock} loggedUsername={loggedUsername} loggedIn={loggedIn}/>
  }

  else{
    return <div class="loader"></div>
  }}}

export default DashboardPage
