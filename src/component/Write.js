import React from 'react'
import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../CSS/Write.css'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Header2 from './Header2';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
const styles = theme => ({
    root: {
      backgroundColor: "red"
    },
    appBarSpacer: theme.mixins.toolbar,//앱바 밑으로
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
      fixedHeight: {
        height: '100vh',
      },
  });

class Write extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            PROGRAMS: [],
            PROGRAM: '',
            OPEN: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
   
    handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:3001/board/write', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            ID: localStorage.getItem('id'),
            TITLE: e.target.TITLE.value,
            CONTENT: e.target.CONTENT.value,
            LOCK: 0,
            PROGRAM: this.state.PROGRAM,
            })
        })
        .then(res=>res.json())
        .then(res=>{console.log(res);
            if (res.success === 1) {
                        alert("성공");
                        window.location.href='/noticeboard';
                    } else{
                        alert("실패");
                    }
                    })
    }

    componentDidMount() {
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
            const temp = [];
            for (let i = 0; i < res.length; i++) {
            temp.push(<MenuItem value={res[i].TITLE}>{res[i].TITLE}</MenuItem>)
            }
            this.setState({PROGRAMS: temp});
        })
    }
    handleClose = () => {
        this.setState({OPEN: false});
    };
    
    handleOpen = () => {
        this.setState({OPEN: true});
    };

    handleChange = (e) => {
        this.setState({PROGRAM: e.target.value});
    };

    render() {
        const { classes } = this.props;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        return (
            <div className={fixedHeightPaper} >
                <Header2></Header2>
                <div className={classes.appBarSpacer} />
                    <center >
                        <form onSubmit={this.handleSubmit}>
                        <Typography component="h1" variant="h4" color="inherit" align="center">
                                글쓰기
                            </Typography>
                            <div style={{width:"700px"}}>
                                <FormControl style={{width: "120px", float: "left"}}>
                                    <InputLabel id="inputlabel" >프로그램 명</InputLabel>
                                    <Select
                                    labelId="select"
                                    id="select"
                                    open={this.state.OPEN}
                                    onClose={this.handleClose}
                                    onOpen={this.handleOpen}
                                    value={this.state.PROGRAM}
                                    onChange={this.handleChange}
                                    >
                                    
                                    {this.state.PROGRAMS.map((val)=>{
                                        return val;
                                    })}
                                    </Select>
                                </FormControl>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <Input
                            id="TITLE"
                            style={{width: "700px"}}
                            placeholder="제목을 입력하세요."
                            inputProps={{ 'aria-label': 'description' }}
                            />
                            <br></br>
                            <br></br>
                            <TextField
                            id="CONTENT"
                            style = {{width: "700px"}}
                            multiline
                            rows = {16}
                            variant="outlined"/>
                            <div style={{width: "700px" }}>
                                <Button
                                    style={{float:'left', width:'100px',margin:10}}
                                    variant="contained" 
                                    type="submit"
                                    variant="contained" 
                                    color="primary"
                                   >
                                  입력
                                </Button>
                             
                                <Button 
                                style={{float:'right', width:'100px',margin:10 }}
                                variant="contained"
                                variant="contained" 
                                color="primary"
                                href="/noticeboard"
                                > 
                                목록 
                                </Button>
                            </div>
                            <p> </p>
                        </form>
                    </center>
               
            </div>
        )
    }
}

export default  withStyles(styles, { withTheme: true })(Write);