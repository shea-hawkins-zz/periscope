import React from 'react';
import throttle from 'lodash/throttle';
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
        this.handleRangeChange = throttle(this.handleRangeChange.bind(this), 300);
        this.current = true;
        this.range = props.timeStart - props.timeEnd;
    }

    componentDidMount() {
        this.initTime = this.props.timeStart;
        this.rangeSlider = rangeSlider('rangeSlider', {
            // Gives a bit of 'buffer' to the beginning of the axis
            axisDomain: [this.initTime - 1000, this.props.timeEnd],
            handleDomain: [this.props.timeStart, this.props.timeEnd],
            onRangeChange: this.handleRangeChange
        });
        this.lastRenderTime = Date.now();
        this.loop();
    }

    renderSlider() {
        if (!this.isDragging) {
             // if 'current', then set timeend to current time and timestart to current time minus previous range
            let timeStart = this.props.timeStart;
            let timeEnd = this.props.timeEnd;
            this.axisEnd = Date.now();

            if (this.current) {
                timeEnd = this.axisEnd;
                timeStart = this.axisEnd - (this.props.timeEnd - this.props.timeStart);
            }

            this.rangeSlider.destroy();
            this.rangeSlider = rangeSlider('rangeSlider', {
                axisDomain: [this.initTime - 1000, this.axisEnd],
                handleDomain: [timeStart, timeEnd],
                onRangeChange: this.handleRangeChange
            });

            this.props.dispatch(timeEndChange(timeEnd));
            this.props.dispatch(timeStartChange(timeStart)); 
        }
    }

    loop() {
        this.renderSlider();
        setTimeout(this.loop, this.props.refreshRate);
    }

    handleRangeChange(range) {
        this.isDragging = true;
        if (this.handle) {
            clearTimeout(this.handle);
        }
        this.handle = setTimeout(() => this.isDragging = false, 500);
        console.log(this.axisEnd - range[1]);
        // Snaps the slider to the end of the range if the end slider is within 100 miliseconds of the end
        this.current = this.axisEnd - range[1] < 200;

        this.props.dispatch(timeStartChange(range[0]));
        this.props.dispatch(timeEndChange(range[1]));
    }

    render() {
        return (
            <div id="rangeSlider" style={styles.rangeSlider}></div>
        )
    }
}

export default RangeSlider;

