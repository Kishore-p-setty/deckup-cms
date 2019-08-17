import React, { Component } from 'react';
import '.././App.css';
const { HOST } = require('../config/env');
const utils = require('../utils');

class Home extends Component {
    constructor(args) {
        super(args);
        this.state = {
            activeTab: 'overview',
            diyTitle: '',
            diyDescription: '',
            diyVideoBase64Data: '',
            diyVideoMimeType: '',
            formDataForDiy: null,
            formDataForTipOfTheDay: null,
            celebrityName: '',
            brandName: '',
            tipofTheDayCelebrity: '',
            allBrands: [],
            allCelebrities: [],
            allCategories: [],
            allDiys: [],
            allTipOfTheDay: [],
            showAddDiySection: false,
            showAddBrandSection: false,
            showAddCelebritySection: false,
            showAddCategorySection: false,
            showAddTipOfTheDaySection: false,
            gettingDiys: false,
            gettingTipOfTheDay: false,
            gettingBrands: false,
            gettingCelebrities: false,
            gettingCategories: false,
            uploadingDiy: false,
            uploadingTipOfTheDay: false,
            uploadingBrand: false,
            uploadingCategories: false,
            uploadingCelebrities: false,
            totdTitle: '',
            totdDescription: ''
        };
        this.updateDiyDescriptionValue = this.updateDiyDescriptionValue.bind(this);
        this.updateDiyTextValue = this.updateDiyTextValue.bind(this);
        this.getVideoFile = this.getVideoFile.bind(this);
        this.uploadDiy = this.uploadDiy.bind(this);
        this.updateCategoryNameValue = this.updateCategoryNameValue.bind(this);
        this.updateCelebrityNameValue = this.updateCelebrityNameValue.bind(this);
        this.updateBrandyNameValue = this.updateBrandyNameValue.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.addCelebrity = this.addCelebrity.bind(this);
        this.addBrand = this.addBrand.bind(this);
        this.getTitlePlaceholder = this.getTitlePlaceholder.bind(this);
        this.getDescriptionPlaceholder = this.getDescriptionPlaceholder.bind(this);
        this.associateCelebrity = this.associateCelebrity.bind(this);
        this.getAllBrands = this.getAllBrands.bind(this);
        this.getAllCategories = this.getAllCategories.bind(this);
        this.getAllCelebrities = this.getAllCelebrities.bind(this);
        this.getAllDiys = this.getAllDiys.bind(this);
        this.uploadTipOfTheDay = this.uploadTipOfTheDay.bind(this);
        this.getAllTipOfTheDay = this.getAllTipOfTheDay.bind(this);
    }

    componentWillMount() {
        const { history } = this.props;
        const { loginToken } = localStorage;
        if (!loginToken) {
            history.pop();
        }
        this.getAllBrands();
        this.getAllCategories();
        this.getAllCelebrities();
        this.getAllDiys();
        this.getAllTipOfTheDay();
    }

    async getAllBrands() {
        this.setState({gettingBrands: true});
        const brands = await fetch(HOST.DEV + '/brand/allBrands', {
            method: 'GET'
        });
        brands.json().then(response => {
            this.setState({allBrands: response.data, gettingBrands: false});
        }).catch(err => {
            console.log(err);
        });
    }

