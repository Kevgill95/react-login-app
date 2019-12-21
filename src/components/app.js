import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import Dashboard from './Dashboard';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "Please log in",
      user: {},
      email: "",
      lastLogin: "",
      loginCount: "",
      date: ""
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  checkLoginStatus() {
    axios.get("http://localhost:3001/logged_in", { withCredentials: true })
    .then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "Please log in") {
        this.setState({
          loggedInStatus: "Successfully logged in",
          user: response.data.user
        })
      } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN" ) {
        this.setState({
          loggedInStatus: "Please log in",
          user: {}
        })
      }
    })
    .catch(error => {
      console.log("check login error", error);
    })
 }

 componentDidMount() {
   this.checkLoginStatus();
 }

 handleLogout() {
   this.setState({
     loggedInStatus: "Please log in",
     user: {}
   })
 }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "Successfully logged in",
      user: data.user
    });
  }

  render() {
    return (
      <div className='app'>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} render={props => (
            <Home { ... props} handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} />
          )} />
          <Route exact path={"/dashboard"} render={props => (
            <Dashboard { ... props} loggedInStatus={this.state.loggedInStatus} user={this.state.user} />
          )} />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}
