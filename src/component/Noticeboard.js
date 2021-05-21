import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Header2 from './Header2';
import Tablee from './Tablee';
import { Link } from "react-router-dom";

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Logistics
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      height:"100%",
    },
    fixedHeight: {//페이지 길이.. 드디어..
      height: 'auto',
    },
  }));
 
  export default function Noticeboard(){
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
    return(
     <div className={classes.root}>
         <Header2/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
      
        <Box width="100%" >
              <Paper className={fixedHeightPaper}>
              <Tablee/>
              </Paper>
        </Box>

        <Box mt={5}>
        <Copyright />
      </Box>
          
    </main>
    </div>




    );
  }