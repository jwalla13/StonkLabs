import React from 'react'
import apiClient from '../Util/apiClient.js'
import { Container, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

function FeaturedTable (props) {
  const OuterContainer = withStyles({
    root: {
      border: 1,
      height: 280,
      marginLeft: 5,
      padding: '0 5px',
      float: 'right',
      background: '#dedede'
    }
  })(Container)

  const ViewButton = withStyles({
    root: {
      borderRadius: 3,
      border: 0,
      height: 40,
      marginTop: 5,
      marginLeft: 5,
      padding: '0 5px',
      float: 'right',
      boxShadow: '2 1px 1px 1px black'
    }
  })(Button)

  const Frame = withStyles({
    root: {
      border: 1,
      borderRadius: 5,
      height: 350,
      background: '#dedede'
    }
  })(Container)

  const InnerContainer = withStyles({
    root: {
      border: 1,
      borderRadius: 5,
      height: 85,
      marginTop: 4,
      marginBottom: 1,
      padding: '0 5px',
      float: 'right',
      background: '#8C92AC',
      boxShadow: '0 1px 3px 1px grey'
    }
  })(Container)

  const ValueWithLabel = ({ label, symbol, value }) => (
    <div>
      <div>
        <div className='label'> <b> {label} </b> {symbol}{value} </div>
      </div>
    </div>
  )

  function viewDetails (event) {
    const ticker = event.target.parentElement.id || event.target.id || event.target.parentElement.parentElement.id
    apiClient.getStock(ticker, props.setCurrentStock, 'detailed')
  }

  return (
    <Frame borderColor='primary.main'>
      <h1> Trending Stocks </h1>
      <OuterContainer className='watchlist-box'>
        {props.stockList.map((stock) => {
          const stockName = stock.ticker
          const stockPrice = stock.price
          return (
            <InnerContainer key={stockName}>
              <ViewButton id={stockName} variant='contained' onClick={viewDetails}> <b> View Details </b> </ViewButton>
              <ValueWithLabel label='Name:' value={stockName} />
              <ValueWithLabel label='Price:' symbol='$' value={stockPrice} />
            </InnerContainer>
          )
        })}
      </OuterContainer>
    </Frame>
  )
}

export default FeaturedTable
