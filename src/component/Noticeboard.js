import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Header2 from './Header2';
import Tablee from './Tablee';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
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
    input: {
      marginLeft: 1,
      padding: 5,
      margin: theme.spacing(4),
    },
    iconButton: {
      padding: 5,
    },
    divider: {
      height: 28,
      margin: 4,
    }, 
    button: {
      display: 'block',
      float:'right',
      margin: theme.spacing(2),
      
    },
    formControl: {
      margin: theme.spacing(3),
      minWidth: 120,
    },
    title:{
      fontSize:22,
      marginTop: theme.spacing(3),
    },
  }));
 
  export default function Noticeboard(){
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [open, setOpen] = React.useState(false);
    const [program, setprogram] = React.useState('');
    const [sch,setsch]=React.useState('');
    const handleChange = (event) => {
      setprogram(event.target.value);
    };
    const handleChange2 = (event) => {
      setsch(event.target.value);
    };
    const handleClose = () => {
      setOpen(false);
    };
    
    const handleOpen = () => {
      setOpen(true);
    };
    return(
      <div className={classes.root}>
        <Header2/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Box width="100%" >
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} align="center">
           {program} 시청자 게시판
          </Typography>
  
      <FormControl className={classes.formControl}  >
        <InputLabel id="inputlabel">프로그램 명</InputLabel>
         <Select
          labelId="select"
          id="select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={program}
          onChange={handleChange}
        >
          <MenuItem value={"신서유기"} >신서유기</MenuItem>
          <MenuItem value={"런닝맨"}>런닝맨</MenuItem>
          <MenuItem value={"킹덤"}>킹덤</MenuItem>
          <MenuItem value={"코미디빅리그"}>코미디빅리그</MenuItem>
        </Select>
      </FormControl>

      <InputBase 
       className={classes.input}
       placeholder='검색'
       inputProps={{ 'aria-label': 'search' }}
       onChange={handleChange2}
       />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
       <SearchIcon />
     </IconButton>

          <Button 
            type="check"
            variant="contained"
            className={classes.button}
            variant="contained"
             color="primary"
          >
           글 작성
          </Button>
    
              <Paper className={fixedHeightPaper}>
              <Tablee programs={program} searchs={sch}/>
              
              </Paper>
        </Box>

        <Box mt={5}>
        <Copyright />
      </Box>
          
      </main>
    </div>




    );
  }