import React from 'react';
import ReactHlsPlayer from 'react-hls-player';
import Chat from './Chat';
import Header2 from './Header2';
import Grid from '@material-ui/core/Grid';
import '../CSS/Live.css';

class Live extends React.Component {

    render(){
        return(
            <div className="div2">
                <Header2></Header2>
                <div className="div">
                    <div className="live_div">
                        <Grid container spacing={1}>
                            <Grid container item xs={12}>
                                <Grid item xs={8}
                                className="grid">
                                    <div>
                                        <ReactHlsPlayer
                                        id="video_grid"
                                        src="http://121.145.133.119:8000/live/live/index.m3u8"
                                        autoPlay={false}
                                        controls={true}
                                        width="100%"
                                        height="auto"
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={4}
                                    className="grid"
                                >
                                    <Chat></Chat>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                

            </div>
            )
    }
}

export default Live;