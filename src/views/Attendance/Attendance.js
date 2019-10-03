import React from 'react';
import { Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

export default function Attendance({ match }) {
  const [open, setOpen] = React.useState(true);
  const [name, setName] = React.useState("");
  const [openResult, setOpenResult] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const _parseJSON = (response) => {
    console.log(response);
    return response.text().then(function(text) {
      return text ? JSON.parse(text) : {}
    })
  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/' />
    }
  }

  const handleClose = () => {
    setOpen(false);

    fetch('https://us-central1-snd-application.cloudfunctions.net/attendance', {
      mode: 'cors',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session: match.params.sessionId,
        userId: name,
      }),
    })
    .then((response) => _parseJSON(response))
    .then((responseJson) => {
      console.log(responseJson.time);
      console.log(responseJson.status);
      setOpenResult(true);
    })
    .catch((error) =>{
      console.error(error);
    });
  };

  const onChangeName = e => {
    setName(e.target.value);
  };

  const handleCloseResult = () => {
    setOpenResult(false);
    setRedirect(true);
  };


  return (
    <div>
      {renderRedirect()}
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">S&D {match.params.sessionId} 출석</DialogTitle>
        <DialogContent>
          <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input onChange={onChangeName} id="name" name="name" autoComplete="name"/>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            출석
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={openResult}
        onClose={handleCloseResult}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"세션 출석 완료"}</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {match.params.sessionId} 출석이 완료되었습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResult} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
