import React, { Component } from 'react';
import '.././App.css';
const { HOST } = require('../config/env');
const utils = require('../utils');

class Settings extends Component {
    constructor(args) {
        super(args);
        this.state = {
        }
    }

    componentWillMount() {

    }

    render() {
        return (
            <div>
                (<div className="w3-main" style={{"marginLeft":"300px","marginTop":"43px", "background":"#e2e2e2"}}>

                <header className="w3-container" style={{"paddingTop":"22px"}}>
                    <h5><b><i className="fa fa-dashboard"></i> DeckUp Settings</b></h5>
                </header>
                
                </div>)
            </div>
        )
    }
}

export default Settings;