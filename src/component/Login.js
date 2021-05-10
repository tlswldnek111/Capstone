
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

//alignItems="center" "static"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" >
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
    //alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


class Login extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            id:null,
            username:null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      event.preventDefault();
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
                    this.setState({username: null})
                    alert("아이디 혹은 비밀번호를 잘못입력하셨습니다.");
                  } else{
                    this.setState({username: res[0].NAME})
                    alert( `환영합니다 ${this.state.username} 님`);
                    localStorage.setItem('username',`${this.state.username}`);
                    window.location.href = "/";//확인 누르면 홈으로 이동

                  }
                })
    }
    render(){
     return (
     
      <Container component="main">
        
        <div className={useStyles.paper} >  
        <Grid>
           ㅤㅤㅤㅤ 
          
           </Grid>
          <Avatar className={useStyles.avatar} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h6">
            로그인 화면
          </Typography>

          <form className={useStyles.form} noValidate onSubmit={this.handleSubmit}>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="PASSWORD"
            label="PASSWORD"
            type="PASSWORD"
            id="PASSWORD"
            autoComplete="current-password"
          />
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
          >
            로그인
          </Button>
         
          <p>
          {this.state.username ? `Hello ${this.state.username}` : '로그인되는지테스트하기위한문장'}
          </p>

          <Grid container>
          <Grid item xs>
        <Link href="FindID" variant="body1">
         아이디 찾기
        </Link>
/
        <Link href="FindPW" variant="body1">
            비밀번호 찾기
        </Link>
          </Grid>
          <Grid item>
          <Link href="/" variant="body1">
            메인화면으로
        </Link>
        /
         <Link href="Register" variant="body1">
          회원가입
        </Link>
    </Grid>
    </Grid>

          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      
    );
    }
}

export default Login;
