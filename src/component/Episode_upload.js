import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class Episode_upload extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const FILE = document.getElementById('upload-video').files[0];
        const EPISODE = e.target.EPISODE.value;
        const IDX = String(this.props.location.search).replace('?idx=', '');
        if(FILE === undefined) {
            alert('동영상을 선택해주세요.');
        } else {
            var formData = new FormData();
            const NewFile = new File([FILE]
                , IDX + '@' + EPISODE + String(FILE.name).slice(String(FILE.name).lastIndexOf('.'))
                , {type: FILE.type});
            console.log('파일 테스트: ' + NewFile.name);
            formData.append('file', NewFile);
            let request = new XMLHttpRequest();
            request.open('POST', 'http://localhost:3001/vod/upload_video'); 

            request.upload.addEventListener('progress', function(e) {
                let percent_completed = (e.loaded / e.total)*100;
                document.getElementById('progressBar').value = percent_completed;
                console.log(percent_completed);
            });

            request.addEventListener('load', function(e) {
                console.log(request.status);
                console.log(request.response);
            });

            request.send(formData);
        }
    }

    render() {
        return(
            <div>
                <center>
                    <form onSubmit={this.handleSubmit}>
                        <br></br>
                        <TextField
                        id="EPISODE"
                        label="EPISODE"
                        required/>
                        <br></br>
                        <progress
                        id="progressBar"
                        value="0"
                        max="100"
                        style={{width:"200px", height: "50px"}}/>
                        <br></br>
                        <Button
                        style={{marginTop:"10px"}}
                        variant="contained"
                        color="primary"
                        type="submit">
                            업로드
                        </Button>
                        <label htmlFor="upload-video">
                        <input
                        style={{ display: 'none' }}
                        id="upload-video"
                        name="upload-video"
                        type="file"
                        onChange={this.showImage}/>

                        <Button
                        style={{marginTop:"10px"}}
                        color="primary"
                        variant="contained"
                        component="span">
                            동영상 선택
                        </Button>
                        </label>
                      
                        <br></br>
                        <Button onClick={()=>{
                            this.props.history.goBack();
                        }}>
                            뒤로가기
                        </Button>
                    </form>
                    
                </center>
            </div>
        );
    }
}

export default Episode_upload;