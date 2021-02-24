import React, { Component, useEffect, useState } from 'react'
import { Container, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

function Watchlist(props) {
  const StyledContainer = withStyles({
    root: {
      border: 1,
      height: 80,
      marginLeft: 5,
      padding: '0 5px',
      float: "right",
      background: "white",
      boxShadow: '2 1px 1px 1px black',
    },
  })(Container);

  const ValueWithLabel = ({ label, value }) => (
    <div>
      <div>
        <div> <b> {label} </b> {value} </div>
      </div>
    </div>
  );

  const stockList = [
    {
      name: "APPL",
      price: 271
    },
    {
      name: "NIO",
      price: 52
    },
    {
      name: "BB",
      price: 76
    },
    {
      name: "ABC",
      price: 84
    },
  ]

  return (
    <Box className="watchlist-box">
      {stockList.map((stock) => {
        const stockName = stock.name;
        const stockPrice = stock.price;
        return(
          <li className="list">
            <StyledContainer>
              <ValueWithLabel label="Name:" value={stockName} />
              <ValueWithLabel label="Price:" value={stockPrice} />
            </StyledContainer>
          </li>
        )
      })}
    </Box>
  )
}

export default Watchlist;
