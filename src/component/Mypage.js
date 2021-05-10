import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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


class Register extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        success:0,
        check:0,
        message: '로그인',
        ID:0,
        NAME:null,
        PASSWORD:null,
        PHONE:null,
        text:'로그인',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleSubmit(event) {
    event.preventDefault();
    if(this.state.text==='로그인'){
    fetch('http://localhost:3001/user/login', {
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
    .then(res=>{if (res.length === 0) {
                  alert("아이디 혹은 비밀번호를 잘못입력하셨습니다.");
                } else{
                this.setState({message:'회원정보 수정'})
                this.setState({text: '수정'})
                }
              })
  }
  else if (this.state.text==='수정') {


  }
}
  render() {

    return (
      
      <Container component="main" >
      <div className={useStyles.paper}>
      <Grid>
           ㅤㅤㅤㅤ 
          
           </Grid>
        <Avatar className={useStyles.avatar}>
          <LockOutlinedIcon /> 
        </Avatar>
        <Typography component="h1" variant="h6">
          {this.state.message}
        </Typography>

        <form className={useStyles.form} noValidate  onSubmit={this.handleSubmit}  >
          <Grid container spacing={2}>
          <Grid item xs={12} >
           <TextField
                variant="outlined"
                required
                fullWidth
                id="ID"
                label="ID"
                name="ID"
                autoComplete="ID"
                disabled//아이디는 고정되어있음.
                value={localStorage.getItem('username')}
              />
            </Grid>
           <Grid item xs={12}>
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
            
           { this.state.text==='수정' ?  
              <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="NAME"
                      label="NAME"
                      name="NAME"
                      autoComplete="NAME"
                     
                    />
                  </Grid>
                     <Grid>

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
                  
                  </Grid>
                  
                  : <div></div>}

                  
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
          >
           {this.state.text}
          </Button>
          </Grid>

          <p> </p>
         
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
               뒤로가기
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

export default Register;