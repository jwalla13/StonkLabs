import React, { Component, useEffect, useState } from 'react'
import { Container, Box } from '@material-ui/core';
import DetailedStockTable from './DetailedStockTable'


function StockView(props) {
  const currentStock = props.currentStock;
  console.log(props);
  return (
    <div className='detailed-table-container'>
      <Container>
        <h1> {currentStock.ticker} </h1>
        <DetailedStockTable currentStock = { currentStock }/>
      </Container>
    </div>
  )
}


export default StockView;
