import React from 'react'
import apiClient from '../Util/apiClient.js'
import { Container, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import BuyPrompt from './BuyPrompt'
import SellPrompt from './SellPrompt'

function Portfolio (props) {
  const stockList = props.portfolio

  const OuterContainer = withStyles({
    root: {
      border: 1,
      height: 400,
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
      height: 600,
      background: '#dedede'
    }
  })(Container)

  const InnerContainer = withStyles({
    root: {
      border: 1,
      borderRadius: 5,
      marginTop: 4,
      marginBottom: 1,
      padding: '0 5px',
      float: 'right',
      background: '#8C92AC',
      boxShadow: '0 1px 3px 1px grey'
    }
  })(Container)

  const ValueWithLabel = ({ label, symbol, value, backSymbol }) => (
    <div>
      <div>
        <div> <b> {label} </b> {symbol}{value}{backSymbol} </div>
      </div>
    </div>
  )

  function viewDetails (event) {
    const ticker = event.target.parentElement.id || event.target.id || event.target.parentElement.parentElement.id
    apiClient.getStock(ticker, props.setCurrentStock, 'detailed')
  }

  if (props.user.loggedIn && stockList != null) {
    if (stockList.length === 0 || stockList[0] === false || stockList[stockList.length - 1].total <= 0) {
      return (
        <Frame>
          <h1> Portfolio </h1>
          <OuterContainer className='watchlist-box'>
            <InnerContainer>
              <h2> Buy stocks to start your portfolio! </h2>
            </InnerContainer>
          </OuterContainer>
        </Frame>
      )
    } else {
      return (
        <Frame>
          <div>
            <h1>Portfolio</h1>
            <h3>Account Value: ${stockList[stockList.length - 1].total}</h3>
            <h3>Percent Change: {stockList[stockList.length - 1].totalChange}%</h3>
          </div>
          <OuterContainer className='watchlist-box'>
            {stockList.map((stock) => {
              const stockName = stock.ticker
              const stockPerc = stock.percentage
              const stockVolume = stock.volume
              const positionValue = stock.posValue
              const curPrice = stock.price
              if (stockVolume > 0) {
                return (
                  <InnerContainer>
                    <ViewButton id={stockName} variant='contained' onClick={viewDetails}> <b> View Details </b> </ViewButton>
                    <SellPrompt currentStock={stock} loggedUsername={props.user.username} loggedIn={props.user.loggedIn}> </SellPrompt>
                    <BuyPrompt currentStock={stock} loggedUsername={props.user.username} loggedIn={props.user.loggedIn}> </BuyPrompt>
                    <ValueWithLabel label='Name:' value={stockName} />
                    <ValueWithLabel label='Cur. Price:' symbol='$' value={curPrice} />
                    <ValueWithLabel label='% Change:' backSymbol='%' value={stockPerc} />
                    <ValueWithLabel label='Num. Shares:' value={stockVolume} />
                    <ValueWithLabel label='Position Value:' symbol='$' value={positionValue} />
                  </InnerContainer>
                )
              }
            })}
          </OuterContainer>
        </Frame>
      )
    }
  }
}

export default Portfolio
