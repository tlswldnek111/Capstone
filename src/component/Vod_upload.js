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
        this.showImage = this.showImage.bind(this);
    }

    showImage() {
        try {
            const FILE = document.getElementById('upload-photo').files[0];
            let reader = new FileReader();
            reader.readAsDataURL(FILE);
            reader.onloadend = () => {
            this.setState({
                image: reader.result
            });
            }
        } catch {
            this.setState({
                image: null
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const FILE = document.getElementById('upload-photo').files[0];
        const TITLE = event.target.TITLE.value;
        const CATEGORY = event.target.CATEGORY.value;
        const CONTENT = event.target.CONTENT.value;

        if(FILE === undefined) {
            alert('이미지를 선택해주세요.');
        } else {
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
                const NewFile = new File([FILE]
                    , TITLE + '.' + String(FILE.name).split('.')[1]
                    , {type: FILE.type});
                formData.append('file', NewFile);
                fetch('http://localhost:3001/vod/upload_image', {
                method: 'POST',
                body: formData,
                })
            })
        }
      }

    render() {
        return(
            <div hidden={(localStorage.getItem('id') !== 'admin')}>
                <center>
                    <form onSubmit={this.handleSubmit}>
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
                            type="file"
                            onChange={this.showImage}/>

                        <Button
                        color="primary"
                        variant="contained"
                        component="span">
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