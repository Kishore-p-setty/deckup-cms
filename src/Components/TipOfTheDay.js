import React, { Component } from 'react';
import '.././App.css';
const { HOST } = require('../config/env');
const utils = require('../utils');

class TipOfTheDay extends Component {
    constructor(args) {
        super(args);
        this.state = {
            tipofTheDayCelebrity: '',
            allTipOfTheDay: [],
            showAddTipOfTheDaySection: false,
            gettingTipOfTheDay: false,
            uploadingTipOfTheDay: false
        }
        this.uploadTipOfTheDay = this.uploadTipOfTheDay.bind(this);
        this.getAllTipOfTheDay = this.getAllTipOfTheDay.bind(this);
    }

    componentWillMount() {
        this.getAllTipOfTheDay();
    }

    async getAllTipOfTheDay() {
        this.setState({gettingTipOfTheDay: true});
        const tips = await fetch(HOST.DEV + '/tipoftheday/allTipOfTheDay', {
            method: 'GET',
            headers: utils.getHeaders()
        });
        tips.json().then(response => {
            this.setState({allTipOfTheDay: response.data, gettingTipOfTheDay: false});
        }).catch(err => {
            console.log(err);
        });
    }

    async uploadTipOfTheDay() {
        const upload = await fetch(HOST.DEV + '/tipoftheday/upload', {
            method: 'POST',
            body: this.state.formDataForTipOfTheDay
        });
        upload.json().then(response => {
            if (response.success) {
                this.setState({uploadingTipOfTheDay: false, totdTitle: '', totdDescription: ''});
                this.getAllTipOfTheDay();
                document.getElementById('totdvideo').value = "";
                alert(response.message);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                (<div className="w3-main" style={{"marginLeft":"300px","marginTop":"43px", "background":"#e2e2e2"}}>

                <header className="w3-container" style={{"paddingTop":"22px"}}>
                    <h5><b><i className="fa fa-dashboard"></i> DeckUp Tip of The Day</b></h5>
                </header>

                {(this.state.showAddTipOfTheDaySection) ? (
                    <div className="w3-bar">
                        <button onClick={() => {this.setState({showAddTipOfTheDaySection: false});}} className="w3-button w3-left w3-green w3-round"><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                    </div>
                ) : null}

                {!(this.state.showAddTipOfTheDaySection) ? (
                    <div className="w3-bar">
                        <button onClick={() => {this.setState({showAddTipOfTheDaySection: true});}} className="w3-button w3-right w3-green"><i className="fa fa-plus" aria-hidden="true"></i> Add Tip of the day</button>
                    </div>
                ) : null}

                {(!this.state.showAddTipOfTheDaySection) ? (
                <div>
                    {this.state.allTipOfTheDay && this.state.allTipOfTheDay.length ? (
                        <div className="w3-row">
                            {this.state.allTipOfTheDay.map(tip => {
                                return  (
                                    <div key={tip._id} className="w3-half">
                                        <div className="w3-card">
                                            <header className="w3-container w3-blue">
                                                <h1>{tip.title}</h1>
                                            </header>

                                            <div className="w3-container">
                                                <video width="100%" height="100%" controls>
                                                <source src={tip.videoUrl} type="video/mp4"/>
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>

                                            <footer className="w3-container w3-blue">
                                                <h5>{tip.description}</h5>
                                            </footer>
                                        </div>
                                    </div>
                                )
                            })}  
                        </div>
                    ) : <div className="w3-center">No Tip of the day Added</div>}
                </div>) : null}

                {this.state.showAddTipOfTheDaySection ? (
                    <div className="diy-input">
                        <div>
                            <div>
                                <label htmlFor="diytitle">Title</label>
                                <input type="text" value={this.state.totdTitle} onChange={this.updateDiyTextValue} id="diytitle" name="title" placeholder="Tip of the day Title"/>
                                <label htmlFor="diydescription">Description</label>
                                <input type="text" value={this.state.totdDescription} onChange={this.updateDiyDescriptionValue} id="diydescription" name="description" placeholder="Tip of the day Description"/>
                                <select class="w3-select w3-padding" name="option" onChange={this.associateCelebrity}>
                                    <option value="" disabled selected>Associate Celebrity</option>
                                    {this.state.allCelebrities && this.state.allCelebrities.length ? (
                                        this.state.allCelebrities.map(celebrity => {
                                            return <option key={celebrity._id} value={celebrity._id}>{celebrity.name}</option>
                                        })
                                    ) : null}
                                </select>
                                <label className="fileContainer">
                                    <input type="file" accept="video/mp4,video/x-m4v,video/*,image/*" onChange={this.getVideoFile} id="totdvideo"/>
                                </label>
                    
                                <button className="submit" disabled={this.state.uploadingTipOfTheDay} onClick={this.uploadTipOfTheDay} type="submit">{!(this.state.uploadingTipOfTheDay) ? 'Submit' : 'Uploading'}</button>
                                <div className="w3-center">{this.state.uploadingTipOfTheDay ? <i className="fa fa-circle-o-notch fa-spin" style={{"fontSize":"24px"}}></i> : null}</div>
                            </div>
                        </div>
                    </div>
                ) : null}
                </div>)
            </div>
        )
    }
}

export default TipOfTheDay;