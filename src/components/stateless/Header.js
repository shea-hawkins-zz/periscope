import React from 'react';
import styles from '../../styles';

class Header extends React.Component {
    render() {
        return (
            <div style={styles.header}>
                <div>{this.props.value}</div>
            </div>
        )
    }
}

export default Header;
