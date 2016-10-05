import React, { PropTypes } from 'react';
import * as d3 from 'd3';
// Package is not published on NPM and is included manually
import addTimeline from '../lib/d3-timeline/src/d3-timeline.js';
addTimeline(d3);

class Timeline extends React.Component {
    static propTypes = {
        computedStates: PropTypes.array.isRequired
    }

    formatStates(currentStates, nextStates, initTime) {
        let i = currentStates.length;

        // If we have hopped back in time, recompute all states.
        if (i >= nextStates.length) {
            i = 0;
        }

        for (i; i < nextStates.length; i++) {
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

    renderChart(states, initTime) {

        let colorScale = d3.scale.ordinal()
            .range(['#ffee00','#ef9b0f', '#6b0000'])
            .domain(['active','hover','inactive']);

        // All of these settings could be controlled with slider    
        let xStart = initTime;
        let xEnd = Date.now();
        let xRange = 900000; 
        if (xEnd - xStart > xRange) {
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
                datum.state = 'hover';
                return datum;
            })
            .click((d, i, datum) => {
                console.log(d);
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
        setInterval(this.renderChart.bind(this, this.appStates, this.initTime), 3000);
        console.log(this.appStates);
    }

    componentDidMount() {
        this.renderChart(this.appStates, this.initTime);
    }    

    shouldComponentUpdate() {
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