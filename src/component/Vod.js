import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Header2 from './Header2';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
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

class Vod extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            VOD: [],
            INFO: [],
        };
        this.Card_Click = this.Card_Click.bind(this);
    }

    show_vod(i) {
        var url = `http://localhost:3001/vod/thumbnail?idx=${this.state.VOD[i].IDX}`
        return(
        <div style={{float:"left"}}>
            <Card
            id={"card" + i}
            style={{width: "185px", height: "280px", marginTop: 25, backgroundColor: "#E8E8E8"}}
            variant="outlined"
            onClick={()=>{
                this.Card_Click(i);
            }}>
                <CardContent>
                    <img src={url} style={{width: "100%", height: "100%"}}></img>
                    <p>{this.state.VOD[i].TITLE}</p>
                </CardContent>
            </Card>
        </div>);
    }

    Card_Click(i) {
        this.props.history.push('vod_detail?idx=' +
        this.state.VOD[i].IDX);
    }

    componentDidMount() {
        const VOD = [];
        fetch('http://localhost:3001/vod/select', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          })
        })
        .then(res=>res.json())
        .then(res=>{ if(res.length != 0) {
                        for (let i = 0; i < res.length; i++) {
                            VOD.push({
                                IDX: res[i].IDX,
                                TITLE: res[i].TITLE,
                                CATEGORY: res[i].CATEGORY,
                                CONTENT: res[i].CONTENT,
                                IMAGEPATH: res[i].IMAGE_PATH
                            })
                        }
                    }
        })
        .then(()=>{
            this.setState({VOD: VOD});
        })
        .then(()=>{
            const INFO = [];
            for (let i = 0; i < this.state.VOD.length; i++) {
                INFO.push(this.show_vod(i));
            }
            this.setState({INFO: INFO});
        })
    }

    render() {
        
        const { classes } = this.props;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        return(
            <div className={fixedHeightPaper}>
                <Header2></Header2>
                <div style={{marginTop: 64}}></div>
                <div
                hidden={(localStorage.getItem('id') !== 'admin')}>
                    <Link to="/Vod_upload">
                        <button>업로드</button>
                    </Link>
                </div>
                <center>
                    {this.state.INFO.map((unit) => {
                        return unit;
                    })}
                </center>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Vod);