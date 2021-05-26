import React from 'react'
import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../CSS/Write.css'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Header2 from './Header2';
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
        return (
            <div className="fullHeight" >
                <Header2></Header2>
                <div style={{marginTop:"100px"}}  >
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
                            {/* <CKEditor
                                editor={ ClassicEditor }
                                data=""
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );
                                } }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    console.log( { event, editor, data } );
                                } }
                                onBlur={ ( event, editor ) => {
                                    console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                    console.log( 'Focus.', editor );
                                } }
                                onChange={ (event, editor) => {
                                    this.setState({CONTENT: editor.getData()});
                                } }
                            /> */}
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


                             
                                <Link to="/noticeboard">
                                    <Button 
                                    style={{float:'right', width:'100px',margin:10 }}
                                    variant="contained"
                                    variant="contained" 
                                    color="primary"
                                    > 
                                    목록 
                                    </Button>
                                </Link>
                            </div>
                            <p> </p>
                        </form>
                    </center>
                </div>
            </div>
        )
    }
}

export default Write;