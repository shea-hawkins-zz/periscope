import React, { PropTypes } from 'react';
import * as d3 from 'd3';

// Package is not published on NPM and is included manually
import addTimeline from '../lib/d3-timeline/src/d3-timeline.js';
// Libary modified to decorate passed in d3 object
addTimeline(d3);

class Timeline extends React.Component {
    static propTypes = {
        computedStates: PropTypes.array.isRequired,
        jumpToState: PropTypes.func.isRequired,
        currentStateIndex: PropTypes.number.isRequired
    }

    componentDidMount() {
        this.initTime = Date.now();
        this.appStates = this.timestampStates([], this.props.computedStates, this.initTime);
        this.renderChart(this.appStates, this.initTime);
        // Weave standard update time of 3 seconds        
        setInterval(() => this.renderChart(this.appStates, this.initTime), 3000);
    }    

    componentWillReceiveProps(nextProps) {
        this.appStates = this.timestampStates(this.appStates, nextProps.computedStates, this.initTime);
        // Set the active state to active color
        // @PERF - Track previously active state and mutate array to avoid this map
        this.appStates = this.appStates.map(state => {
            state.ind === nextProps.currentStateIndex ? state.visibilityState = 'active' : state.visibilityState = 'inactive';
            return state;
        });
        this.renderChart(this.appStates, this.initTime);
    }

    timestampStates(currentStates, nextStates, initTime) {
        let i = currentStates.length;

        // If we have committed a jump back in time, erase all subsequent states.
        if (i > nextStates.length) {
            currentStates = currentStates.slice(0, nextStates.length);
        }

        // Otherwise we timestamp and add subsequent states
        for (i; i < nextStates.length; i++) {
            let nextState = { 
                ind: i,
                times: [{
                    'starting_time': Date.now(),
                    'ending_time': Date.now() + 1,
                    'display': 'circle'
                }]
            };

            currentStates[i] = nextState;
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
            .click((d, i, datum) => {
                this.props.jumpToState(i);
            });
        d3.select("#timeline").select('svg').remove();
        chart(d3.select("#timeline").append("svg").attr("width", document.getElementById('timeline').offsetWidth)
            .datum(states));
    }

    shouldComponentUpdate() {
        // The rendering of this component is handled by D3
        return false;
    }
    
    render() {
        return (
            <div>
                <div id="timeline"></div>
            </div>
        );
    }
};

export default Timeline;