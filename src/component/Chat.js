import React from 'react';
import io from "socket.io-client";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import '../CSS/Chat.css';

var socket = null;

class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: false,
      message: '',
      logs: [],
    }
    this.send = this.send.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    socket = io("http://localhost:3003");
    socket.on("connect", () => { console.log("connection server"); });
    socket.on('chat-msg', (obj) => {
      const logs2 = this.state.logs;
      obj.key = 'key_' + (this.state.logs.length + 1);
      console.log(obj);
      logs2.push(obj);
      this.setState({logs: logs2});
    })
  }

  send(e) {
    e.preventDefault();
    console.log('아이디 ' + localStorage.getItem('id') + '메세지 ' + e.target.message);
    socket.emit('chat-msg', {
      id: localStorage.getItem('id'),
      message: e.target.message.value
    });
    this.setState({message: ''});
    let message = document.getElementById('message');
    message.value = '';
  }

  componentDidMount() {
    if (localStorage.getItem('id') !== null) {
      this.setState({login: true});
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.scrollToBottom();
  };

  scrollToBottom =() =>{
    const objDiv = document.getElementById('MessageBox');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    const messages = this.state.logs.map(e => (
      <div key = {e.key}>
        <span>{e.id}: </span>
        <span>{e.message}</span>
      </div>
    ));
    return(
      <table className="table">
        <tr className="tr">
          <td>
            <div
            id="MessageBox" className="div">
              {messages}
            </div>
          </td>
        </tr>
        <tr className="tr">
          <td>
            <form onSubmit={this.send}>
              <TextField
              id="message"
              fullWidth="true"
              variant="outlined"
              disabled={!this.state.login}
              value={!this.state.login ? '로그인이 필요합니다' : ''}
              >
              </TextField>
              <Button
              id="send"
              fullWidth="true"
              type="submit"
              color="primary"
              variant="contained"
              disabled={!(this.state.login)}> 
                보내기 
              </Button>
            </form>
          </td>
        </tr>
      </table>
    );
  }
}

export default Chat;