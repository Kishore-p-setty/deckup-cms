import React, { Component } from 'react';
import '.././App.css';
const { HOST } = require('../config/env');
const utils = require('../utils');

class DiyCategories extends Component {
    constructor(args) {
        super(args);
        this.state = {
            diyCategoryName: '',
            allDiyCategories: [],
            showAddDiyCategorySection: false,
            gettingDiyCategories: false,
            uploadingDiyCategories: false
        }
        this.updateDiyCategoryNameValue = this.updateDiyCategoryNameValue.bind(this);
        this.addDiyCategory = this.addDiyCategory.bind(this);
        this.getAllDiyCategories = this.getAllDiyCategories.bind(this);
    }

    componentWillMount() {
        this.getAllDiyCategories();
    }

    updateDiyCategoryNameValue(event) {
        this.setState({diyCategoryName: event.target.value});
    }

    async addDiyCategory() {
        const upload = await fetch(`${HOST.DEV}/category/addDiyCategory`, {
            method: 'POST',
            headers: utils.getHeaders(),
            body: JSON.stringify({name: this.state.diyCategoryName})
        });
        upload.json().then(response => {
            this.setState({diyCategoryName: ''});
            this.getAllCategories();
            alert(response.message);
        }).catch(err => {
            console.log(err);
        });
    }

    async getAllDiyCategories() {
        this.setState({gettingCategories: true});
        const categories = await fetch(`${HOST.DEV}/diy-category/allDiyCategories`, {
            method: 'GET',
            headers: utils.getHeaders()
        });
        categories.json().then(response => {
            this.setState({allCategories: response.data, gettingCategories: false});
        }).catch(err => {
            console.log(err);
        });
    }

    async removeDiyCategory(diyCategoryId) {
        const remove = await fetch(HOST.DEV + '/diy-category/delete', {
            method: 'POST',
            headers: utils.getHeaders(),
            body: JSON.stringify({id: diyCategoryId})
        });
        remove.json().then(response => {
            if (response.success) {
                this.getAllDiyCategories();
                alert(response.message);
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                (<div className="w3-main" style={{"marginLeft":"300px","marginTop":"43px", "height":"100%", "background":"#e2e2e2"}}>

                <header className="w3-container" style={{"paddingTop":"22px"}}>
                    <h5><b><i className="fa fa-dashboard"></i> DeckUp Diy Categories</b></h5>
                </header>

                {(this.state.showAddDiyCategorySection) ? (
                    <div className="w3-bar">
                        <button onClick={() => {this.setState({showAddDiyCategorySection: false});}} className="w3-button w3-left w3-green w3-round"><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                    </div>
                ) : null}

                {!(this.state.showAddDiyCategorySection) ? (
                    <div className="w3-bar">
                        <button onClick={() => {this.setState({showAddDiyCategorySection: true});}} className="w3-button w3-right w3-green"><i className="fa fa-plus" aria-hidden="true"></i> Add Category</button>
                    </div>
                ) : null}

                {!(this.state.showAddDiyCategorySection) ? (
                    <div style={{margin: '20px'}}>
                        <ul className="w3-ul w3-card">
                            {this.state.allCategories && this.state.allCategories.length ? (
                                <div>
                                    {this.state.allDiyCategories.map(category => {
                                        return (<li key={category._id} className="w3-display-container w3-margin-top w3-white">{category.name} <span onClick={this.removeDiyCategory.bind(this, category._id)} className="w3-button w3-transparent w3-display-right">&times;</span></li>)
                                    })}
                                </div>
                            ) : <div className="w3-center">No Categories Added</div>}
                        </ul>
                    </div>
                ) : null}

                {this.state.showAddDiyCategorySection ? (
                    <div className="diy-input">
                        <div>
                            <div>
                            <label htmlFor="categoryName">Name</label>
                                <input type="text" value={this.state.diyCategoryName} onChange={this.updateDiyCategoryNameValue} id="category" name="diyCategoryName" placeholder="Diy Category name"/>

                                <button className="submit" disabled={this.state.uploadingDiyCategories} onClick={this.addDiyCategory} type="submit">{!(this.state.uploadingDiyCategories) ? 'Submit' : 'Adding'}</button>
                                <div className="w3-center">{this.state.uploadingDiyCategories ? <i className="fa fa-circle-o-notch fa-spin" style={{"fontSize":"24px"}}></i> : null}</div>
                            </div>
                        </div>
                    </div>
                ) : null}

                </div>)
            </div>
        )
    }
}

export default DiyCategories;