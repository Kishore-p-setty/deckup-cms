import React, { Component } from 'react';
import '.././App.css';
const { HOST } = require('../config/env');
const utils = require('../utils');

class Celebrities extends Component {
    constructor(args) {
        super(args);
        this.state = {
            celebrityName: '',
            showAddCelebritySection: false,
            
        }
        this.updateCelebrityNameValue = this.updateCelebrityNameValue.bind(this);
        this.addCelebrity = this.addCelebrity.bind(this);
    }

    componentWillMount() {
        this.getAllCelebrities();
    }

    updateCelebrityNameValue(event) {
        this.setState({celebrityName: event.target.value});
    }

    async addCelebrity() {
        const upload = await fetch(HOST.DEV + '/celebrity/addCelebrity', {
            method: 'POST',
            headers: utils.getHeaders(),
            body: JSON.stringify({name: this.state.celebrityName})
        });
        upload.json().then(response => {
            this.getAllCelebrities();
            this.setState({celebrityName: ''});
            alert(response.message);
        }).catch(err => {
            console.log(err);
        });
    }

    async removeCelebrity(celebrityId) {
        const remove = await fetch(HOST.DEV + '/celebrity/delete', {
            method: 'POST',
            headers: utils.getHeaders(),
            body: JSON.stringify({id: celebrityId})
        });
        remove.json().then(response => {
            if (response.success) {
                this.getAllCelebrities();
                alert(response.message);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    async getAllCelebrities() {
        this.setState({gettingCelebrities: true});
        const celebrities = await fetch(HOST.DEV + '/celebrity/allCelebrities', {
            method: 'GET'
        });
        celebrities.json().then(response => {
            this.setState({allCelebrities: response.data, gettingCelebrities: false});
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                (<div className="w3-main" style={{"marginLeft":"300px","marginTop":"43px", "height":"100%", "background":"#e2e2e2"}}>

                <header className="w3-container" style={{"paddingTop":"22px"}}>
                    <h5><b><i className="fa fa-dashboard"></i> DeckUp Celebrities</b></h5>
                </header>

                {(this.state.showAddCelebritySection) ? (
                    <div className="w3-bar">
                        <button onClick={() => {this.setState({showAddCelebritySection: false});}} className="w3-button w3-left w3-green w3-round"><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                    </div>
                ) : null}

                {!(this.state.showAddCelebritySection) ? (
                    <div className="w3-bar">
                        <button onClick={() => {this.setState({showAddCelebritySection: true});}} className="w3-button w3-right w3-green"><i className="fa fa-plus" aria-hidden="true"></i> Add Celebrity</button>
                    </div>
                ) : null}

                {!(this.state.showAddCelebritySection) ? (
                    <div style={{margin: '20px'}}>
                        <ul className="w3-ul w3-card">
                            {this.state.allCelebrities && this.state.allCelebrities.length ? (
                                <div>
                                    {this.state.allCelebrities.map(celebrity => {
                                        return (<li key={celebrity._id} className="w3-display-container w3-margin-top w3-white">{celebrity.name} <span onClick={this.removeCelebrity.bind(this, celebrity._id)} className="w3-button w3-transparent w3-display-right">&times;</span></li>)
                                    })}
                                </div>
                            ) : <div className="w3-center">No Celebrities Added</div>}
                        </ul>
                    </div>
                ) : null}

                {this.state.showAddCelebritySection ? (
                    <div className="diy-input">
                        <div>
                            <div>
                                <label htmlFor="celebrityName">Name</label>
                                <input type="text" value={this.state.celebrityName} onChange={this.updateCelebrityNameValue} id="celebrity" name="celebrityName" placeholder="Celebrity name"/>

                                <button className="submit" disabled={this.state.uploadingCelebrities} onClick={this.addCelebrity} type="submit">{!(this.state.uploadingCelebrities) ? 'Submit' : 'Adding'}</button>
                                <div className="w3-center">{this.state.uploadingCelebrities ? <i className="fa fa-circle-o-notch fa-spin" style={{"fontSize":"24px"}}></i> : null}</div>
                            </div>
                        </div>
                    </div>
                ) : null}

                </div>)
            </div>
        )
    }
}

export default Celebrities;
