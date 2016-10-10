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
        this.renderSlider = this.renderSlider.bind(this);
        this.current = true;
        this.range = props.timeStart - props.timeEnd;
    }

    componentDidMount() {
        this.initTime = this.props.timeStart;
        this.rangeSlider = rangeSlider('rangeSlider', {
            // Gives a bit of 'buffer' to the beginning of the axis
            axisDomain: [this.initTime - 1000, this.props.timeEnd],
            handleDomain: [this.props.timeStart, this.props.timeEnd]
        });
        this.lastRenderTime = Date.now();
        this.loop();
    }

    renderSlider() {
        // if 'current', then set timeend to current time and timestart to current time minus previous range
        let timeStart = this.props.timeStart;
        let timeEnd = this.props.timeEnd;
        if (this.current) {
            timeEnd = Date.now();
            timeStart = timeEnd - (this.props.timeEnd - this.props.timeStart);
        }

        this.rangeSlider.destroy();
        this.rangeSlider = rangeSlider('rangeSlider', {
            axisDomain: [this.initTime - 1000, Date.now()],
            handleDomain: [timeStart, timeEnd]
        });

        this.props.dispatch(timeEndChange(timeEnd));
        this.props.dispatch(timeStartChange(timeStart)); 
    }

    loop() {
        this.renderSlider();
        setTimeout(this.loop, this.props.refreshRate);
    }

    handleSliderChange() {
        
    }

    render() {
        return (
            <div id="rangeSlider" style={styles.rangeSlider}></div>
        )
    }
}

export default RangeSlider;

