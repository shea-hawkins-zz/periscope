import React, { PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import Dock from 'react-dock';

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

// Component

class Periscope extends React.Component {
    static update = reducer;

    static propTypes = {
        // computedStates: PropTypes.array.isRequired,
        // currentStateIndex: PropTypes.number.isRequired,
        // jumpToState: PropTypes.func.isRequired,

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

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <Dock position='bottom'
                  isVisible={true}
                  defaultSize={.5}
                  fluid={true}>
                <div>Periscope Alive!</div>
                <div>Another div!</div>
            </Dock>
        );
    }
}

export default Periscope;