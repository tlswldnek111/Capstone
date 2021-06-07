import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Hls from 'hls.js'
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Header2 from './Header2';
import Carousel from './Carousel';
import BoardTable from './BoardTable';
import no from '../CSS/no.png';

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
    height: '465px',
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
}));

export default function Dashboard(props) {
  const classes = useStyles();
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedHeightPaper2 = clsx(classes.paper, classes.content);
  const [isLive, setIsLive] = useState(false);

  useEffect(()=>{
    const video = document.getElementById('video')
    var hls = new Hls();
    hls.loadSource('http://localhost:8000/live/live/index.m3u8');
    hls.attachMedia(video);
    video.addEventListener('loadeddata', ()=>{
      setIsLive(true);
    })
  }, [])

  return (
    <div className={fixedHeightPaper} >
      <Container maxWidth="lg" style={{width:"900px" }}>
        <Header2/>
        <div className={classes.root} >
          <Container className={classes.container}>
            <Typography className={classes.title} component="h1" variant="h6" color="textSecondary">
              LIVE
            </Typography>
            <Paper className={fixedHeightPaper2} >
              <video hidden={!isLive} width="768px" height="auto" id="video" controls></video>
              <img hidden={isLive} src={no}></img>
            </Paper>
          </Container>
        </div>

        <div className={classes.root}>
          <Container  className={classes.container2}>
            <Typography className={classes.title} component="h1" variant="h6" color="textSecondary">
              이번달 인기 프로그램
            </Typography>
            <Carousel history={props.history}/>
          </Container>
        </div>

        <div className={classes.root}>
          <Container  className={classes.container2}>
            <Typography className={classes.title} component="h1" variant="h6" color="textSecondary">
              이번달 인기 게시글
            </Typography>
            <BoardTable flag="M"></BoardTable>
          </Container>
        </div>
      </Container>
    </div>
  );
}