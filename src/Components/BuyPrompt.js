import React from 'react';
import apiClient from '../Util/apiClient.js'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const StyledButton = withStyles({
    root: {
      borderRadius: 3,
      border: 0,
      height: 40,
      marginBottom: 5,
      padding: '0 15px',
      float: "right",
      boxShadow: '2 1px 1px 1px black',
    },
  })(Button);

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function BuyPrompt(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [buyVolume, setBuyVolume] = React.useState(0)
  const currentStock = props.currentStock

  const loggedIn = props.loggedIn;
  const username = props.username;

  const handleChange = event => {
      const { name, value } = event.target
      setBuyVolume(value)
  }

  const submitForm = event => {
      event.preventDefault()
      buyOrder()
      handleClose()
  }

  const buyOrder = () => {
      return axios.get('http://localhost:5000/buy/' + username + '/' +
        currentStock.ticker + '/' + buyVolume)
    .then(function (response) {
        apiClient.getPortfolio(username, props.setPortfolio)
        return [response.status === 201, response.data]
    })
    .catch (function (error) {
        console.log(error);
        return false;
    })
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Buy {currentStock.ticker}</h2>
      <form>
        <TextField
            id="standard-number"
            label="Volume"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            onChange={handleChange}
            required
            />
        <Button type='submit' onClick={submitForm}>Confirm Buy</Button>
        </form>
    </div>
  );

  return (
    <div>
      <StyledButton onClick={handleOpen}>
        Buy
      </StyledButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default BuyPrompt;