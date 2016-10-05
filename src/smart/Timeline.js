import React, { PropTypes } from 'react';
import * as d3 from 'd3';

// Package is not published on NPM and is included manually
import addTimeline from '../lib/d3-timeline/src/d3-timeline.js';
// Libary modified to decorate passed in d3 object
addTimeline(d3);

class Timeline extends React.Component {
    static propTypes = {
        computedStates: PropTypes.array.isRequired,
        jumpToState: PropTypes.func.isRequired
    }

    formatStates(currentStates, nextStates, initTime) {
        let i = currentStates.length;

        // If we have hopped back in time, recompute all states.
        if (i > nextStates.length) {
            i = 0;
        }

        for (i; i < nextStates.length; i++) {
            console.log(currentStates, nextStates);
            console.log(i, nextStates.length);
            let nextState = { 
                ind: i,
                times: [{
                    'starting_time': Date.now(),
                    'ending_time': Date.now() + 1,
                    'display': 'circle'
                }],
                visibilityState: 'inactive'
            };

            currentStates.push(nextState);
        }; 
        return currentStates;
    }

    renderChart(states, initTime, endTime) {

        let colorScale = d3.scale.ordinal()
            .range(['#ffee00','#ef9b0f', '#6b0000'])
            .domain(['active','hover','inactive']);

        // All of these settings could be controlled with slider   
        let xStart = initTime;
        let xEnd = Date.now();
        // To improve usability, the chart always moves on a 90 second range
        // Range can be scalable after chart animations are in place
        let xRange = 90000; 
        if (xEnd - xStart >= 0) {
            xStart = xEnd - xRange;
        }

        // Must redeclare chart each render. Otherwise it runs into issues -- it must contain state of the previous data.
        let chart = d3.timeline()
            .tickFormat({
                format: d3.time.format('%S'),
                tickTime: d3.time.seconds,
                tickInterval: 5,
                tickSize: 3
            })
            .relativeTime()
            .beginning(xStart)
            .ending(xEnd)
            .colors(colorScale)
            .colorProperty('visibilityState')
            .hover((d, i, datum) => {
                datum.visibilityState = 'hover';
                return datum;
            })
            .click((d, i, datum) => {
                this.props.jumpToState(i);
            });
        d3.select("#timeline").select('svg').remove();
        chart(d3.select("#timeline").append("svg").attr("width", document.getElementById('timeline').offsetWidth)
            .datum(states));
    }
    
    constructor(props) {
        super(props);
        this.initTime = Date.now();
        this.appStates = this.formatStates([], props.computedStates, this.initTime);
    }

    componentWillReceiveProps(nextProps) {
        this.appStates = this.formatStates(this.appStates, nextProps.computedStates, this.initTime);
        this.renderChart(this.appStates, this.initTime);
        console.log(this.props.computedStates);
    }

    componentDidMount() {
        this.renderChart(this.appStates, this.initTime);
        // Weave standard update time of 3 seconds        
        setInterval(this.renderChart.bind(this, this.appStates, this.initTime), 3000);
    }    

    shouldComponentUpdate() {
        // The rendering of this component is handled by D3
        return false;
    }
    
    render() {
        return (
            <div>
                <div>Timeline!</div>
                <div id="timeline"></div>
            </div>
        );
    }
};

export default Timeline;