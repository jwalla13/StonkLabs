import React, { Component, useEffect, useState } from 'react'
import { Container, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import BasicStockTable from './BasicStockTable'


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
  const currentStock = props.currentStock;

  return (
    <div className='basic-stock-container'>
      <Container>
        <h1 className="stock-header"> {currentStock.ticker} </h1>
        <StyledButton className="exit-view-button" variant="contained" onClick={closeView}> <b>X</b> </StyledButton>
        <BasicStockTable currentStock = { currentStock }/>
        <StyledButton variant="contained" onClick={changeStockView}> <b>View Details</b> </StyledButton>
      </Container>
    </div>
  )
}


export default BasicStockView;
