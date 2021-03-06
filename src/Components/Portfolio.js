import React, { Component, useEffect, useState } from 'react'
import apiClient from '../Util/apiClient.js'
import { Container, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { borders } from '@material-ui/system';
import axios from 'axios'
import BuyPrompt from './BuyPrompt'
import SellPrompt from './SellPrompt'

function Portfolio(props) {

  const stockList = props.portfolio;
  const [accountVal, setAccountVal] = useState(0);

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

  const ValueWithLabel = ({ label, symbol, value, backSymbol }) => (
    <div>
      <div>
        <div> <b> {label} </b> {symbol}{value}{backSymbol} </div>
      </div>
    </div>
  );

  function viewDetails(event){
    var ticker = event.target.parentElement.id || event.target.id;
    apiClient.getStock(ticker, props.setCurrentStock, "detailed")
  }

    if (props.user.loggedIn && stockList != null) {
        console.log(stockList);
        if(stockList.length === 0 || stockList[0] === false){
          return(
              <Frame borderColor="primary.main">
                  <h1> Portfolio </h1>
                  <OuterContainer className="watchlist-box">
                    <InnerContainer>
                      <h2> Buy stocks to start your portfolio! </h2>
                    </InnerContainer>
                  </OuterContainer>
              </Frame>
          )
        } else{
          return (
              <Frame borderColor="primary.main">
                  <h1> Portfolio </h1>
                  <OuterContainer className="watchlist-box">
                      {stockList.map((stock) => {
                          const stockName = stock.ticker;
                          const stockPerc = stock.percentage;
                          const stockVolume = stock.volume;
                          const positionValue = stock.posValue
                          return(
                              <InnerContainer>
                                  <ViewButton id={stockName} variant="contained" onClick={viewDetails}> View Details </ViewButton>
                                  <SellPrompt currentStock= { stock } loggedUsername = {props.user.username} loggedIn = {props.user.loggedIn}> </SellPrompt>
                                  <BuyPrompt currentStock= { stock } loggedUsername = {props.user.username} loggedIn = {props.user.loggedIn}> </BuyPrompt>
                                  <ValueWithLabel label="Name:" value={stockName} />
                                  <ValueWithLabel label="% Change:" backSymbol="%" value={stockPerc} />
                                  <ValueWithLabel label="Num. Shares:" value={stockVolume} />
                                  <ValueWithLabel label="Position Value:" symbol="$" value={positionValue} />
                              </InnerContainer>
                          )
                      })}
                  </OuterContainer>
              </Frame>
          )
      }
  }
}

export default Portfolio;
