import React, { Component } from 'react';
import '.././App.css';
import Diy from './Diy';
import Brands from './Brands';
import Categories from './Categories';
import Celebrities from './Celebrities';
import TipOfTheDay from './TipOfTheDay';
import DiyCategories from './DiyCategories';
import Settings from './Settings';
import Overview from './Overview';

const { HOST } = require('../config/env');
const utils = require('../utils');


class Home extends Component {
    constructor(args) {
        super(args);
        this.state = {
            activeTab: 'overview',
        };
    }

    componentWillMount() {
        const { history } = this.props;
        const { loginToken } = localStorage;
        if (!loginToken) {
            history.push('/');
            return;
        }
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
                
            {this.state.activeTab === 'overview' ? <Overview></Overview> : null}
        
            {this.state.activeTab === 'DIY' ? <Diy></Diy> : null}

            {this.state.activeTab === 'tipoftheday' ? <TipOfTheDay></TipOfTheDay> : null}

            {this.state.activeTab === 'brands' ? <Brands></Brands> : null}

            {this.state.activeTab === 'celebrities' ? <Celebrities></Celebrities> : null}

            {this.state.activeTab === 'categories' ? <Categories></Categories> : null}

            {this.state.activeTab === 'diy-categories' ? <DiyCategories></DiyCategories> : null}

            {this.state.activeTab === 'settings' ? <Settings></Settings> : null}

        </div>)
    }
}

export default Home;