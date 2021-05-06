import React from 'react';
import ReactHlsPlayer from 'react-hls-player';
import Chat from './Chat';
import SplitPane from 'react-split-pane/lib/SplitPane';
import Pane from 'react-split-pane/lib/Pane'

class Live extends React.Component {
    render(){
        return(
            <SplitPane split="vertical">
            <Pane initialSize="80%">
            <ReactHlsPlayer
                src="http://121.145.133.119:8000/live/live/index.m3u8"
                autoPlay={false}
                controls={true}
                width="100%"
                height="auto"
            />
            </Pane>
            <Pane><Chat/></Pane>
            </SplitPane>
            )
    }
}

export default Live;