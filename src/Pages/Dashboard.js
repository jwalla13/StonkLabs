import React, { Component, Typography, useEffect, useState } from 'react'
import apiClient from '../Util/apiClient.js'
import SearchBar from '../Components/SearchBar'
import BasicStockView from '../Components/BasicStockView'
import DetailedStockView from '../Components/DetailedStockView'
import FeaturedTable from '../Components/FeaturedTable'
import Watchlist from '../Components/Watchlist'
import Portfolio from '../Components/Portfolio'
import MoversTable from '../Components/MoversTable'
import { Grid, TextField, Container, Box, Tabs, Tab, AppBar } from '@material-ui/core';
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
    isLoading: true,
    list: null
  })

  const [watchlist, setWatchlist] = useState({
    isLoading: true,
    list: null
  })

  const [featuredStocks, setFeaturedStocks] = useState({
    isLoading: true,
    list: null
  })

  const [moverStocks, setMoverStocks] = useState({
    isLoading: true,
    list: null
  })

  useEffect(() => {
    apiClient.getPortfolio(userInfo.username, setPortfolio);
    apiClient.getWatchlist(userInfo.username, setWatchlist);
    apiClient.getFeaturedStocks(setFeaturedStocks);
    apiClient.getMoverStocks(setMoverStocks);
  }, [userInfo]);


  const [value, setValue] = useState("Trending");
  const [viewTrending, setViewTrending] = useState(true);

  const StockDisplay = loadingStock();
  const PortfolioDisplay = loadingPortfolio();
  const WatchlistDisplay = loadingWatchlist();
  const FeaturedTableDisplay = loadingFeaturedTable();
  const MoversTableDisplay = loadingMoverTable();

  function toggleView(){
    setViewTrending(!viewTrending);
    if (value == "Trending"){
      setValue("Biggest Movers");
    } else {
      setValue("Trending");
    }
  }

  return (
    <div>
      <span className='search-container'>
        <SearchBar setCurrentStock={setCurrentStock}/>
      </span>
      <div>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={4}>
            <WatchlistDisplay isLoading={watchlist.isLoading} watchlist={watchlist.list}
              setCurrentStock={setCurrentStock} userInfo={userInfo}/>
          </Grid>
          <Grid item xs={6} sm={4}>
            <StockDisplay currentStock={currentStock} setCurrentStock={setCurrentStock}
              userInfo={userInfo} watchlist={watchlist.list} setWatchlist={setWatchlist} setPortfolio={setPortfolio}/>
            { featuredStocks.isLoading ? <div /> :
              <AppBar color="default" className="tabs-bar" position="static">
                <Tabs indicatorColor="primary" textColor="primary"value={value} onChange={toggleView}>
                  <Tab value="Trending" label="Trending" />
                  <Tab value="Biggest Movers" label="Biggest Movers"/>
                </Tabs>
              </AppBar> }
            {viewTrending ? <FeaturedTableDisplay isLoading={featuredStocks.isLoading} featuredStocks={featuredStocks.list}
              setCurrentStock={setCurrentStock} userInfo={userInfo} /> :
              <MoversTableDisplay isLoading={moverStocks.isLoading} moverStocks={moverStocks.list}
                setCurrentStock={setCurrentStock} userInfo={userInfo} /> }
          </Grid>
          <Grid item xs={6} sm={4}>
            <PortfolioDisplay isLoading={portfolio.isLoading} portfolio={portfolio.list} setCurrentStock={setCurrentStock} userInfo={userInfo}/>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

function loadingStock() {
  return function WithLoadingComponent({ currentStock, setCurrentStock, userInfo, watchlist, setWatchlist, setPortfolio, ...props}) {
    if (currentStock.isLoading == null) return <div/>

    else if(!currentStock.isLoading && currentStock.view == "basic"){
      return <BasicStockView currentStock={currentStock} setCurrentStock={setCurrentStock} user={userInfo} watchlist={watchlist}/>
    }
    else if(!currentStock.isLoading && currentStock.view == "detailed"){
      return <DetailedStockView currentStock={currentStock} setCurrentStock={setCurrentStock} user={userInfo}
        watchlist={watchlist} setWatchlist={setWatchlist} setPortfolio={setPortfolio}/>
     }

    else{
        return <div class="loader"></div>
  }}}

function loadingPortfolio() {
       return function WithLoadingComponent({ isLoading, portfolio, setCurrentStock, userInfo, ...props}) {
         if (!isLoading) {
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

function loadingFeaturedTable() {
  return function WithLoadingComponent({ isLoading, featuredStocks, setCurrentStock, userInfo, ...props}) {
    if (!isLoading) {
      return <FeaturedTable stockList={featuredStocks} setCurrentStock={setCurrentStock} user={userInfo} />
    }

    else{
        return <div class="loader"></div>
  }}}

function loadingMoverTable() {
  return function WithLoadingComponent({ isLoading, moverStocks, setCurrentStock, userInfo, ...props}) {
    if (!isLoading) {
      return <MoversTable moverStocks={moverStocks} setCurrentStock={setCurrentStock} user={userInfo} />
    }

    else{
        return <div/>
  }}}

export default DashboardPage
