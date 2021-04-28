// import React from 'react';

// class Login extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             id:null,
//             username:null
//         };
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleSubmit(event) {
//       event.preventDefault();
//       fetch('http://localhost:3001/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ID: event.target.ID.value,
//           PASSWORD: event.target.PASSWORD.value 
//         })
//       })
//       .then(res=>res.json())
//       .then(res=>{if (res.length === 0) {
//                     this.setState({username: null})
//                   } else{
//                     this.setState({username: res[0].NAME})
//                   }
//                 })
//     }

//     render() {
//         return(
//             <div>
//                 <p>
//                 {this.state.username ? `Hello ${this.state.username}` : 'SIGN IN'}
//                 </p>
//                 <form onSubmit={this.handleSubmit}>
//                     <p><input type="text" name="ID"></input></p>
//                     <p><input type="text" name="PASSWORD"></input></p>
//                     <p><button type="submit">로그인</button></p>
//                 </form>
//             </div>
//         );
//     }
// }

// export default Login;

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
                  } else{
                    this.setState({username: res[0].NAME})
                  }
                })
    }
    render(){
     return (
     
      <Container component="main">
        
        <div className={useStyles.paper} >  
          <Avatar className={useStyles.avatar} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h6">
            로그인 화면
          </Typography>

          <form className={useStyles.form} noValidate>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
                <p>
                {this.state.username ? `Hello ${this.state.username}` : '로그인되는지테스트하기위한문장'}
                </p>
           <form onSubmit={this.handleSubmit}> 
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
          >
            로그인
          </Button>
          </form>

          <Grid container>
          <Grid item xs>
        <Link href="#" variant="body1">
         비밀번호 찾기
        </Link>
          </Grid>
          <Grid item>
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
    /*
    render() {
      
        return(
            <div className="App">
                <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                {this.state.username ? `Hello ${this.state.username}` : 'SIGN IN'}
                </p>
                <form onSubmit={this.handleSubmit}>
                    <p><input type="text" name="ID"></input></p>
                    <p><input type="text" name="PASSWORD"></input></p>
                    <p><button type="submit">전송</button></p>
                </form>
                </header>
            </div>
        );
    }
    */
}

export default Login;
