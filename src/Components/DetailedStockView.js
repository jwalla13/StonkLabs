import React, { Component, useEffect, useState } from 'react'
import { Container, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DetailedStockTable from './DetailedStockTable'
import BuyPrompt from './BuyPrompt'
import SellPrompt from './SellPrompt'

function DetailedStockView(props) {
  const currentStock = props.currentStock;
  const watchlist = props.userInfo.watchlist;

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

  const currentStock = props.currentStock;
  const loggedUsername = props.loggedUsername;
  const loggedIn = props.loggedIn;
  console.log(props);

  function addToWatchlist(){
    //Update to call to database
    props.setUserInfo({
      username: props.userInfo.username,
      watchlist: watchlist.concat([currentStock])
    })
  }

  function removeFromWatchlist(){
    //Update to call to call to database
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
        <StyledButton className="add-watchlist-button" variant="contained"> <b> (+) Watchlist </b></StyledButton>
        <SellPrompt currentStock= { currentStock } loggedUsername = {loggedUsername} loggedIn = {loggedIn}> </SellPrompt>
        <BuyPrompt currentStock= { currentStock } loggedUsername = {loggedUsername} loggedIn = {loggedIn}> </BuyPrompt>
        { inWatchlist() ? <StyledButton onClick={removeFromWatchlist} variant="contained"> <b> (-) Watchlist </b></StyledButton> :
                          <StyledButton onClick={addToWatchlist} variant="contained"> <b> (+) Watchlist </b></StyledButton> }
        <DetailedStockTable currentStock={currentStock}/>
      </Container>
    </div>
  )
}

export default DetailedStockView;
