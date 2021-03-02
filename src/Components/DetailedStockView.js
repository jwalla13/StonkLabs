import React, { Component, useEffect, useState } from 'react'
import { Container, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DetailedStockTable from './DetailedStockTable'
import BuyPrompt from './BuyPrompt'
import SellPrompt from './SellPrompt'


function DetailedStockView(props) {
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
  return (
    <div className='detailed-stock-view'>
      <Container>
        <h1 className="stock-header"> {currentStock.ticker} </h1>
        <StyledButton onClick={closeView} className="exit-view-button" variant="contained"> <b> X </b></StyledButton>
        <StyledButton className="add-watchlist-button" variant="contained"> <b> (+) Watchlist </b></StyledButton>
        <SellPrompt currentStock= { currentStock } loggedUsername = {loggedUsername} loggedIn = {loggedIn}> </SellPrompt>
        <BuyPrompt currentStock= { currentStock } loggedUsername = {loggedUsername} loggedIn = {loggedIn}> </BuyPrompt>
        <DetailedStockTable currentStock={currentStock}/>
      </Container>
    </div>
  )
}

export default DetailedStockView;
