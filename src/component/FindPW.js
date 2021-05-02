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
    fetch('http://localhost:3001/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        NAME: event.target.NAME.value,
        ID: event.target.ID.value,
        PASSWORD: event.target.PASSWORD.value 
      })
    })
    .then(res=>res.json()) 
    .then(res=>{if (res.success === 0) {
                  this.setState({success: null})
                } else{
                  this.setState({success: 1})
                  alert("회원가입 성공");
                  window.location.href = "/";//확인 누르면 홈으로 이동
                }
              })
  }
  doAction(){alert("회원가입 완료 되었습니다.");}
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
          비밀번호 찾기
        </Typography>
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


          <Grid>
           </Grid>
           
           <Grid>
           ㅤㅤㅤㅤ 
          
           </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
            
          >
            비밀번호 검색
          </Button>
        
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="Login" variant="body2">
               로그인하러 가기
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