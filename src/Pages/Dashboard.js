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
  const [userInfo,setUserInfo]= useState({
    username: props.user.username,
    //Get Watchlist from database
    watchlist: [
      {
        ticker: "AAPL",
        price: 271
      },
      {
        ticker: "NIO",
        price: 52
      },
      {
        ticker: "BB",
        price: 76
      },
      {
        ticker: "ABC",
        price: 84
      },
      {
        ticker: "MOCK",
        price: 21
      },
      {
        ticker: "SHEESH",
        price: 46.7
      },
      {
        ticker: "OVER",
        price: .73
      }
    ]
  })

  const [currentStock, setCurrentStock] = useState({
    isLoading: null,
    ticker: null,
    currentStockInfo: null,
    view: null
  })

  const StockDisplay = loadingStock();

  return (
    <div>
      <span className='search-container'>
        <SearchBar setCurrentStock={setCurrentStock}/>
      </span>
      <div>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={4}>
            <Watchlist stockList={userInfo.watchlist} setCurrentStock={setCurrentStock}/>
          </Grid>
          <Grid item xs={6} sm={4}>D
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
