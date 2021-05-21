import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
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
        message: '',
        ID:0,
        NAME:null,
        PASSWORD:null,
        PHONE:null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
}
handleChange(e){
    this.setState({ID:e.target.value});
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
        PASSWORD: event.target.PASSWORD.value ,
        PHONE: event.target.PHONE.value 
      })
    })
    .then(res=>res.json()) 
    .then(res=>{if (res.success === 0) {
                  this.setState({success: null})
                  alert("잘못입력했습니다. 다시 입력해주세요.");
                } else{
                  alert("회원가입 성공");
                  this.props.history.push('/');//확인 누르면 홈으로 이동
                }
              })
  }
  handleCheck(event) {
    event.preventDefault();
    fetch('http://localhost:3001/user/check_id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ID: this.state.ID
      })
    })
    .then(res=>res.json()) 
    .then(res=>{if (res.check === 0) {
                  this.setState({check: null})
                } else{
                  this.setState({check: 1})
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
          회원가입
        </Typography>
        <form className={useStyles.form} noValidate  onSubmit={this.handleSubmit}  >
          <Grid container spacing={2}>
           
            <Grid item xs={18} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ID"
                label="ID"
                name="ID"
                autoComplete="ID"
                onChange={this.handleChange}
                disabled={(this.state.check===null)}//중복체크확인되면 아이디 못바꿈
              />
            </Grid>
            <Button 
           //아이디 중복체크 확인되면 disabled로 변환
            type="check"
            variant="contained"
            color="white"
            onClick={this.handleCheck}
            disabled={(this.state.check===null)}
            
          >
            아이디 중복체크
          </Button>
          <Grid>
           ㅤㅤㅤㅤ 
           </Grid>
          <p>
          {this.state.check ? `사용불가능` : ` ` }
          </p>
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
           <Grid>
           </Grid>
           <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="NAME"
                variant="outlined"
                required
                fullWidth
                id="NAME"
                label="NAME"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                autoComplete="PHONE"
                name="PHONE"
                variant="outlined"
                required
                fullWidth
                id="PHONE"
                label="PHONE (-제외 입력)"
                autoFocus
              />
            </Grid>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
            
          >
            회원가입
          </Button>
          </Grid>

         
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="Login" style={{textDecoration:"none", color:"black"}} variant="body2">
                <Button >
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

export default Register;