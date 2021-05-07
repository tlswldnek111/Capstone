import React from 'react';
import io from "socket.io-client";
import SplitPane from 'react-split-pane/lib/SplitPane';
import Pane from 'react-split-pane/lib/Pane'
import { Height } from '@material-ui/icons';

const socket = io("http://localhost:3003");

socket.on("connect", () => { console.log("connection server"); });

class ChatForm extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
            id: '',
            message: ''
        };
    this.send = this.send.bind(this);
  };
  send(e) {
    e.preventDefault();
    console.log('아이디 ' + e.target.id.value + '메세지 ' + e.target.message);
    socket.emit('chat-msg', {
      id: e.target.id.value,
      message: e.target.message.value
    });
    this.setState({message: ''});
  }
  render() {
    return(
      <div>
        <form onSubmit={this.send}>
          <input id="id"></input>
          <input id="message"></input>
          <button type="submit"> 보내기 </button>
        </form>
      </div>
    );
  };
}

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: []
    }
  }

  componentDidMount() {
    socket.on('chat-msg', (obj) => {
      const logs2 = this.state.logs;
      obj.key = 'key_' + (this.state.logs.length + 1);
      console.log(obj);
      logs2.push(obj);
      this.setState({logs: logs2});
    })
  }

  render() {
    const messages = this.state.logs.map(e => (
      <div key = {e.key}>
        <span>{e.id}: </span>
        <span>{e.message}</span>
      </div>
    ))
    return(
      <SplitPane split="horizontal">
        <Pane initialSize="90%">
          <div style={{overflowY:'scroll', height:'100%'}}>
            {messages}
          </div>
        </Pane>
        <Pane><ChatForm/></Pane>
      </SplitPane>
    )
  }
}

export default Chat;