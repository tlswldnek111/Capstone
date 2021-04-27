import React from 'react';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            success: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      event.preventDefault();
      fetch('http://localhost:3001/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ID: event.target.ID.value,
          NAME: event.target.NAME.value,
          PASSWORD: event.target.PASSWORD.value 
        })
      })
      .then(res=>res.json())
      .then(res=>{if (res.success == 0) {
                    this.setState({success: null})
                  } else{
                    this.setState({success: res.success})
                  }
                })
    }

    render() {
        return(
            <div>
                <p>
                {this.state.success ? `Success` : 'SIGN UP'}
                </p>
                <form onSubmit={this.handleSubmit}>
                    <p><input type="text" name="ID"></input></p>
                    <p><input type="text" name="NAME"></input></p>
                    <p><input type="text" name="PASSWORD"></input></p>
                    <p><button type="submit">회원가입</button></p>
                </form>
            </div>
        );
    }
}

export default Register;