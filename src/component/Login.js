import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
//alignItems="center" "static"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" >
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/" >
        Logistics
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const styles = theme => ({
  paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: '100vh',
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
});



class Login extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            id:null,
            username:null,
            password:null,
            phone:null
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
      .then(res=>{if (res.success === 0) {
                    this.setState({username: null})
                    alert("아이디 혹은 비밀번호를 잘못입력하셨습니다.");
                  } else{
                    this.setState({username: res.NAME})
                    this.setState({id: res.ID})
                    this.setState({phone: res.PHONE})
                   
                    localStorage.setItem('username',`${this.state.username}`);
                    localStorage.setItem('id',`${this.state.id}`);
                    localStorage.setItem('phone',`${this.state.phone}`);
                    alert( `환영합니다 ${this.state.username} 님`);
                    this.props.history.push('/');
                  }
                })
    }
    render(){
      const { classes } = this.props;
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
     return (
     
        <div className={fixedHeightPaper}  >
      <Container component="main" maxWidth="xs">
        
        <div className={classes.paper} >  
         
        <Grid>
           </Grid>
           <center >
          <Avatar className={classes.avatar} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h6" align="center">
            로그인 화면
          </Typography>
          </center>
          
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
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
            className={classes.submit}
          >
            로그인
          </Button>
         

          <Grid container>
          <Grid item xs>
        <Link to="FindID" style={{textDecoration:"none", color:"black"}} variant="body1">
         아이디
        </Link>
/
        <Link to="FindPW" style={{textDecoration:"none", color:"black"}} variant="body1">
            비밀번호 찾기
        </Link>
          </Grid>
          <Grid item>
          <Link to="/" style={{textDecoration:"none", color:"black"}} variant="body1">
            메인화면
        </Link>
        /
         <Link to="Register" style={{textDecoration:"none", color:"black"}} variant="body1">
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
      </div>
    );
    }
}

export default withStyles(styles, { withTheme: true })(Login);