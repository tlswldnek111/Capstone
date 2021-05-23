import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Header2 from './Header2';

class Vod extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            VOD: [],
            INFO: []
        };
    }

    show_vod(i) {
        console.log(this.state.VOD);
        var url = `http://localhost:3001/vod/thumbnail?name=${this.state.VOD[i].TITLE}`
        return(
        <Card
        style={{width: 350, height: 250, marginTop: 25, backgroundColor: "#E8E8E8"}}
        variant="outlined">
            <CardContent>
                <img src={url} style={{width: "90%", height: "90%"}}></img>
                <p>{this.state.VOD[i].TITLE}</p>
            </CardContent>
        </Card>);
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
        return(
            <div>
                <Header2></Header2>
                <div style={{marginTop: 64}}></div>
                <div hidden={(localStorage.getItem('id') !== 'admin')}>
                    <Link to="/Vod_upload">
                        <button>업로드</button>
                    </Link>
                </div>
                <center>
                    {this.state.INFO.map((unit, idx) => {
                        return unit;
                    })}
                </center>
            </div>
        );
    }
}

export default Vod;