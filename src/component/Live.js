import React from 'react';
import ReactHlsPlayer from 'react-hls-player';
import Chat from './Chat';
import SplitPane from 'react-split-pane/lib/SplitPane';
import Pane from 'react-split-pane/lib/Pane'
import Header2 from './Header2';
class Live extends React.Component {
    constructor(props) {
        super(props);
            this.state = {
                height: 0
            };
        this.videoHeight = React.createRef();
        window.onresize = (e) => {
            this.setState({
                height: (this.videoHeight.current ? this.videoHeight.current.clientHeight : null),
            });
        }
    };

    componentDidMount() {
        this.setState({
            height: this.videoHeight.current.clientHeight
        });
    }

    render(){
        return(<div>
            <SplitPane split="horizontal">
                <Pane initialSize="63px">
                    <Header2/>
                </Pane>
                <Pane>
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
                </Pane>
            </SplitPane>
            </div>
            )
    }
}

export default Live;