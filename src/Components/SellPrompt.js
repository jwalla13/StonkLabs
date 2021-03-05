import React from 'react';
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
      marginTop: 5,
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

function SellPrompt(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const [sellVolume, setsellVolume] = React.useState(0)
  const currentStock = props.currentStock

  const loggedIn = props.loggedIn;
  const loggedUsername = props.loggedUsername;

  const handleChange = event => {
      const { name, value } = event.target
      setsellVolume(value)
  }

  const submitForm = event => {
      console.log(sellVolume)
      event.preventDefault()
      sellOrder()
      handleClose()
  }

  const sellOrder = () => {
      return axios.get('http://localhost:5000/sell/' + loggedUsername + '/' + 
        currentStock.ticker + '/' + sellVolume)
    .then(function (response) {
        console.log(response);
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
      <h2 id="simple-modal-title">Sell {currentStock.ticker}</h2>
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
        <Button type='submit' onClick={submitForm}>Confirm Sell</Button>
        </form>
    </div>
  );

  return (
    <div>
      <StyledButton onClick={handleOpen}>
        Sell
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

export default SellPrompt;