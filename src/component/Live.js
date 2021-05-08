import React from 'react';
import ReactHlsPlayer from 'react-hls-player';
import Chat from './Chat';
import SplitPane from 'react-split-pane/lib/SplitPane';
import Pane from 'react-split-pane/lib/Pane'

class Live extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                height: 0
            };
        this.videoHeight = React.createRef();
        window.onresize = (e) => {
            this.setState({height: this.videoHeight.current.clientHeight});
        }
    };

    componentDidMount() {
        this.setState({height: this.videoHeight.current.clientHeight});
    }

    render(){
        return(
            <SplitPane split="vertical">
                <Pane initialSize="80%">
                    <div ref={this.videoHeight}>
                        <ReactHlsPlayer
                        src="http://121.145.133.119:8000/live/live/index.m3u8"
                        autoPlay={false}
                        controls={true}
                        width="100%"
                        height="auto"
                        />
                    </div>
                </Pane>
                <Pane>
                    <Chat height={this.state.height}/>
                </Pane>
            </SplitPane>
            )
    }
}

export default Live;