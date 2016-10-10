import React, { PropTypes } from 'react';
import { ActionCreators } from 'redux-devtools';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Dock from 'react-dock';
import reducer from './reducer.js';
import styles from './styles.js';
import Menu from './components/smart/Menu.js';
import Timeline from './components/smart/Timeline.js';
import RangeSlider from './components/smart/RangeSlider';
import StateDetails from './components/smart/StateDetails.js';

const { reset, rollback, commit, sweep, toggleAction, jumpToState } = ActionCreators;

// Component
// State Structure:
    // [{state: {}}], at index


class Periscope extends React.Component {
    static update = reducer;

    static propTypes = {
        computedStates: PropTypes.array,
        currentStateIndex: PropTypes.number,
        actionsById: PropTypes.object,
        dispatch: PropTypes.func,
        monitorState: PropTypes.shape({
            groupBy: PropTypes.boolean
        })
    };

    constructor(props) {
        super(props);
        this.jumpToState = this.jumpToState.bind(this);
    }

    jumpToState(index) {
        this.props.dispatch(jumpToState(index));
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        let state = this.props.monitorState;
        return (
            <Dock position='bottom'
                  isVisible={true}
                  defaultSize={.5}
                  fluid={true} 
                  dimMode='none' >
                <div style={styles.container} >
                    <div style={styles.menu}>
                        <Menu dispatch={this.props.dispatch}
                              state={state} />
                    </div>
                    <div style={styles.timeline} >
                        <Timeline computedStates={this.props.computedStates}
                                  actionsById={this.props.actionsById}
                                  groupBy={state.groupBy}
                                  timeStart={state.timeStart}
                                  timeEnd={state.timeEnd}
                                  jumpToState={this.jumpToState}
                                  currentStateIndex={this.props.currentStateIndex} />
                         <RangeSlider timeStart={state.timeStart} 
                                      timeEnd={state.timeEnd} 
                                      refreshRate={state.refreshRate} 
                                      dispatch={this.props.dispatch} />

                    </div>
                    <div style={styles.details} >
                        <StateDetails computedStates={this.props.computedStates}
                                      actionsById={this.props.actionsById}
                                      currentStateIndex={this.props.currentStateIndex} />
                                      
                    </div>
                </div>
            </Dock>
        );
    }
}

export default Periscope;