import React from 'react';
import { Link } from 'react-router-dom';

class Vod extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            VOD: []
        };
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
                        for (var i = 0; i < res.length; i++) {
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
    }

    render() {
        return(
            <div>
                <div hidden={(localStorage.getItem('id') !== 'admin')}>
                    <Link to="/Vod_upload">
                        <button>업로드</button>
                    </Link>
                </div>

            </div>
        );
    }
}

export default Vod;