import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Header2 from './Header2';
import BoardTable from './BoardTable';
import { Link } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

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
      marginLeft: 10,
      padding: 5,
      margin: theme.spacing(3),
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
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    title:{
      fontSize:22,
      marginTop: theme.spacing(3),
    },
    menu:{
      marginLeft: 10,
      padding: 5,
      margin: theme.spacing(0),
    },
  }));
 
export default function MyPosts(){
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [open, setOpen] = React.useState(false);
  const [program, setprogram] = React.useState('');
  const [sch,setsch]=React.useState('');
  const [menu, setMenu]=React.useState([]);

  useEffect(()=>{
    fetch('http://localhost:3001/vod/title', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      })
    })
    .then(res=>res.json())
    .then(res=>{
      const temp = []
      temp.push(<MenuItem value={'전체'}>전체</MenuItem>)
      for (let i = 0; i < res.length; i++) {
        temp.push(<MenuItem value={res[i].TITLE}>{res[i].TITLE}</MenuItem>)
      }
      setMenu(temp);
      setprogram('전체');
    })
  }, [])

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
            {localStorage.getItem('username')} 님의 작성 글 관리
          </Typography>

          <FormControl className={classes.formControl}  >
            <InputLabel  className={classes.menu} id="inputlabel" >프로그램 명</InputLabel>
            <Select
              labelId="select"
              id="select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={program}
              onChange={handleChange}
              className={classes.menu}
            >
              
              {menu.map((val)=>{
                return val;
              })}
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

          <Paper className={fixedHeightPaper}>
            <BoardTable programs={program} searchs={sch} sel={'my_posts'}/>
          </Paper>
        </Box>

        <Box mt={5}>
          <Copyright />
        </Box>
          
      </main>
    </div>
  );
}