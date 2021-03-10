import React from 'react'
import { Container, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import apiClient from '../Util/apiClient.js'
import DetailedStockTable from './DetailedStockTable'
import BuyPrompt from './BuyPrompt'
import SellPrompt from './SellPrompt'

function DetailedStockView (props) {
  const currentStock = props.currentStock
  const watchlist = props.watchlist
  const username = props.user.username
  const loggedIn = props.user.loggedIn
  const setPortfolio = props.setPortfolio

  const OuterContainer = withStyles({
    root: {
    }
  })(Container)

  const StyledButton = withStyles({
    root: {
      borderRadius: 3,
      border: 0,
      height: 40,
      marginTop: 5,
      marginBottom: 3,
      marginLeft: 5,
      padding: '0 3px',
      float: 'right',
      boxShadow: '2 1px 1px 1px black'
    }
  })(Button)

  function closeView () {
    props.setCurrentStock({
      isLoading: null
    })
  }

  function addToWatchlist () {
    // Update to call to database
    props.setWatchlist({ isLoading: true })
    apiClient.addToWatchlist(username, currentStock.ticker, watchlist, props.setWatchlist)
  }

  function removeFromWatchlist () {
    props.setWatchlist({ isLoading: true })
    apiClient.removeFromWatchlist(username, currentStock.ticker, watchlist, props.setWatchlist)
  }

  function inWatchlist () {
    for (const stock in watchlist) {
      if (watchlist[stock].ticker === currentStock.ticker) {
        return true
      }
    }
    return false
  }

  return (
    <div className='detailed-stock-view'>
      <OuterContainer>
        <h3 className='stock-header'> {currentStock.currentStockInfo.Name} ({currentStock.ticker}) </h3>
        <StyledButton onClick={closeView} className='exit-view-button' variant='contained'> <b> X </b></StyledButton>
        {inWatchlist()
          ? <StyledButton onClick={removeFromWatchlist} variant='contained'> <b> (-) Watchlist </b></StyledButton>
          : <StyledButton onClick={addToWatchlist} variant='contained'> <b> (+) Watchlist </b></StyledButton>}
        <DetailedStockTable currentStock={currentStock} />
        <SellPrompt currentStock={currentStock} loggedUsername={username} loggedIn={loggedIn} setPortfolio={setPortfolio}> </SellPrompt>
        <BuyPrompt currentStock={currentStock} loggedUsername={username} loggedIn={loggedIn}> setPortfolio={setPortfolio}</BuyPrompt>
      </OuterContainer>
    </div>
  )
}

export default DetailedStockView
