import React, { Component } from 'react';
import axios from 'axios';
import Registration from './auth/Registration';
import Login from './auth/Login';
import { Button } from 'react-bootstrap';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/dashboard");
    }

    handleLogoutClick() {
        axios.delete("http://localhost:3001/logout", { withCredentials: true }).then(response => {
            this.props.handleLogout();
        }).catch( error => {
            console.log("logout error", error);
        });
    }
    
    getDate() {
        var date = { currentTime: new Date().toLocaleString() };
        this.setState({
          date: date
        });
      }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <Button onClick={() => this.handleLogoutClick()}>Logout</Button>
            </div>
        );
    }
}