import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Urls extends Component {
    constructor() {
        super();

        this.state = {
            urls: []
        }
    }

    getUrls() {
        axios.get('http://localhost:5000/urls', {withCredentials: true}).then(response => {
            this.setState({
                urls: [...response.data]
            });
        }).catch(error => {
            console.log('error getting urls', error);   
        });
    }

    urlsItems() {
        return this.state.urls.map(item => {
            return <Link key={Object.values(item)} to={`/url/${Object.values(item)}`}>{`http://localhost:8080/url/${Object.values(item)}`}</Link>;
        })
    }

    componentDidMount() {
        this.getUrls();
    }

    render() {
        return (
            <div className='urls-list'>
                {this.urlsItems()}
            </div>
        );
    }
}
