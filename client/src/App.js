import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          username:null
      };
  }

  componentDidMount() {
    fetch('http://localhost:3001/api')
        .then(res=>res.json())
        .then(data=>this.setState({username:data.username}));
  }

  render() {
    const {username} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          {username ? `Hello ${username}` : 'Hello World'}
          </p>
          <form action="http://localhost:3001/api/select" method="post">
            <p><input type="text" name="USERNAME"></input></p>
            <p><button type="submit">전송</button></p>
          </form>
        </header>
      </div>
    );
    ;
  }
}

export default App;