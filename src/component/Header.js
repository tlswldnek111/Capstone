import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
//import Link from '@material-ui/core/Link';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
      },
      toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
  toolbarTitle: {
    padding: theme.spacing(0),
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  root: {
    display: 'flex',
    width: `calc(100%)`,
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  input: {
    padding: '2px 2px',
    display: 'flex',
    width: 200,
    marginLeft: 1,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 24,
    margin: 4,
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
  
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width : drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const section = [
  { title: '홈', url: '/' },
  { title: '라이브', url: 'live' },
  { title: '방송', url: 'vod' },
];


export default function Header(props) {
  const classes = useStyles();

  return (
   <div className={classes.root}>
      <CssBaseline /> 
      <Toolbar className={classes.toolbar}>
      <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} >
            Logistics
          </Typography>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary} >
        {section.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            to={section.url}
            className={classes.toolbarLink}
            style={{textDecoration:"none",fontSize:"16px",color:"white"}}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
      </div>
    
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};