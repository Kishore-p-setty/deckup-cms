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
            loginSuccess: false
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
            if (!loginDetails.success) {
                this.setState({
                    loginError: true
                });
            }
            localStorage.setItem('loginToken', loginDetails.token);
            this.setState({
                loginError: false,
                loginSuccess: true
            });
            history.push('/home');
        }).catch(err => {
            console.log(err);
            this.setState({
                loginError: true
            });
        });
    }
    
    render() {
        return (
            <div>
                <div className="login-page">
                    <div className="login-form">
                        <div className="login-form">
                            <input value={this.state.email} onChange={this.updateEmailValue} type="text" placeholder="username"/>
                            <input value={this.state.password} onChange={this.updatePasswordValue} type="password" placeholder="password"/>
                            <button onClick={this.validateLogin.bind(this)}>login</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;