import React from 'react';
import Header2 from './Header2';

class Vod_detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            TITLE: '',
            CATEGORY: '',
            CONTENT: '',
            EPISODE: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/vod/select_one', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            TITLE: String(decodeURI(this.props.location.search)).replace('?title=', '')
            })
        })
        .then(res=>res.json())
        .then(res=>{
            this.setState({
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
                TITLE: this.state.TITLE
                })
            })
            .then(res=>res.json())
            .then(res=>{
                this.setState({
                    EPISODE: res
                })
            })
        })
    }

    render() {
        var url = `http://localhost:3001/vod/thumbnail?name=${this.state.TITLE}`
        return (
            <div>
                <Header2/>
                <div style={{marginTop: '64px'}}>
                    <center>
                        <img src={url} style={{width: "50%", height: "50%"}}></img>
                        <p>
                            제목 : {this.state.TITLE}
                        </p>
                        <p>
                            장르 : {this.state.CATEGORY}
                        </p>
                        <p>
                            내용 : {this.state.CONTENT}
                        </p>
                        <p>
                            에피소드 : {this.state.EPISODE.map((val)=>{
                                val = val + ' '
                                return val;
                            })}
                        </p>
                    </center>
                </div>
            </div>
        )
    }
}

export default Vod_detail;