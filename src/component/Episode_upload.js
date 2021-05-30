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
        const TITLE = decodeURI(String(this.props.location.search).replace('?title=', ''));
        
        if(FILE === undefined) {
            alert('동영상을 선택해주세요.');
        } else {
            var formData = new FormData();
            const NewFile = new File([FILE]
                , TITLE + '@' + EPISODE + String(FILE.name).slice(String(FILE.name).lastIndexOf('.'))
                , {type: FILE.type});
            console.log('파일 테스트: ' + NewFile.name);
            formData.append('file', NewFile);
            fetch('http://localhost:3001/vod/upload_video', {
            method: 'POST',
            body: formData,
            })
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
                        <Button>
                            뒤로가기
                        </Button>
                    </form>
                    
                </center>
            </div>
        );
    }
}

export default Episode_upload;