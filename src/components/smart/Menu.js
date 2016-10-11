import React, { PropTypes } from 'react';
import Collapsible from 'react-collapsible';
import Header from '../stateless/Header';
import { ActionCreators } from '../../actions';
import styles from '../../styles';
let { groupChange, rangeChange, refreshChange } = ActionCreators;

class Menu extends React.Component {
   static propTypes = {
        actionsById: PropTypes.object,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handleEventGroupChange = this.handleEventGroupChange.bind(this);
        this.handleRefreshChange = this.handleRefreshChange.bind(this);
        this.handleRangeChange = this.handleRangeChange.bind(this);
    }

    handleEventGroupChange(e) {
        this.props.dispatch(groupChange(e.target.value));
    }

    handleRefreshChange(e) {
        //@TODO: Throttle and validate with RXJS
        if (e.target.value > 0) {
            this.props.dispatch(refreshChange(e.target.value));
        }
    }

    handleRangeChange(e) {
        //@TODO: Throttle and validate with RXJS
        if (e.target.value > 0) {
            this.props.dispatch(rangeChange(e.target.value));
        }
    }

    render() {
        let index = this.props.currentStateIndex;
        return (
            <div>
                <div style={styles.title}>Menu</div>
                    <Collapsible transitionTime={100} trigger={<Header open={false} value='Events' />} triggerWhenOpen={<Header open={true} value='Events' />}>
                        <div style={styles.panelLeft}>
                            <div>
                                <label htmlFor="#eventGroupBy">Group By:</label>
                                <select id="eventGroupBy" style={styles.input} onChange={this.handleEventGroupChange} defaultValue='type'>
                                    <option value="all">All</option>
                                    <option value="type">Action Type</option>
                                </select>
                            </div>
                        </div>
                    </Collapsible>
                    <Collapsible transitionTime={100} trigger={<Header open={false} value='Settings' />} triggerWhenOpen={<Header open={true} value='Settings' />}>
                        <div style={styles.panelLeft}>
                            <div>
                                <label htmlFor="#timelineRefreshRate">Refresh Rate:</label>
                                <input type="number" style={styles.input} id="timelineRefreshRate" onChange={this.handleRefreshChange} defaultValue={this.props.state.refreshRate} />
                            </div>
                        </div>
                    </Collapsible>
            </div>
        );
    }
}

export default Menu;
