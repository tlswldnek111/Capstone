import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ipconfig from '../config/ipConfig';

const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'scroll',
        flexDirection: 'column',
      },
    fixedHeight: {
        height: '100vh',
    },
});

class Vod_upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image : null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showImage = this.showImage.bind(this);
        this.style = {width: "400px", marginBottom: "10px"};
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
        const CATEGORY = document.getElementById('CATEGORY').innerText;
        const CONTENT = event.target.CONTENT.value;

        if(FILE === undefined) {
            alert('이미지를 선택해주세요.');
        } else {
            fetch(`http://${ipconfig.ExternalIp}:3001/vod/upload`, {
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
                fetch(`http://${ipconfig.ExternalIp}:3001/vod/select_one`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        TITLE: TITLE
                    })
                })
                .then(res=>res.json())
                .then(res=>{
                    var formData = new FormData();
                    const NewFile = new File([FILE]
                        , res.IDX + '.' + String(FILE.name).split('.')[1]
                        , {type: FILE.type});
                    formData.append('file', NewFile);
                    fetch(`http://${ipconfig.ExternalIp}:3001/vod/upload_image`, {
                    method: 'POST',
                    body: formData,
                    })
                    .then(()=>{
                        window.location.replace("/vod");
                    })
                })
            })
        }
      }

    render() {
        const { classes } = this.props;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        return(
            <div className={fixedHeightPaper} hidden={(localStorage.getItem('id') !== 'admin')}>
                <center>
                    <form onSubmit={this.handleSubmit}>
                        <img src={this.state.image}></img>
                        <br></br>
                        <TextField
                        id="TITLE"
                        style={this.style}
                        label="타이틀"
                        required/>
                        <br></br>
                        <Select
                        id="CATEGORY"
                        style={this.style}
                        defaultValue={10000}
                        required>
                        <MenuItem value={10000}>예능</MenuItem>
                        <MenuItem value={20000}>드라마</MenuItem>
                        <MenuItem value={30000}>영화</MenuItem>
                        <MenuItem value={40000}>애니메이션</MenuItem>
                        </Select>
                        <br></br>
                        <TextField
                        id="CONTENT"
                        style={this.style}
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
                         style={{marginTop:"10px"}}
                        color="primary"
                        variant="contained"
                        component="span">
                            이미지 선택
                        </Button>
                        </label>
                      
                        <br></br>
                        <Link to="/vod" style={{textDecoration:"none", color:"black"}}>
                            <Button>
                                뒤로가기
                            </Button>
                        </Link>
                    </form>
                </center>
            </div>
        );
    }
}

export default  withStyles(styles, { withTheme: true })(Vod_upload);