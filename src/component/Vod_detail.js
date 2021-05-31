import React from 'react';
import Header2 from './Header2';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import { Button, Grid } from '@material-ui/core';

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
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3001/vod/select_one', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            IDX: String(decodeURI(this.props.location.search)).replace('?idx=', '')
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

    onClick() {
        this.props.history.push('episode_upload' + String(decodeURI(this.props.location.search)))
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
                                </center>
                            </Grid>
                            <Grid item xs={9}>
                                <p>
                                    제목 : {this.state.TITLE}
                                </p>
                                <p>
                                    장르 : {this.state.CATEGORY}
                                </p>
                                <p>
                                    내용 : {this.state.CONTENT}
                                </p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div>
                        <Button variant="contained" color="primary" onClick={this.onClick}> 업로드 </Button>
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