import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Vod_upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image : null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const FILE = document.getElementById('upload-photo').files[0];
        const TITLE = event.target.TITLE.value;
        const CATEGORY = event.target.CATEGORY.value;
        const CONTENT = event.target.CONTENT.value;

        console.log('파일' + FILE)
        console.log('제목' + TITLE)
        console.log('장르' + CATEGORY)
        console.log('내용' + CONTENT)

        fetch('http://localhost:3001/vod/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            TITLE: TITLE,
            CATEGORY: CATEGORY,
            CONTENT: CONTENT
          })
        })
        .then(res=>res.json())
        .then(res=>{
            if (res.success === 1) {
                alert('성공');
            }
            else {
                alert('실패');
            }
        })
        .then(()=>{
            var formData = new FormData();
            formData.append('file', FILE);
            let reader = new FileReader();
            reader.readAsDataURL(FILE);
            reader.onloadend = () => {
                this.setState({
                    image: reader.result
                })
            }
            fetch('http://localhost:3001/vod/upload_image', {
            method: 'POST',
            body: formData,
            })
        })
      }

    render() {
        return(
            <div hidden={(localStorage.getItem('id') !== 'admin')}>
                <center>
                    <form onSubmit={this.handleSubmit}>
                        <p>시발</p>
                        <img src={this.state.image}></img>
                        <br></br>
                        <TextField
                        id="TITLE"
                        label="타이틀"
                        required/>
                        <br></br>
                        <TextField 
                        id="CATEGORY"
                        label="장르"
                        required/>
                        <br></br>
                        <TextField
                        id="CONTENT"
                        style={{marginTop:"10px"}}
                        variant="outlined"
                        multiline
                        rows={15}
                        label="내용"
                        required/>
                        <br></br>
                        <Button
                        style={{marginTop:"10px"}}
                        variant="contained"
                        color="primary"
                        type="submit">
                            업로드
                        </Button>
                        <label htmlFor="upload-photo">
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"/>

                        <Button
                        color="primary"
                        variant="contained"
                        component="span"
                        required>
                            이미지 선택
                        </Button>
                        </label>
                    </form>
                </center>
            </div>
        );
    }
}

export default Vod_upload;