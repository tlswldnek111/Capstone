import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

class FindID extends React.Component{

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
    fetch('http://localhost:3001/user/find_id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        NAME: event.target.NAME.value,
        PHONE: event.target.PHONE.value
      })
    })
    .then(res=>res.json()) 
    .then(res=>{  if(res.ID.length<=0){ //없을때..
                       alert("일치하지 않는 정보입니다."); 
                  }else//값이 있을때....
              {
                alert("현재 아이디 : "+res.ID); //아이디 검색에 성공한경우
                window.location.href = "/";//확인 누르면 홈으로 이동
              }
               
              })
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
          아이디 찾기
        </Typography>
        <form className={useStyles.form} noValidate  onSubmit={this.handleSubmit}  >
          <Grid container spacing={2}>
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
            아이디 검색
          </Button>
        
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="Login" variant="body2">
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

export default FindID;