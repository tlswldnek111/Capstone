import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Header2 from './Header2';
import BoardTable from './BoardTable';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import Container from '@material-ui/core/Container';
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
 
  export default function Noticeboard(props){
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [open, setOpen] = React.useState(false);
    const [program, setprogram] = React.useState('전체');
    const [sch,setsch]=React.useState('');
    const [menu, setMenu]=React.useState([]);
    const [v_idx, setV_idx]=React.useState({});

    useEffect(()=>{
      fetch('http://121.145.133.119:3001/vod/select', {
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
        const temp2 = {}
        temp.push(<MenuItem value={'전체'}>전체</MenuItem>)
        for (let i = 0; i < res.length; i++) {
          temp.push(<MenuItem value={res[i].TITLE}>{res[i].TITLE}</MenuItem>);
          temp2[res[i].TITLE] = res[i].IDX;
        }
        setMenu(temp);
        setV_idx(temp2);
        //setprogram('전체');
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
    const handleWrite = () => {
      if (localStorage.getItem('id') === null) {
        props.history.push('login');
      } else {
        props.history.push('write');
      }
    }

    return(
      <Container component="main" maxWidth="md">
        <div className={classes.root}>
          <Header2/>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Box width="100%" >
              <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} align="center">
                {program} 시청자 게시판
              </Typography>
      
              <FormControl className={classes.formControl}>
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

              <div style={{float: 'right', textDecoration:"none", color:"black" ,margin:20}}>
                <Button 
                  type="check"
                  variant="contained"
                  color="primary"
                  onClick={handleWrite}
                >
                글 작성
                </Button>
              </div>
              <Paper className={fixedHeightPaper}>
                <BoardTable programs={program} v_idx={v_idx[program]} searchs={sch}/>
              </Paper>
            </Box>

            <Box mt={5}>
              <Copyright />
            </Box>
          </main>
        </div>
      </Container>
    );
  }