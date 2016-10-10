import React from 'react';
import rangeSlider from '../../charts/rangeSlider';
import styles from '../../styles';

class RangeSlider extends React.Component {
    componentDidMount() {
        this.rangeSlider = rangeSlider('rangeSlider', {});
    }

    componentWillReceiveProps() {
        this.rangeSlider.update(opts);
    }

    render() {
        return (
            <div id="rangeSlider" style={styles.rangeSlider}>I'm a rangeslider!</div>
        )
    }
}

export default RangeSlider;

