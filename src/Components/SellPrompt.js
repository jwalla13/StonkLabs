import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import Alert from '@material-ui/lab/Alert'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { red } from '@material-ui/core/colors'

function getModalStyle () {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(red[400]),
    backgroundColor: red[400],
    '&:hover': {
      backgroundColor: red[600]
    },
    float: 'right',
    borderRadius: 3,
    border: 0,
    height: 40,
    marginTop: 5,
    marginLeft: 5,
    padding: '0 5px',
    boxShadow: '2 1px 1px 1px black'
  }
}))(Button)

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

function SellPrompt (props) {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)
  const [openAlert, setOpenAlert] = React.useState(false)
  const [openAlert0, setOpenAlert0] = React.useState(false)

  const [sellVolume, setsellVolume] = React.useState(0)
  const currentStock = props.currentStock

  const loggedUsername = props.loggedUsername

  const handleChange = event => {
    const { name, value } = event.target
    setsellVolume(value)
  }

  const submitForm = event => {
    event.preventDefault()
    sellOrder()
  }

  const sellOrder = () => {
    return axios.get('http://localhost:5000/sell/' + loggedUsername + '/' +
        currentStock.ticker + '/' + sellVolume)
      .then(function (response) {
        console.log(response)
        if (response.data.success === true) {
          window.location.reload()
          return [response.status === 201, response.data]
        } else if (response.data.error === 99) {
          setOpenAlert0(true)
        } else {
          setOpenAlert(true)
        }
      })
      .catch(function (error) {
        console.log(error)
        return false
      })
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Collapse in={openAlert0}>
        <Alert
          severity='error'
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpenAlert0(false)
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          Cannot sell 0 stock!
        </Alert>
      </Collapse>
      <Collapse in={openAlert}>
        <Alert
          severity='error'
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpenAlert(false)
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          Cannot sell more stock than owned!
        </Alert>
      </Collapse>
      <h2 id='simple-modal-title'>Sell {currentStock.ticker}</h2>
      <form>
        <TextField
          id='standard-number'
          label='Volume'
          type='number'
          InputLabelProps={{
            shrink: true
          }}
          onChange={handleChange}
          required
        />
        <Button type='submit' onClick={submitForm}>Confirm Sell</Button>
      </form>
    </div>
  )

  return (
    <div>
      <ColorButton onClick={handleOpen}>
        Sell
      </ColorButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  )
}

export default SellPrompt
