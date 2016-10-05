import React, { PropTypes } from 'react';
import Collapsible from 'react-collapsible';
import JSONTree from 'react-json-tree'

class StateDetails extends React.Component {
   static propTypes = {
        // toggleAction: PropTypes.func.isRequired,
        actionsById: PropTypes.object,

        // reset: PropTypes.func.isRequired,
        // commit: PropTypes.func.isRequired,
        // rollback: PropTypes.func.isRequired,
        // sweep: PropTypes.func.isRequired,

        dispatch: PropTypes.func
    };
    render() {
        let index = this.props.currentStateIndex;
        return (
            <div>
                <div>Active State Index: {index}</div>
                    <Collapsible trigger="Action Data">
                        <JSONTree data={this.props.actionsById[index].action}/>
                    </Collapsible>
                    <Collapsible trigger="State Data">
                        <JSONTree data={this.props.computedStates[index].state} />
                    </Collapsible>
            </div>
        );
    }
}

export default StateDetails;
