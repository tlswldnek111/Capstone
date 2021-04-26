import React from 'react';

class TestLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id:null,
            username:null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      event.preventDefault();
      fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: event.target.ID.value,
          PASSWORD: event.target.PASSWORD.value 
        })
      })
      .then(res=>res.json())
      .then(res=>{if (res.length === 0) {
                    this.setState({username: null})
                  } else{
                    this.setState({username: res[0].NAME})
                  }
                })
    }

    render() {
        return(
            <div>
                <p>
                {this.state.username ? `Hello ${this.state.username}` : 'SIGN IN'}
                </p>
                <form onSubmit={this.handleSubmit}>
                    <p><input type="text" name="ID"></input></p>
                    <p><input type="text" name="PASSWORD"></input></p>
                    <p><button type="submit">전송</button></p>
                </form>
            </div>
        );
    }
}

export default TestLogin;