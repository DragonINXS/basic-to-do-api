import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';


// two types of components: class or function
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      passwordInput: "",
      loginUser: "",
      loginPassword: "",
      loggedInUser: null,
    };
  }



  fetchUser = () => {
    axios.get('http://localhost:5000/api/login', { withCredentials: true })
      .then((theResponse) => {
      this.setState({})
    })
  }

  submitSignUp = (event, theUri) => {
    // stops automatic refresh - not good for a one page app
    event.preventDefault();

    console.log('submitSignUp-this.state :', this.state);

    submitForm = (event, theUri) => {
      event.preventDefault();
    
      let reqBody;
      if (theUri === "signup") {
        reqBody = { username: this.state.usernameInput, password: this.state.passwordInput }
        
      } else if (theUri === "login") {
        reqBody = {username: this}
      }
    }



    // axios.post(url, thereqbody, header)
    axios.post(
      'http://localhost:5000/api/signup'+theUri,

      { username: this.state.usernameInput, password: this.state.passwordInput },
      { withCredentials: true }
    )
      .then((response) => {
        console.log(response);

        this.setState({
          loggedInUser: response.data,
          usernameInput: "",
          passwordInput: "",
          loginUser: "",
          loginPassword: "",
        }, () => {console.log(this.state)})

      })
      .catch((error) => {
        console.log(error);
    })
  }

  updateInput = (theEvent) => {
    // es6-y way to do it
    // const: {name, value} = event.target
    const name = theEvent.target.name;
    const value = theEvent.target.value;

    this.setState({ [name]: value }, ()=>console.log('object :', this.state));

  }

  render() {
    return (
      // only one div allowed - other wise nest them
      <div className="App">
        <form onSubmit={e => this.submitSignUp(e, 'signup')}>
          <h2>Sign Up</h2>

          <label>Username</label>
          <input type="text" name="usernameInput" value={this.state.usernameInput} onChange={this.updateInput}/>
          
          <label>Password</label>
          <input type="text" name="passwordInput" value={this.state.passwordInput} onChange={this.updateInput}/>
          
          <button>Create Coolboy</button>
          
        </form>
        
        <form onSubmit={e => this.submitForm(e, 'login')}>
          <h2>Login</h2>

          <label>Username</label>
          <input type="text" name="loginUser" value={this.state.loginUser} onChange={this.updateInput}/>
          
          <label>Password</label>
          <input type="text" name="loginPassword" value={this.state.loginPassword} onChange={this.updateInput}/>
          
          <button>Create Coolboy</button>

        </form>

          <h3>
            Welcome, {this.state.loggedInUser && + 'Welcome, ' + this.state.loggedInUser.username}
          </h3>
      </div>
    );
  }
}

export default App;
