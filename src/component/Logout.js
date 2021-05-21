import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemText from '@material-ui/core/ListItemText';


function Logout1(){

  localStorage.clear();
  alert('로그아웃되었습니다.');
  window.location.replace("/");//확인 누르면 홈으로 이동
}

export default function Logout() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <ListItemText primary="로그아웃" onClick={handleClickOpen} />
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Logistics information"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
           로그아웃 하시겠습니까?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button  onClick={Logout1} color="primary" >
           네
          </Button>
          <Button onClick={handleClose} color="primary" >
            아니요
          </Button>
        </DialogActions>
        
      </Dialog>
    </div>
  );
}