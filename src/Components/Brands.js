import React, { Component } from 'react';
import '.././App.css';
const { HOST } = require('../config/env');
const utils = require('../utils');

class Brands extends Component {
    constructor(args) {
        super(args);
        this.state = {
            brandName: '',
            allBrands: [],
            showAddBrandSection: false,
            gettingBrands: false,
            uploadingBrand: false
        }
        this.updateBrandyNameValue = this.updateBrandyNameValue.bind(this);
        this.addBrand = this.addBrand.bind(this);
        this.getAllBrands = this.getAllBrands.bind(this);

    }

    componentWillMount() {
        this.getAllBrands();
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

    updateBrandyNameValue(event) {
        this.setState({brandName: event.target.value});
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

    render() {
        return (
            <div>
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
                </div>)
            </div>
        )
    }
}

export default Brands;