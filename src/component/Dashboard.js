import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Header2 from './Header2';
import Carousel from './Carousel';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
  },
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0),
    },
  appBarSpacer: theme.mixins.toolbar,//앱바 밑으로
  content: {
    height: '50vh',
  },
  container: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(1),
  },
  container2: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: '100vh',
  },
  picture:{
    height: '50vh',
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(0),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.content);
  return (
    <div className={fixedHeightPaper} >
      <Container maxWidth="lg" style={{width:"900px" }}>
        <Header2/>
        <div className={classes.root} >
          <Container  className={classes.container}>
            <Paper className={fixedHeightPaper2} >
              <Grid className={classes.picture} >
              </Grid>
            </Paper>
          </Container>
        </div>

        <div className={classes.root}>
          <Container  className={classes.container2}>
            <Typography className={classes.title} component="h1" variant="h6" color="textSecondary">
              Logistics에서 추천하는 프로그램
            </Typography>
            <Carousel history={props.history}/>
          </Container>
        </div>
      </Container>
    </div>

  );
}
/*

 <div className={classes.appBarSpacer} />
        <Container  className={classes.container}>
          <Grid container spacing={5}> 
          <Paper className={fixedHeightPaper}>

         
            <Grid className={classes.picture}  />
            </Paper>   
           
            <Grid item xs={12} md={4} lg={9}>
             <button>안녕</button>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
            
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
    </div>
*/