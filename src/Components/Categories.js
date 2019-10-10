import React, { Component } from 'react';
import '.././App.css';
const { HOST } = require('../config/env');
const utils = require('../utils');

class Categories extends Component {
    constructor(args) {
        super(args);
        this.state = {
            categoryName: '',
            allCategories: [],
            showAddCategorySection: false,
            gettingCategories: false,
            uploadingCategories: false
        }
        this.updateCategoryNameValue = this.updateCategoryNameValue.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.getAllCategories = this.getAllCategories.bind(this);
    }

    componentWillMount() {
        this.getAllCategories();
    }

    updateCategoryNameValue(event) {
        this.setState({categoryName: event.target.value});
    }

    async addCategory() {
        const upload = await fetch(`${HOST.DEV}/category/addCategory`, {
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

    async getAllCategories() {
        this.setState({gettingCategories: true});
        const categories = await fetch(`${HOST.DEV}/category/allCategories`, {
            method: 'GET',
            headers: utils.getHeaders()
        });
        categories.json().then(response => {
            this.setState({allCategories: response.data, gettingCategories: false});
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

    render() {
        return (
            <div>
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
            </div>
        )
    }
}

export default Categories;