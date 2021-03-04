import React, { Component, useEffect, useState } from 'react'
import { Container, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import apiClient from '../Util/apiClient.js'
import DetailedStockTable from './DetailedStockTable'
import BuyPrompt from './BuyPrompt'
import SellPrompt from './SellPrompt'

function DetailedStockView(props) {
  const currentStock = props.currentStock;
  const watchlist = props.watchlist;
  const username = props.user.username;
  const loggedIn = props.user.loggedIn;
  console.log(props);

  const StyledButton = withStyles({
    root: {
      borderRadius: 3,
      border: 0,
      height: 40,
      marginTop: 5,
      marginLeft: 5,
      padding: '0 5px',
      float: "right",
      boxShadow: '2 1px 1px 1px black',
    },
  })(Button);

  function closeView(){
    props.setCurrentStock({
      isLoading: null
    })
  }

  function addToWatchlist(){
    //Update to call to database
    props.setWatchlist({isLoading: true});
    apiClient.addToWatchlist(username, currentStock.ticker, watchlist, props.setWatchlist);
  }

  function removeFromWatchlist(){
    props.setWatchlist({isLoading: true});
    apiClient.removeFromWatchlist(username, currentStock.ticker, watchlist, props.setWatchlist);
  }


  function inWatchlist(){
    for (const stock in watchlist){
      if (watchlist[stock].ticker === currentStock.ticker){
        return true;
      }
    }
    return false;
  }

  console.log(currentStock);

  return (
    <div className='detailed-stock-view'>
      <Container>
        <h1 className="stock-header"> {currentStock.ticker} </h1>
        <StyledButton onClick={closeView} className="exit-view-button" variant="contained"> <b> X </b></StyledButton>
        { inWatchlist() ? <StyledButton onClick={removeFromWatchlist} variant="contained"> <b> (-) Watchlist </b></StyledButton> :
                          <StyledButton onClick={addToWatchlist} variant="contained"> <b> (+) Watchlist </b></StyledButton> }
        <SellPrompt currentStock= { currentStock } username = {username} loggedIn = {loggedIn}> </SellPrompt>
        <BuyPrompt currentStock= { currentStock } username = {username} loggedIn = {loggedIn}> </BuyPrompt>
        <DetailedStockTable currentStock={currentStock}/>
      </Container>
    </div>
  )
}

export default DetailedStockView;
