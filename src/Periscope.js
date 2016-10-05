import React, { PropTypes } from 'react';
import { ActionCreators } from 'redux-devtools';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Dock from 'react-dock';
import Timeline from './smart/Timeline.js';

const { reset, rollback, commit, sweep, toggleAction, jumpToState } = ActionCreators;

// Actions
export const UPDATE_SHOW = '@@periscope/UPDATE_SHOW_HIDE';
export function updateShow(show) {
  return { type: UPDATE_SHOW_HIDE, show };
}

// Reducer
function initialShow(props, state = false, action) {
    if (!props.preserveShow) {
        return false;
    }
    
    return action.type === UPDATE_SHOW ? 
        action.show :
        state;
}

function reducer(props, state = {}, action) {
    return {
        initialShow: initialShow(props, state.initialShow, action)
    }
}

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

        // stagedActions: PropTypes.array.isRequired,
        // skippedActions: PropTypes.object.isRequired,
        // toggleAction: PropTypes.func.isRequired,
        // actionsById: PropTypes.object,

        // reset: PropTypes.func.isRequired,
        // commit: PropTypes.func.isRequired,
        // rollback: PropTypes.func.isRequired,
        // sweep: PropTypes.func.isRequired,

        dispatch: PropTypes.func,

        periscopeState: PropTypes.shape({
            initialShow: PropTypes.boolean
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
                <div>Redux Periscope</div>
                <div style={styles.container} >
                    <div style={styles.menu} >MenuBar</div>
                    <div style={styles.timeline} >
                        <Timeline computedStates={this.props.computedStates}
                                  jumpToState={this.jumpToState} />
                    </div>
                    <div style={styles.details} >DetailsBar</div>
                </div>
            </Dock>
        );
    }
}

export default Periscope;