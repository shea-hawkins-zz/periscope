import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div>{this.props.value}</div>
        )
    }
}

export default Header;
