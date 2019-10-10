import React, { Component } from 'react';
import '.././App.css';
const { HOST } = require('../config/env');
const utils = require('../utils');

class Diy extends Component {
    constructor(args) {
        super(args);
        this.state = {
            diyTitle: '',
            diyDescription: '',
            diyCategory: '',
            allDiys: [],
            showAddDiySection: false,
            gettingDiys: false,
            uploadingDiy: false,
            diyVideoUrl: ''
        }
        this.updateDiyDescriptionValue = this.updateDiyDescriptionValue.bind(this);
        this.updateDiyTextValue = this.updateDiyTextValue.bind(this);
        this.uploadDiy = this.uploadDiy.bind(this);
        this.getAllDiys = this.getAllDiys.bind(this);
    }

    componentWillMount() {
        this.getAllDiys();
    }

    async getAllDiys() {
        this.setState({gettingDiys: true});
        const diys = await fetch(`${HOST.DEV}/diy/allDiy`, {
            method: 'GET',
            headers: utils.getHeaders()
        });
        diys.json().then(response => {
            this.setState({allDiys: response.data, gettingDiys: false});
        }).catch(err => {
            console.log(err);
        });
    }

    updateDiyTextValue(event) {
        this.setState({diyTitle: event.target.value});
    }

    updateDiyDescriptionValue(event) {
        this.setState({diyDescription: event.target.value});
    }

    updateDiyVideoUrlValue(event) {
        this.setState({diyVideoUrl: event.target.value});
    }

    async uploadDiy() {
        this.setState({uploadingDiy: true});
        const upload = await fetch(`${HOST.DEV}/diy/upload`, {
            method: 'POST',
            body: this.state.formDataForDiy
        });
        upload.json().then(response => {
            if (response.success) {
                this.setState({uploadingDiy: false, diyTitle: '', diyDescription: ''});
                this.getAllDiys();
                document.getElementById('diyvideo').value = "";
                alert(response.message);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render () {
        return (
            <div>
                (<div className="w3-main" style={{"marginLeft":"300px","marginTop":"43px", "background":"#e2e2e2"}}>

                <header className="w3-container" style={{"paddingTop":"22px"}}>
                    <h5><b><i className="fa fa-dashboard"></i> DeckUp DIY</b></h5>
                </header>

                {(this.state.showAddDiySection) ? (
                    <div className="w3-bar">
                        <button onClick={() => {this.setState({showAddDiySection: false});}} className="w3-button w3-left w3-green w3-round"><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                    </div>
                ) : null}

                {!(this.state.showAddDiySection) ? (
                    <div className="w3-bar">
                        <button onClick={() => {this.setState({showAddDiySection: true});}} className="w3-button w3-right w3-green"><i className="fa fa-plus" aria-hidden="true"></i> Add Diy</button>
                    </div>
                ) : null}

                {(!this.state.showAddDiySection) ? (
                <div>
                    {this.state.allDiys && this.state.allDiys.length ? (
                        <div className="w3-row">
                            {this.state.allDiys.map(diy => {
                                return  (
                                    <div key={diy._id} className="w3-half w3-margin">
                                        <div className="w3-card">
                                            <header className="w3-container w3-blue">
                                                <h1>{diy.title}</h1>
                                            </header>

                                            <div className="w3-container">
                                                <video width="100%" height="60%" controls>
                                                <source src={diy.videoUrl} type="video/mp4"/>
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>

                                            <footer className="w3-container w3-blue">
                                                <h5>{diy.description}</h5>
                                            </footer>
                                        </div>
                                    </div>
                                )
                            })}  
                        </div>
                    ) : <div className="w3-center">No Diy Added</div>}
                </div>) : null}

                {this.state.showAddDiySection ? (
                    <div className="diy-input">
                        <div>
                            <div>
                                <label htmlFor="diytitle">Title</label>
                                <input type="text" value={this.state.diyTitle} onChange={this.updateDiyTextValue} id="diytitle" name="title" placeholder="Diy Title"/>
                                <label htmlFor="diydescription">Description</label>
                                <input type="text" value={this.state.diyDescription} onChange={this.updateDiyDescriptionValue} id="diydescription" name="description" placeholder="Diy Description"/>
                                <label htmlFor="diydescription">Description</label>
                                <input type="text" value={this.state.diyVideoUrl} onChange={this.updateDiyVideoUrlValue} id="diyVideoUrl" name="diyVideoUrl" placeholder="Diy Video Url"/>
                            
                                <button className="submit" disabled={this.state.uploadingDiy} onClick={this.uploadDiy} type="submit">{!(this.state.uploadingDiy) ? 'Submit' : 'Uploading'}</button>
                                <div className="w3-center">{this.state.uploadingDiy ? <i className="fa fa-circle-o-notch fa-spin" style={{"fontSize":"24px"}}></i> : null}</div>
                            </div>
                        </div>
                    </div>
                ) : null}
                </div>)
            </div>
        )
    }
}

export default Diy;