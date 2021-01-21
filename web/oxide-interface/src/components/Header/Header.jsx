import React from 'react';

import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <img src={process.env.PUBLIC_URL + '/favicon.ico'} alt=""/>
                <h1 className="title">{this.props.title}</h1>
            </div>
        );
    }
}

export default Header;
