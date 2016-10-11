import React, { PropTypes } from 'react';
import Collapsible from 'react-collapsible';
import JSONTree from 'react-json-tree';
import Header from '../stateless/Header';
import styles from '../../styles.js';

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
                <div style={styles.title}>Active State Index: {index}</div>
                    <Collapsible transitionTime={100} trigger={<Header open={false} value='Action' />} triggerWhenOpen={<Header open={true} value='Action' />}>
                        <div style={styles.panelRight}>
                            <JSONTree data={this.props.actionsById[index].action}/>
                        </div>
                    </Collapsible>
                    <Collapsible transitionTime={100} trigger={<Header open={false} value='State' />} triggerWhenOpen={<Header open={true} value='State' />}>
                        <div style={styles.panelRight}>    
                            <JSONTree data={this.props.computedStates[index].state} />
                        </div>
                    </Collapsible>
            </div>
        );
    }
}

export default StateDetails;
