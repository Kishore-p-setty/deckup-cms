import React, { Component } from 'react';
import '.././App.css';
const { HOST } = require('../config/env');
const utils = require('../utils');

class Login extends Component {
    constructor(args) {
        super(args);
        this.state = {
            email: '',
            password: '',
            loginError: false,
            loginSuccess: false,
            loggingInUser: false
        }
        this.updateEmailValue = this.updateEmailValue.bind(this);
        this.updatePasswordValue = this.updatePasswordValue.bind(this);
    }
    
    componentDidMount() {
        const { history } = this.props;
        const { loginToken } = localStorage;
        if (loginToken) {
            history.push('/home');
        }
    };

    updateEmailValue(value) {
        this.setState({
            email: value.target.value
        });
    }

    updatePasswordValue(value) {
        this.setState({
            password: value.target.value
        });
    }

    async validateLogin() {
        this.setState({loggingInUser: true});
        const { history } = this.props;
        const login = await fetch(HOST.PRODUCTION + '/user/login', {
            headers: utils.getHeaders(),
            method: 'POST',
            body: JSON.stringify({
                userId: this.state.email,
                password: this.state.password
            })
        });
        login.json().then(loginDetails => {
            if (!loginDetails.success == false) {
                this.setState({
                    loginError: true
                });
            }
            if (loginDetails.token) {
                this.setState({loggingInUser: false});
                localStorage.setItem('loginToken', loginDetails.token);
                this.setState({
                    loginError: false,
                    loginSuccess: true
                });
                history.push('/home');
            } else {
                this.setState({loggingInUser: false});
                this.setState({
                    loginError: true,
                    loginSuccess: false
                });
            }
        }).catch(err => {
            console.log(err);
            this.setState({
                loginError: true
            });
        });
    }
    
    render() {
        return (
            <div className="login-background">
                <div className="login-page">
                    <div className="login-form">
                        <input value={this.state.email} onChange={this.updateEmailValue} type="text" placeholder="username"/>
                        <input value={this.state.password} onChange={this.updatePasswordValue} type="password" placeholder="password"/>
                        <button onClick={this.validateLogin.bind(this)}>login</button>
                        <div className="w3-center">{this.state.uploadingTipOfTheDay ? <i className="fa fa-circle-o-notch fa-spin" style={{"fontSize":"24px"}}></i> : null}</div>
                        {this.state.loginError ? (
                        <div className="w3-center">
                            <p className="w3-text-black">Username/Password is Incorrect</p>
                        </div>) : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;