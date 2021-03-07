import React, { Component, useEffect, useState } from 'react'
import { Container, Box, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import BasicStockTable from './BasicStockTable'
import BuyPrompt from './BuyPrompt'
import SellPrompt from './SellPrompt'


function BasicStockView(props) {
  function changeStockView(){
    props.setCurrentStock({
      isLoading: false,
      view: "detailed",
      currentStockInfo: props.currentStock.currentStockInfo,
      ticker: props.currentStock.ticker
    })
  }

  function closeView(){
    props.setCurrentStock({
      isLoading: null
    })
  }

  const StyledButton = withStyles({
    root: {
      borderRadius: 3,
      border: 0,
      height: 40,
      marginTop: 5,
      marginBottom: 5,
      padding: '0 15px',
      float: "right",
      boxShadow: '2 1px 1px 1px black',
    },
  })(Button);

  const ErrorContainer = withStyles({
    root: {
      borderRadius: 3,
      marginBottom: 3,
      height: 30,
      fontSize: 20,
      backgroundColor: "white"
    },
  })(Container);

  const currentStock = props.currentStock;
  const loggedUsername = props.loggedUsername;
  const loggedIn = props.loggedIn;
  if (JSON.stringify(currentStock.currentStockInfo) != "{}"){
    return (
      <div className='basic-stock-container'>
        <Container>
          <h4 className="stock-header"> {currentStock.currentStockInfo.Name} ({currentStock.ticker})</h4>
          <StyledButton className="exit-view-button" variant="contained" onClick={closeView}> <b>X</b> </StyledButton>
          <BasicStockTable currentStock = { currentStock }/>
          <StyledButton variant="contained" onClick={changeStockView}> <b>View Details</b> </StyledButton>
        </Container>
      </div>
    )
  } else {
    return (
      <div className='basic-stock-container'>
        <Container>
          <h1 className="stock-header"> {currentStock.ticker} </h1>
          <StyledButton className="exit-view-button" variant="contained" onClick={closeView}> <b>X</b> </StyledButton>
          <ErrorContainer> No info found for ticker <b> {currentStock.ticker} </b> </ErrorContainer>
        </Container>
      </div>
    )
  }
}


export default BasicStockView;
