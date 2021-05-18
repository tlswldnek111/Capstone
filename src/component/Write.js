import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Write extends React.Component {
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
                        <p><TextField id = "TITLE" style = {{width: 700}} label="제목" variant="outlined"></TextField></p>
                        <p><TextField id = "CONTENT" style = {{width: 700}} label="내용" variant="outlined" multiline rows={25}></TextField></p>
                        <Button
                        style={{marginRight: "500px", maxWidth: '100px', maxHeight: '60px', minWidth: '100px', minHeight: '60px'}}
                        variant="contained" color="primary" type="submit">
                            작성
                        </Button>
                        <Link to="/noticeboard">
                            <Button
                            style={{maxWidth: '100px', maxHeight: '60px', minWidth: '100px', minHeight: '60px'}}
                            variant="contained" color="primary">
                                목록
                            </Button>
                        </Link>
                    </form>
                </center>
            </div>
        )
    }
}

export default Write