import React from 'react';
import Header2 from './Header2';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import { Button, Grid, TextField } from '@material-ui/core';

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

class Vod_detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            IDX: 0,
            TITLE: '',
            CATEGORY: '',
            CONTENT: '',
            EPISODE: [],
            URL: ''
        }
        this.handleUpload = this.handleUpload.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3001/vod/select_one', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            IDX: String(this.props.location.search).replace('?idx=', '')
            })
        })
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                IDX: res.IDX,
                TITLE: res.TITLE,
                CATEGORY: res.CATEGORY,
                CONTENT: res.CONTENT,
            })
        })
        .then(()=>{
            const TF_CONTENT = document.getElementById('CONTENT')
            TF_CONTENT.value = this.state.CONTENT;
            TF_CONTENT.setAttribute('style', 'color: black;');
            fetch('http://localhost:3001/vod/select_episode', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                IDX: this.state.IDX
                })
            })
            .then(res=>res.json())
            .then(res=>{
                const temp = [];
                var url = 'http://localhost:3001/vod/video';
                const event=(ep)=>{
                    this.setState({
                        URL: url + '?idx=' + this.state.IDX + '&ep=' + ep
                    })
                    const player = document.getElementById('player');
                    if (!(player === undefined || player === null)) {
                        player.remove();
                    }
                    const div = document.getElementById('video');
                    div.innerHTML = 
                    `<video id="player" width="75%" height="auto" controls preload="metadata"> 
                        <source src=${url + '?idx=' + this.state.IDX + '&ep=' + ep}/> 
                    </video>` 
                }
                for (let i = 0; i < res.length; i++) {
                    temp.push(
                    <Button
                    onClick={()=>{
                        event(res[i]);
                    }}
                    variant="contained">
                        {String(res[i]).slice(0, String(res[i]).lastIndexOf('.'))}
                    </Button>)
                }
                this.setState({
                    EPISODE: temp
                })
            })
        })
    }

    handleUpload(e) {
        this.props.history.push('episode_upload' + String(decodeURI(this.props.location.search)))
    }

    handleUpdate(e) {
        const TF_CONTENT = document.getElementById('CONTENT');
        if (TF_CONTENT.disabled === true) {
            TF_CONTENT.disabled = false;
            TF_CONTENT.setAttribute('style', 'color: blue;');
            TF_CONTENT.focus();
            e.target.textContent = '수정완료';
        } else {
            TF_CONTENT.disabled = true;
            TF_CONTENT.setAttribute('style', 'color: black;');
            e.target.textContent = '수정';
            fetch('http://localhost:3001/vod/update', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                IDX: this.state.IDX,
                CONTENT: TF_CONTENT.value
                })
            })
            .then(res=>res.json())
            .then(res=>{
                if (res.success === 1) {
                    alert('수정되었습니다.');
                } else {
                    alert('수정에 실패했습니다.');
                }
            })
        }
    }

    handleDelete(e) {
        if (window.confirm('삭제하시겠습니까?')) {
            fetch('http://localhost:3001/vod/delete', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                IDX: this.state.IDX,
                CONTENT: document.getElementById('CONTENT').value
                })
            })
            .then(res=>res.json())
            .then(res=>{
                if (res.success === 1) {
                    alert('삭제되었습니다.');
                    this.props.history.push('vod');
                } else {
                    alert('삭제에 실패했습니다.');
                }
            })
        }
    }

    render() {
        var url = `http://localhost:3001/vod/thumbnail?idx=${this.state.IDX}`
        const { classes } = this.props;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        return (
            <div  className={fixedHeightPaper}>
                <Header2/>
                <div style={{marginTop: '64px', width: "100%", height: "100%"}}>
                    <Grid container spacing={1}>
                        <Grid container item xs={12}>
                            <Grid item xs={3}>
                                <center>
                                    <img src={url} style={{width: "184px", height: "263px"}}></img>
                                    <br></br>
                                    <button
                                    hidden={(localStorage.getItem('id') !== 'admin')}
                                    onClick={this.handleUpload}>
                                        업로드
                                    </button>
                                    <button
                                    hidden={(localStorage.getItem('id') !== 'admin')}
                                    onClick={this.handleUpdate}>
                                        수정
                                    </button>
                                    <button
                                    hidden={(localStorage.getItem('id') !== 'admin')}
                                    onClick={this.handleDelete}>
                                        삭제
                                    </button>
                                </center>
                            </Grid>
                            <Grid item xs={9}>
                                <h2>
                                    제목 : {this.state.TITLE}
                                </h2>
                                <h3>
                                    장르 : {this.state.CATEGORY}
                                </h3>
                                <TextField
                                id="CONTENT"
                                style={{width: "300px"}}
                                variant="outlined"
                                multiline
                                rows={7}
                                disabled>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div>
                        <p>
                            에피소드 : {this.state.EPISODE.map((val)=>{
                                return val;
                            })}
                        </p>
                        <div id="video"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(Vod_detail);