    async getAllCategories() {
        this.setState({gettingCategories: true});
        const categories = await fetch(HOST.DEV + '/category/allCategories', {
            method: 'GET'
        });
        categories.json().then(response => {
            this.setState({allCategories: response.data, gettingCategories: false});
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

    async getAllDiys() {
        this.setState({gettingDiys: true});
        const diys = await fetch(HOST.DEV + '/diy/allDiy', {
            method: 'GET'
        });
        diys.json().then(response => {
            this.setState({allDiys: response.data, gettingDiys: false});
        }).catch(err => {
            console.log(err);
        });
    }
    
    async getAllTipOfTheDay() {
        this.setState({gettingTipOfTheDay: true});
        const tips = await fetch(HOST.DEV + '/tipoftheday/allTipOfTheDay', {
            method: 'GET'
        });
        tips.json().then(response => {
            this.setState({allTipOfTheDay: response.data, gettingTipOfTheDay: false});
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const activeTab = this.state.activeTab;
        return (
            <div>
                <div className="w3-bar w3-top w3-black w3-large" style={{'zIndex':4}}>
                    <button className="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey"><i className="fa fa-bars"></i>  Menu</button>
                    <span className="w3-bar-item w3-right">Logo</span>
                </div>

                <nav className="w3-sidebar w3-collapse w3-white w3-animate-left" style={{"zIndex":3, width:"300px"}} id="mySidebar"><br></br>
                    <div className="w3-container w3-row">
                        <div className="w3-col s4">
                        <img src="https://www.w3schools.com/w3images/avatar2.png" className="w3-circle w3-margin-right" style={{width:"46px"}}/>
                        </div>
                        <div className="w3-col s8 w3-bar">
                        <span>Welcome, <strong>ADMIN</strong></span><br></br>
                        <a href="#" className="w3-bar-item w3-button"><i className="fa fa-envelope"></i></a>
                        <a href="#" className="w3-bar-item w3-button"><i className="fa fa-user"></i></a>
                        <a href="#" className="w3-bar-item w3-button"><i className="fa fa-cog"></i></a>
                        </div>
                    </div>
                
                <div className="w3-container">
                    <h5>Dashboard</h5>
                </div>
                    <div className="w3-bar-block">
                        <div onClick={() => this.setState({activeTab: 'overview'})} className={"w3-bar-item w3-button w3-padding" + (activeTab === 'overview' ? ' w3-blue' : '')}><i className="fa fa-users fa-fw"></i>  Overview</div>
                        <div onClick={() => this.setState({activeTab: 'DIY'})} className={"w3-bar-item w3-button w3-padding"  + (activeTab === 'DIY' ? ' w3-blue' : '')}><i className="fa fa-eye fa-fw"></i>  DIY</div>
                        <div onClick={() => this.setState({activeTab: 'brands'})} className={"w3-bar-item w3-button w3-padding" + (activeTab === 'brands' ? ' w3-blue' : '')}><i className="fa fa-users fa-fw"></i>  Brands</div>
                        <div onClick={() => this.setState({activeTab: 'celebrities'})} className={"w3-bar-item w3-button w3-padding" + (activeTab === 'celebrities' ? ' w3-blue' : '')}><i className="fa fa-bullseye fa-fw"></i>  Celebrities</div>
                        <div onClick={() => this.setState({activeTab: 'tipoftheday'})} className={"w3-bar-item w3-button w3-padding" + (activeTab === 'tipoftheday' ? ' w3-blue' : '')}><i className="fa fa-diamond fa-fw"></i>  Tip of The Day</div>
                        <div onClick={() => this.setState({activeTab: 'categories'})} className={"w3-bar-item w3-button w3-padding" + (activeTab === 'categories' ? ' w3-blue' : '')}><i className="fa fa-diamond fa-fw"></i>  Categories</div>
                        <div onClick={() => this.setState({activeTab: 'settings'})} className={"w3-bar-item w3-button w3-padding" + (activeTab === 'settings' ? ' w3-blue' : '')}><i className="fa fa-cog fa-fw"></i>  Settings</div><br></br>
                    </div>
                </nav>

                <div className="w3-overlay w3-hide-large w3-animate-opacity" style={{"cursor":"pointer"}} title="close side menu" id="myOverlay"></div>
                
                {this.state.activeTab === 'overview' ?
                (<div className="w3-main" style={{"marginLeft":"300px","marginTop":"43px", "background":"#e2e2e2"}}>

                <header className="w3-container" style={{"paddingTop":"22px"}}>
                    <h5><b><i className="fa fa-dashboard"></i> DeckUp Dashboard</b></h5>
                </header>

                <div className="w3-row-padding w3-margin-bottom">
                <div className="w3-quarter">
                <div className="w3-container w3-red w3-padding-16">
                    <div className="w3-left"><i className="fa fa-comment w3-xxxlarge"></i></div>
                    <div className="w3-right">
                    <h3>52</h3>
                    </div>
                    <div className="w3-clear"></div>
                    <h4>Messages</h4>
                </div>
                </div>
                <div className="w3-quarter">
                <div className="w3-container w3-blue w3-padding-16">
                    <div className="w3-left"><i className="fa fa-eye w3-xxxlarge"></i></div>
                    <div className="w3-right">
                    <h3>99</h3>
                    </div>
                    <div className="w3-clear"></div>
                    <h4>Views</h4>
                </div>
                </div>
                <div className="w3-quarter">
                <div className="w3-container w3-teal w3-padding-16">
                    <div className="w3-left"><i className="fa fa-share-alt w3-xxxlarge"></i></div>
                    <div className="w3-right">
                    <h3>23</h3>
                    </div>
                    <div className="w3-clear"></div>
                    <h4>Shares</h4>
                </div>
                </div>
                <div className="w3-quarter">
                <div className="w3-container w3-orange w3-text-white w3-padding-16">
                    <div className="w3-left"><i className="fa fa-users w3-xxxlarge"></i></div>
                    <div className="w3-right">
                    <h3>50</h3>
                    </div>
                    <div className="w3-clear"></div>
                    <h4>Users</h4>
                </div>
                </div>
            </div>

            <div className="w3-panel">
                <div className="w3-row-padding" style={{"margin":"0 -16px"}}>
                <div className="w3-third">
                    <h5>Regions</h5>
                    <img src="https://www.w3schools.com/w3images/region.jpg" style={{"width":"100%"}} alt="Google Regional Map"/>
                </div>
                <div className="w3-twothird">
                    <h5>Feeds</h5>
                    <table className="w3-table w3-striped w3-white">
                        <tbody>
                        <tr>
                        <td><i className="fa fa-user w3-text-blue w3-large"></i></td>
                        <td>New record, over 90 views.</td>
                        <td><i>10 mins</i></td>
                    </tr>
                    <tr>
                        <td><i className="fa fa-bell w3-text-red w3-large"></i></td>
                        <td>Database error.</td>
                        <td><i>15 mins</i></td>
                    </tr>
                    <tr>
                        <td><i className="fa fa-users w3-text-yellow w3-large"></i></td>
                        <td>New record, over 40 users.</td>
                        <td><i>17 mins</i></td>
                    </tr>
                    <tr>
                        <td><i className="fa fa-comment w3-text-red w3-large"></i></td>
                        <td>New comments.</td>
                        <td><i>25 mins</i></td>
                    </tr>
                    <tr>
                        <td><i className="fa fa-bookmark w3-text-blue w3-large"></i></td>
                        <td>Check transactions.</td>
                        <td><i>28 mins</i></td>
                    </tr>
                    <tr>
                        <td><i className="fa fa-laptop w3-text-red w3-large"></i></td>
                        <td>CPU overload.</td>
                        <td><i>35 mins</i></td>
                    </tr>
                    <tr>
                        <td><i className="fa fa-share-alt w3-text-green w3-large"></i></td>
                        <td>New shares.</td>
                        <td><i>39 mins</i></td>
                    </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            
            <div className="w3-container">
                <h5>General Stats</h5>
                <p>New Visitors</p>
                <div className="w3-grey">
                <div className="w3-container w3-center w3-padding w3-green" style={{"width":"25%"}}>+25%</div>
                </div>

                <p>New Users</p>
                <div className="w3-grey">
                <div className="w3-container w3-center w3-padding w3-orange" style={{"width":"50%"}}>50%</div>
                </div>

                <p>Bounce Rate</p>
                <div className="w3-grey">
                <div className="w3-container w3-center w3-padding w3-red" style={{"width":"75%"}}>75%</div>
                </div>
            </div>

            <div className="w3-container">
                <h5>Countries</h5>
                <table className="w3-table w3-striped w3-bordered w3-border w3-hoverable w3-white">
                    <tbody>
                        <tr>
                        <td>United States</td>
                        <td>65%</td>
                        </tr>
                        <tr>
                            <td>UK</td>
                            <td>15.7%</td>
                        </tr>
                        <tr>
                            <td>Russia</td>
                            <td>5.6%</td>
                        </tr>
                        <tr>
                            <td>Spain</td>
                            <td>2.1%</td>
                        </tr>
                        <tr>
                            <td>India</td>
                            <td>1.9%</td>
                        </tr>
                        <tr>
                            <td>France</td>
                            <td>1.5%</td>
                        </tr>
                    </tbody>
                </table><br></br>
                <button className="w3-button w3-dark-grey">More Countries  <i className="fa fa-arrow-right"></i></button>
            </div>
            
            <div className="w3-container">
                <h5>Recent Users</h5>
                <ul className="w3-ul w3-card-4 w3-white">
                    <li className="w3-padding-16">
                        <img src="https://www.w3schools.com/w3images/avatar2.png" className="w3-left w3-circle w3-margin-right" style={{"width":"35px"}}/>
                        <span className="w3-xlarge">Mike</span><br></br>
                    </li>
                    <li className="w3-padding-16">
                        <img src="https://www.w3schools.com/w3images/avatar5.png" className="w3-left w3-circle w3-margin-right" style={{"width":"35px"}}/>
                        <span className="w3-xlarge">Jill</span><br></br>
                    </li>
                    <li className="w3-padding-16">
                        <img src="https://www.w3schools.com/w3images/avatar6.png" className="w3-left w3-circle w3-margin-right" style={{"width":"35px"}}/>
                        <span className="w3-xlarge">Jane</span><br></br>
                    </li>
                </ul>
            </div>

            <div className="w3-container">
                <h5>Recent Comments</h5>
                <div className="w3-row">
                <div className="w3-col m2 text-center">
                    <img className="w3-circle" src="https://www.w3schools.com/w3images/avatar3.png" style={{"width":"96px", height:"96px"}}/>
                </div>
                <div className="w3-col m10 w3-container">
                    <h4>John <span className="w3-opacity w3-medium">Sep 29, 2014, 9:12 PM</span></h4>
                    <p>Keep up the GREAT work! I am cheering for you!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><br></br>
                </div>
                </div>

                <div className="w3-row">
                <div className="w3-col m2 text-center">
                    <img className="w3-circle" src="https://www.w3schools.com/w3images/avatar1.png" style={{"width":"96px", height:"96px"}}/>
                </div>
                <div className="w3-col m10 w3-container">
                    <h4>Bo <span className="w3-opacity w3-medium">Sep 28, 2014, 10:15 PM</span></h4>
                    <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><br></br>
                </div>
                </div>
            </div>
            <br></br>
            <div className="w3-container w3-dark-grey w3-padding-32">
                <div className="w3-row">
                <div className="w3-container w3-third">
                    <h5 className="w3-bottombar w3-border-green">Demographic</h5>
                    <p>Language</p>
                    <p>Country</p>
                    <p>City</p>
                </div>
                <div className="w3-container w3-third">
                    <h5 className="w3-bottombar w3-border-red">System</h5>
                    <p>Browser</p>
                    <p>OS</p>
                    <p>More</p>
                </div>
                <div className="w3-container w3-third">
                    <h5 className="w3-bottombar w3-border-orange">Target</h5>
                    <p>Users</p>
                    <p>Active</p>
                    <p>Geo</p>
                    <p>Interests</p>
                </div>
                </div>
            </div>

            <footer className="w3-container w3-padding-16 w3-light-grey">
                <h4>FOOTER</h4>
                <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
            </footer>
            </div>) : null }
        
            {this.state.activeTab === 'DIY' ?
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
                                <label className="fileContainer">
                                    <input type="file" accept="video/mp4,video/x-m4v,video/*,image/*" onChange={this.getVideoFile} id="diyvideo"/>
                                </label>
                            
                                <button className="submit" disabled={this.state.uploadingDiy} onClick={this.uploadDiy} type="submit">{!(this.state.uploadingDiy) ? 'Submit' : 'Uploading'}</button>
                                <div className="w3-center">{this.state.uploadingDiy ? <i className="fa fa-circle-o-notch fa-spin" style={{"fontSize":"24px"}}></i> : null}</div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>)
            : null}

            {this.state.activeTab === 'tipoftheday' ?
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
            : null}

            {this.state.activeTab === 'brands' ?
            (<div className="w3-main" style={{"marginLeft":"300px","marginTop":"43px", "height":"100%" , "background":"#e2e2e2"}}>

                <header className="w3-container" style={{"paddingTop":"22px"}}>
                    <h5><b><i className="fa fa-dashboard"></i> DeckUp Brands</b></h5>
                </header>

                {(this.state.showAddBrandSection) ? (
                    <div className="w3-bar">
                        <button onClick={() => {this.setState({showAddBrandSection: false});}} className="w3-button w3-left w3-green w3-round"><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                    </div>
                ) : null}

                {!(this.state.showAddBrandSection) ? (
                    <div className="w3-bar">
                        <button onClick={() => {this.setState({showAddBrandSection: true});}} className="w3-button w3-right w3-green"><i className="fa fa-plus" aria-hidden="true"></i> Add Brand</button>
                    </div>
                ) : null}

                {!(this.state.showAddBrandSection) ? (
                    <div style={{margin: '20px'}}>
                        <ul className="w3-ul w3-card">
                            {this.state.allBrands && this.state.allBrands.length ? (
                                <div>
                                    {this.state.allBrands.map(brand => {
                                        return (<li key={brand._id} className="w3-display-container w3-margin-top w3-white">{brand.name} <span onClick={this.removeBrand.bind(this, brand._id)} className="w3-button w3-transparent w3-display-right">&times;</span></li>)
                                    })}
                                </div>
                            ) : <div className="w3-center">No Brands Added</div>}
                        </ul>
                    </div>
                ) : null}

                {this.state.showAddBrandSection ? (
                    <div className="diy-input">
                        <div>
                            <div>
                            <label htmlFor="brandName">Name</label>
                                <input type="text" value={this.state.brandName} onChange={this.updateBrandyNameValue} id="brand" name="brandName" placeholder="Brand name"/>

                                <button className="submit" disabled={this.state.uploadingBrand} onClick={this.addBrand} type="submit">{!(this.state.uploadingBrand) ? 'Submit' : 'Adding'}</button>
                                <div className="w3-center">{this.state.uploadingBrand ? <i className="fa fa-circle-o-notch fa-spin" style={{"fontSize":"24px"}}></i> : null}</div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>) : null}

            {this.state.activeTab === 'celebrities' ?
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

            </div>) : null}

            {this.state.activeTab === 'categories' ?
            (<div className="w3-main" style={{"marginLeft":"300px","marginTop":"43px", "height":"100%", "background":"#e2e2e2"}}>

                <header className="w3-container" style={{"paddingTop":"22px"}}>
                    <h5><b><i className="fa fa-dashboard"></i> DeckUp Categories</b></h5>
                </header>

                {(this.state.showAddCategorySection) ? (
                    <div className="w3-bar">
                        <button onClick={() => {this.setState({showAddCategorySection: false});}} className="w3-button w3-left w3-green w3-round"><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                    </div>
                ) : null}

                {!(this.state.showAddCategorySection) ? (
                    <div className="w3-bar">
                        <button onClick={() => {this.setState({showAddCategorySection: true});}} className="w3-button w3-right w3-green"><i className="fa fa-plus" aria-hidden="true"></i> Add Category</button>
                    </div>
                ) : null}

                {!(this.state.showAddCategorySection) ? (
                    <div style={{margin: '20px'}}>
                        <ul className="w3-ul w3-card">
                            {this.state.allCategories && this.state.allCategories.length ? (
                                <div>
                                    {this.state.allCategories.map(category => {
                                        return (<li key={category._id} className="w3-display-container w3-margin-top w3-white">{category.name} <span onClick={this.removeCategory.bind(this, category._id)} className="w3-button w3-transparent w3-display-right">&times;</span></li>)
                                    })}
                                </div>
                            ) : <div className="w3-center">No Categories Added</div>}
                        </ul>
                    </div>
                ) : null}

                {this.state.showAddCategorySection ? (
                    <div className="diy-input">
                        <div>
                            <div>
                            <label htmlFor="categoryName">Name</label>
                                <input type="text" value={this.state.categoryName} onChange={this.updateCategoryNameValue} id="category" name="categoryName" placeholder="Category name"/>

                                <button className="submit" disabled={this.state.uploadingCategories} onClick={this.addCategory} type="submit">{!(this.state.uploadingCategories) ? 'Submit' : 'Adding'}</button>
                                <div className="w3-center">{this.state.uploadingCategories ? <i className="fa fa-circle-o-notch fa-spin" style={{"fontSize":"24px"}}></i> : null}</div>
                            </div>
                        </div>
                    </div>
                ) : null}

            </div>)
            : null}

            {this.state.activeTab === 'settings' ?
            (<div className="w3-main" style={{"marginLeft":"300px","marginTop":"43px", "background":"#e2e2e2"}}>

                <header className="w3-container" style={{"paddingTop":"22px"}}>
                    <h5><b><i className="fa fa-dashboard"></i> DeckUp Settings</b></h5>
                </header>

                <footer className="w3-container w3-padding-16 w3-light-grey">
                    <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
                </footer>

            </div>)
            : null}

        </div>)
    }

    updateDiyTextValue(event) {
        this.setState({diyTitle: event.target.value});
        console.log(this.state);
    }

    updateDiyDescriptionValue(event) {
        this.setState({diyDescription: event.target.value});
    }

    getVideoFile() {
        const file = document.getElementById('diyvideo').files[0];
        const formDataForDiy = new FormData();
        formDataForDiy.append('file', file);
        formDataForDiy.append('title', this.state.diyTitle);
        formDataForDiy.append('description', this.state.diyDescription);
        this.setState({formDataForDiy: formDataForDiy});
    }

    getTipOfTheDayVideoFile() {
        const file = document.getElementById('totdvideo').files[0];
        const formDataForTipOfTheDay = new FormData();
        formDataForTipOfTheDay.append('file', file);
        formDataForTipOfTheDay.append('title', this.state.totdTitle);
        formDataForTipOfTheDay.append('description', this.state.totdDescription);
        formDataForTipOfTheDay.append('celebrity', this.state.tipofTheDayCelebrity);
        this.setState({formDataForTipOfTheDay: formDataForTipOfTheDay});
    }

    async uploadDiy() {
        this.setState({uploadingDiy: true});
        const upload = await fetch(HOST.DEV + '/diy/upload', {
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

    updateCategoryNameValue(event) {
        this.setState({categoryName: event.target.value});
    }

    updateCelebrityNameValue(event) {
        this.setState({celebrityName: event.target.value});
    }

    updateBrandyNameValue(event) {
        this.setState({brandName: event.target.value});
    }

    async addCategory() {
        const upload = await fetch(HOST.DEV + '/category/addCategory', {
            method: 'POST',
            headers: utils.getHeaders(),
            body: JSON.stringify({name: this.state.categoryName})
        });
        upload.json().then(response => {
            this.setState({categoryName: ''});
            this.getAllCategories();
            alert(response.message);
        }).catch(err => {
            console.log(err);
        });
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

    async addBrand() {
        const upload = await fetch(HOST.DEV + '/brand/addBrand', {
            method: 'POST',
            headers: utils.getHeaders(),
            body: JSON.stringify({name: this.state.brandName})
        });
        upload.json().then(response => {
            this.getAllBrands();
            this.setState({brandName: ''});
            alert(response.message);
        }).catch(err => {
            console.log(err);
        });
    }

    async removeBrand(brandId) {
        const remove = await fetch(HOST.DEV + '/brand/delete', {
            method: 'POST',
            headers: utils.getHeaders(),
            body: JSON.stringify({id: brandId})
        });
        remove.json().then(response => {
            if (response.success) {
                this.getAllBrands();
                alert(response.message);
            }
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

    async removeCategory(categoryId) {
        const remove = await fetch(HOST.DEV + '/category/delete', {
            method: 'POST',
            headers: utils.getHeaders(),
            body: JSON.stringify({id: categoryId})
        });
        remove.json().then(response => {
            if (response.success) {
                this.getAllCategories();
                alert(response.message);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    getTitlePlaceholder() {
        const input = document.getElementById('diytitle');
        if (this.state.activeTab === 'DIY') {
            input.placeholder = "DIY Title";
        }
        else if (this.state.activeTab === 'tipoftheday') {
            input.placeholder = "Tip of The Day Title"; 
        }
    }

    getDescriptionPlaceholder() {
        const input = document.getElementById('diydescription');
        if (this.state.activeTab === 'DIY') {
            input.placeholder = "DIY Description";
        }
        else if (this.state.activeTab === 'tipoftheday') {
            input.placeholder = "Tip of The Day Description";    
        }
    }

    associateCelebrity(event) {
        this.setState({tipofTheDayCelebrity: event.target.value});
    }
}

export default Home;