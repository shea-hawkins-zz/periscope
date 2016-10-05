import React, { PropTypes } from 'react';
import { ActionCreators } from 'redux-devtools';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Dock from 'react-dock';
import reducer from './reducer.js';
import Menu from './smart/Menu.js';
import Timeline from './smart/Timeline.js';
import StateDetails from './smart/StateDetails.js';

const { reset, rollback, commit, sweep, toggleAction, jumpToState } = ActionCreators;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: '1',
        height: '100%'
    },
    timeline: {
        flex: '1'
    },
    menu: {
        flex: '0 0 18em',
        order: '-1',
        backgroundColor: 'lightBlue'
    },
    details: {
        flex: '0 0 18em',
        backgroundColor: 'pink'
    }
};

// Component
// State Structure:
    // [{state: {}}], at index


class Periscope extends React.Component {
    static update = reducer;

    static propTypes = {
        computedStates: PropTypes.array.isRequired,
        currentStateIndex: PropTypes.number.isRequired,
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
        return (
            <Dock position='bottom'
                  isVisible={true}
                  defaultSize={.5}
                  fluid={true} 
                  dimMode='none' >
                <div style={styles.container} >
                    <div style={styles.menu}>
                        <Menu dispatch={this.props.dispatch}
                              state={this.props.monitorState} />
                    </div>
                    <div style={styles.timeline} >
                        <Timeline computedStates={this.props.computedStates}
                                  actionsById={this.props.actionsById}
                                  groupBy={this.props.monitorState.groupBy}
                                  xRange={this.props.monitorState.xRange}
                                  refreshRate={this.props.monitorState.refreshRate}
                                  jumpToState={this.jumpToState}
                                  currentStateIndex={this.props.currentStateIndex} />
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