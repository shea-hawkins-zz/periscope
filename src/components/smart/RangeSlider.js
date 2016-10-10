import React from 'react';
import { ActionCreators } from '../../actions';
import rangeSlider from '../../charts/rangeSlider';
import styles from '../../styles';

let {
    timeStartChange,
    timeEndChange
} = ActionCreators;

class RangeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.loop = this.loop.bind(this);
    }

    componentDidMount() {
        this.rangeSlider = rangeSlider('rangeSlider', {});
        this.lastRenderTime = Date.now();
        this.loop();
    }

    loop() {
        let dT = Date.now() - this.lastRenderTime;
        this.props.dispatch(timeEndChange(this.props.timeEnd + dT));
        this.props.dispatch(timeStartChange(this.props.timeStart + dT));   
        this.lastRenderTime = Date.now();
        setTimeout(this.loop, this.props.refreshRate);
    }

    componentWillReceiveProps() {
    }

    render() {
        return (
            <div id="rangeSlider" style={styles.rangeSlider}></div>
        )
    }
}

export default RangeSlider;

