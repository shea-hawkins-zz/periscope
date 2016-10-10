import React, { PropTypes } from 'react';
import * as d3 from 'd3';
//Package is not published on NPM and is included manually
import addTimeline from '../../lib/d3-timeline/src/d3-timeline.js';
//Libary modified to decorate passed in d3 object
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
    }

    componentWillReceiveProps(nextProps) {
        this.appStates = this.timestampStates(this.appStates, nextProps.computedStates, this.initTime);
        // Set the active state to active color
        // @PERF - Track previously active state and mutate array to avoid this map
        this.appStates = this.appStates.map((state, i) => {
            state.type = nextProps.actionsById[i].action.type;
            state.times[0].ind === nextProps.currentStateIndex ? 
                state.times[0].visibilityState = 'active' : 
                state.times[0].visibilityState = 'inactive';
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
                times: [{
                    'ind': i,
                    'starting_time': Date.now(),
                    'ending_time': Date.now() + 1,
                    'display': 'circle'
                }]
            };
            currentStates[i] = nextState;
        }; 
        return currentStates;
    }

    // @PERF - Group states as they are timestamped to improve performance on renders
    groupStates(states, field) {
        // Groups states together on specified field
        return states.reduce((mem, state) => {
            for (let i = 0; i < mem.length; i++) {
                if (mem[i].label === state[field]) {
                    mem[i].times.push(state.times[0]);
                    return mem;
                }
            }
            mem.push({label: state[field], times: [state.times[0]]});
            return mem;
        }, []);
    }

    renderChart(states, initTime) {
        let colorScale = d3.scaleOrdinal()
            .range(['#FF4081', '#ef9b0f', '#3F51B5'])
            .domain(['active','hover','inactive']);
        //Must redeclare chart each render. Otherwise it runs into issues -- it must contain state of the previous data.
        let chart = d3.timeline()
            .tickFormat({
                format: d3.timeFormat('%S'),
                tickTime: d3.timeSeconds,
                tickInterval: 5,
                tickSize: 3
            })
            .width(document.getElementById('timeline').offsetWidth)
            .relativeTime()
            .beginning(this.props.timeStart)
            .ending(this.props.timeEnd)
            .colors(colorScale)
            .colorProperty('visibilityState')
            .click((d, i, datum) => {
                this.props.jumpToState(d.ind);
            });

        if (this.props.groupBy !== 'all' && this.props.groupBy !== undefined) {
            chart.stack(true);
            states = this.groupStates(states, this.props.groupBy); 
        }

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
            <div id="timeline"/>
        );
    }
};

export default Timeline;