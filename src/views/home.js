import React, { Fragment, useState } from "react"; 
import { Hero } from "../components";
import Picker from 'emoji-picker-react';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import IconButton from '@material-ui/core/IconButton';
import {Button, Modal, ModalBody, ModalHeader} from 'react-bootstrap';


const Home = () => {
  const[show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const onEmojiClick = (event, emojiObject) => setChosenEmoji(emojiObject);

  const [submit, setSubmit] = useState(false);
  const [text,   setText]   = useState('');
   return  (
  <Fragment>
    <Hero />
    {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <textarea></textarea>
        </Modal.Header>
        <Modal.Body>
          <div> 
            {chosenEmoji ? (
              <span>You chose: {chosenEmoji.emoji}</span>
            ) : (
              <span>No emoji Chosen</span>
            )}
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
      {/* <IconButton onClick={handleShow}>
        <SentimentSatisfiedIcon></SentimentSatisfiedIcon>
      </IconButton> */}
  </Fragment>
  ); 
};

export default Home;
