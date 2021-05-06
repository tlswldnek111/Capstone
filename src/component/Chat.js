import React from 'react';
import io from "socket.io-client";

const socket = io("http://localhost:3003");

socket.on("connect", () => { console.log("connection server"); });

class Chat extends React.Component {
  constructor(props) {
    super(props);
        this.state = {
            id: null
        };
        //this.handleSubmit = this.handleSubmit.bind(this);
  };
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Chat;