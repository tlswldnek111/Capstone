import React from 'react';
import ReactHlsPlayer from 'react-hls-player';
import Chat from './Chat';
import Header2 from './Header2';
import Grid from '@material-ui/core/Grid';
import '../CSS/Live.css';
import ipconfig from '../config/ipConfig';

class Live extends React.Component {

    render(){
        return(
            <div className="div_master">
                <Header2></Header2>
                <div className="div_live">
                    <Grid container spacing={1}>
                        <Grid container item xs={12}>
                            <Grid item xs={8}>
                                <div>
                                    <ReactHlsPlayer
                                    id="video_grid"
                                    src={`http://${ipconfig.ExternalIp}:8000/live/live/index.m3u8`}
                                    autoPlay={false}
                                    controls={true}
                                    width="100%"
                                    height="auto"
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <Chat></Chat>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
            )
    }
}

export default Live;