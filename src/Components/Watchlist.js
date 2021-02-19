import React, { Component, useEffect, useState } from 'react'
import { Container, Box } from '@material-ui/core';


function Watchlist(props) {
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
    <Box>
      {stockList.map((stock) => {
        const stockName = stock.name;
        const stockPrice = stock.price;
        return(
          <li key={stock.name} className="watchlist">
            <Container className="watchlist-container">
              {stockName}
            </Container>
          </li>
        )
      })

      }

    </Box>
  )
}

export default Watchlist;
