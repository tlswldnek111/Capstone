import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { mainListItems, secondaryListItems } from './listItems';
import Header from './Header';
import Tablee from './Tablee';
import Button from '@material-ui/core/Button';
const drawerWidth = 240;

const sections = [
    { title: '드라마', url: '#' },
    { title: '예능', url: '#' },
    { title: '시사교양', url: '#' },
    { title: '연예', url: '#' },
    { title: '스포츠', url: '#' },
    { title: '라이프', url: '#' },
    { title: '뉴스', url: '#' },
  ];


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


  const useStyles = makeStyles((theme) => ({
    
    root: {
      display: 'flex',
    },
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
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
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
    mainGrid: {
        marginTop: theme.spacing(3),
      },
      list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
      },
    
  }));
 
  export default function Noticeboard(){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [state, setState] = React.useState({
      left: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };
  
    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        
        <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
       
        
      </div>
    );
    return(
     <div className={classes.root}>
         <CssBaseline />
         <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
             <Toolbar className={classes.toolbar}>
           
             {['MENU'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}

           <Header title="Logistics"  />
             </Toolbar>
         </AppBar>
  
             
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
      
        <Box width="100%" >
              <Paper className={fixedHeightPaper}>
              <Tablee/>
              </Paper>
        </Box>

           
          
    </main>
    </div>




    );
  }