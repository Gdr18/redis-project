import React, { Component } from 'react';
import axios from 'axios';

export default class DisplayUrl extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          url_original: "",
          currentUrl: this.props.match.params.slug
        }      
    } 
    
    getUrl() {
        axios.get(`http://localhost:5000/url/${this.state.currentUrl}`, { withCredentials: true }).then(response => {
        this.setState({
            url_original: Object.keys(response.data)
        })
        }).catch(error => {
        console.log('getUrl error', error);
        });
    }

    componentDidMount() {  
        this.getUrl();
    }

    render() {
        return (
            <div>
                {/* Problema con este renderizado */}
                {this.state.url_original !== "" ? window.open(this.state.url_original) : null}  
            </div>
        );
    }
}