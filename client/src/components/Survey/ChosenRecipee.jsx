import React from 'react';
import { FcOk } from 'react-icons/fc';
import './ChosenRecipee.scss';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90vw',
    margin: 'auto auto',
  },
  paper: {
    backgroundColor: '#65aa65',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 5, 1),
    outline: 'none',
    textAlign: 'center',
  },
}));

export const ChosenRecipee = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <div className='winner'>
              <div className='header'>
                <h2>{props.item.title}</h2>
                <FcOk />
              </div>
              <p>{props.item.title} Won the Most Votes</p>
              <p>Would you like us to find you a recipee?</p>
              <div className='buttons'>
                <Link
                  to={{
                    pathname: `/recipes/${props.item.title}`,
                    state: {
                      title: props.item.title,
                    },
                  }}
                >
                  <Button variant='contained'>Yes Please</Button>
                </Link>
                <Button variant='contained' onClick={props.handleClose}>
                  No Thanks
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
