import React, { Component, Typography, useEffect, useState } from 'react'
import apiClient from '../Util/apiClient.js'
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
    loggedIn: props.user.loggedIn,
  })

  const [currentStock, setCurrentStock] = useState({
    isLoading: null,
    ticker: null,
    currentStockInfo: null,
    view: null
  })

  const [portfolio, setPortfolio] = useState({
    list: null
  })

  const [watchlist, setWatchlist] = useState({
    isLoading: true,
    list: null
  })

  useEffect(() => {
    apiClient.getPortfolio(userInfo.username, setPortfolio);
    apiClient.getWatchlist(userInfo.username, setWatchlist);
  }, [userInfo]);

  const StockDisplay = loadingStock();
  const PortfolioDisplay = loadingPortfolio();
  const WatchlistDisplay = loadingWatchlist();

  return (
    <div>
      <span className='search-container'>
        <SearchBar setCurrentStock={setCurrentStock}/>
      </span>
      <div>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={4}>
            <WatchlistDisplay isLoading={watchlist.isLoading} watchlist={watchlist.list} setCurrentStock={setCurrentStock} userInfo={userInfo}/>
          </Grid>
          <Grid item xs={6} sm={4}>
            <StockDisplay currentStock={currentStock} setCurrentStock={setCurrentStock} userInfo={userInfo} watchlist={watchlist.list} setWatchlist={setWatchlist}/>
          </Grid>
          <Grid item xs={6} sm={4}>
            <PortfolioDisplay portfolio={portfolio.list} setCurrentStock={setCurrentStock} userInfo={userInfo}/>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

function loadingStock() {
  return function WithLoadingComponent({ currentStock, setCurrentStock, userInfo, watchlist, setWatchlist, ...props}) {
    if (currentStock.isLoading == null) return <div/>

    else if(!currentStock.isLoading && currentStock.view == "basic"){
      return <BasicStockView currentStock={currentStock} setCurrentStock={setCurrentStock} user={userInfo} watchlist={watchlist}/>
    }
    else if(!currentStock.isLoading && currentStock.view == "detailed"){
      return <DetailedStockView currentStock={currentStock} setCurrentStock={setCurrentStock} user={userInfo} watchlist={watchlist} setWatchlist={setWatchlist}/>
     }

    else{
        return <div class="loader"></div>
  }}}

function loadingPortfolio() {
       return function WithLoadingComponent({ portfolio, setCurrentStock, userInfo, ...props}) {
         console.log("right here");
         console.log(portfolio);
         if (portfolio != null) {
           return <Portfolio portfolio={portfolio} setCurrentStock={setCurrentStock} user={userInfo} />
         }

         else{
             return <div class="loader"></div>
       }}}

function loadingWatchlist() {
  return function WithLoadingComponent({ isLoading, watchlist, setCurrentStock, userInfo, ...props}) {
    if (!isLoading) {
      return <Watchlist stockList={watchlist} setCurrentStock={setCurrentStock} user={userInfo} />
    }

    else{
        return <div class="loader"></div>
  }}}

export default DashboardPage
