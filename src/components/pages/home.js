import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    constructor() {
        super();

        this.state = {
            url_acortada: "",
            url_original: "",
            submit: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        
        if (event.target.value === "") {
            this.setState({submit: false});
        };
    }

    acortadorUrl() {
        const reg_ex = new RegExp('^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$');

        if (this.state.url_original.match(reg_ex)) {
            this.setState({
                url_acortada: Math.random().toString(36).substring(2,12),
            });
        } else {
            return null
        };
    }

    handleSubmit(event) {
        if(this.state.url_original === "") {
            alert("Por favor, inserte una url válida.")
            event.preventDefault();
            return null  
        } else {
            this.acortadorUrl();
            this.postUrl();
        }
        
        event.preventDefault();   
    }

    postUrl() {
        axios.post('http://localhost:5000/url', {
            'url_original': this.state.url_original,
            'url_acortada': this.state.url_acortada
        }, { withCredentials: true }).then(response => {   
            if  (response.status === 200) {
                this.setState({submit: true})
            }
        }).catch(error => { 
            console.log('error con la conexion', error);
            if (error.response.status === 422) {
                alert('Esta url ya ha sido insertada, intente con otra.');
            } 

            if (error.response.status === 423) {
                this.setState({
                    submit: false
                });
                this.acortadorUrl();
            };
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='input-button'>
                <input type='url' name='url_original' onChange={this.handleChange} value={this.state.url_original}/>
                <button>SHORTEN URL</button>
                { this.state.submit ? (<Link to={`/url/${this.state.url_acortada}`}>{`http://localhost:8080/url/${this.state.url_acortada}`}</Link>) : null }
            </form>
        );
    }
}