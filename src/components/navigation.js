import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navigation extends Component {
    render() {
        return (
            <div className='barra-links'>
                <Link to="/">Redis Link Shortener</Link>
                <Link to="/urls">All links</Link>
            </div>
        );
    }
}