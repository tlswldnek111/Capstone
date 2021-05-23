import React from 'react'
import { Typography } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../CSS/Write.css'

class Write extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CONTENT: ''
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
            CONTENT: this.state.CONTENT,
            LOCK: 0 
            })
        })
        .then(res=>res.json())
        .then(res=>{console.log(res);
            if (res.success === 1) {
                        alert("성공");
                    } else{
                        alert("실패");
                    }
                    })
    }

    render() {
        return (
            <div>
                <center>
                    <form onSubmit={this.handleSubmit}>
                        <Typography variant="h6">
                            글쓰기
                        </Typography>
                        <p><Input id = "TITLE" style = {{width: 700}} placeholder="제목을 입력하세요." inputProps={{ 'aria-label': 'description' }} /></p>
                        <CKEditor
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
                        />
                        <Button
                            style={{marginRight: "500px", maxWidth: '100px'}}
                            variant="contained" type="submit">
                            등록
                        </Button>
                        <Button 
                            style={{marginRight: "10px", maxWidth: '100px'}}
                            variant="contained">
                             취소 
                        </Button>
                        <Link to="/noticeboard">
                            <Button variant="contained"> 목록 </Button>
                        </Link>
                        <p> </p>
                    </form>
                </center>
            </div>
        )
    }
}

export default Write