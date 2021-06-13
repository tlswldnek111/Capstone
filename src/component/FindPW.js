import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import ipconfig from '../config/ipConfig';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/" >
        Logistics
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

class FindPW extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        success:0,
        check:0,
        message: '',
        ID:0,
        NAME:null,
        PASSWORD:null,
        PHONE:null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleSubmit(event) {
    event.preventDefault();
    if (this.state.success === 0) {
      fetch(`http://${ipconfig.ExternalIp}:3001/user/find_pw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: event.target.ID.value,
          PHONE: event.target.PHONE.value 
        })
      })
      .then(res=>res.json()) 
      .then(res=>{  if(res.success === 0){ //없을때..
                      alert("일치하지 않는 정보입니다."); 
                    }else {
                      this.setState({success: 1});
                      event.target.ID.disabled = true;
                      event.target.PHONE.disabled = true;
                      event.target.FIND.textContent = "비밀번호 변경";
                    }
      })
    } else {
      fetch(`http://${ipconfig.ExternalIp}:3001/user/update_pw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: event.target.ID.value,
          PASSWORD: event.target.PASSWORD.value 
        })
      })
      .then(res=>res.json())
      .then(res=>{
        if (res.success === 1) {
          alert('비밀번호가 변경되었습니다.');
          this.props.history.push('login');
        } else {
          alert('비밀번호 변경에 실패했습니다.');
        }
      })
    }
}
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <div className={useStyles.paper}>
          <center>
            <Avatar className={useStyles.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h6">
              비밀번호 찾기
            </Typography>
          </center>
          <form className={useStyles.form} noValidate  onSubmit={this.handleSubmit}  >
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="ID"
                label="ID"
                name="ID"
                autoComplete="ID"
                autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="PHONE"
                  label="PHONE"
                  name="PHONE"
                  autoComplete="PHONE"
                />
              </Grid>

              <Grid hidden={(this.state.success === 0)} item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="PASSWORD"
                  label="PASSWORD"
                  name="PASSWORD"
                  autoComplete="PASSWORD"
                />
              </Grid>
            </Grid>

            <br></br>

            <Button
            id="FIND"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}>
              검색
            </Button>
          
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/Login" style={{textDecoration:"none", color:"black"}} >
                  <Button>
                    로그인하러 가기 
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </form>

      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
  }
}

export default FindPW;