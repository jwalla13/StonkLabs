import React, { Component, useEffect, useState } from 'react'
import apiClient from '../Util/apiClient.js'
import { Container, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { borders } from '@material-ui/system';

function Watchlist(props) {
  const OuterContainer = withStyles({
    root: {
      border: 1,
      height: 500,
      marginLeft: 5,
      padding: '0 5px',
      float: "right",
      background: "white",
      border: "1px black"
    },
  })(Container);

  const ViewButton = withStyles({
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

  const Frame = withStyles({
    root: {
      border: 1,
      borderRadius: 5,
      height: 600,
      background: "white",
    },
  })(Container);

  const InnerContainer = withStyles({
    root: {
      border: 1,
      borderRadius: 5,
      height: 100,
      marginTop: 4,
      marginBottom: 1,
      padding: '0 5px',
      float: "right",
      background: "#8C92AC",
      boxShadow: '0 1px 3px 1px grey',
    },
  })(Container);

  const ValueWithLabel = ({ label, value }) => (
    <div>
      <div>
        <div> <b> {label} </b> {value} </div>
      </div>
    </div>
  );


  function viewDetails(event){
    var ticker = event.target.parentElement.id || event.target.id;
    apiClient.getStock(ticker, props.setCurrentStock, "detailed")
  }

  return (
    <Frame borderColor="primary.main">
      <h1> Watchlist </h1>
      <OuterContainer className="watchlist-box">
        {props.stockList.map((stock) => {
          const stockName = stock.ticker;
          const stockPrice = stock.price;
          return(
            <InnerContainer>
              <ViewButton id={stockName} variant="contained" onClick={viewDetails}> View Details </ViewButton>
              <ValueWithLabel label="Name:" value={stockName} />
              <ValueWithLabel label="Price:" value={stockPrice} />
            </InnerContainer>
          )
        })}
      </OuterContainer>
    </Frame>
  )
}

export default Watchlist;
