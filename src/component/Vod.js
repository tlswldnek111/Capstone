import React from 'react';
import { Link } from 'react-router-dom';

class Vod extends React.Component {

    render() {
        return(
            <div>
                <Link to="/Vod_upload">
                    <button>업로드</button>
                </Link>
            </div>
        );
    }
}

export default Vod;