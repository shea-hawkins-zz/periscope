import React, { PropTypes } from 'react';
import Collapsible from 'react-collapsible';
import { ActionCreators } from '../actions.js';
let { groupChange } = ActionCreators;

class Menu extends React.Component {
   static propTypes = {
        // toggleAction: PropTypes.func.isRequired,
        actionsById: PropTypes.object,

        // reset: PropTypes.func.isRequired,
        // commit: PropTypes.func.isRequired,
        // rollback: PropTypes.func.isRequired,
        // sweep: PropTypes.func.isRequired,

        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handleEventGroupChange = this.handleEventGroupChange.bind(this);
    }

    handleEventGroupChange(e) {
        this.props.dispatch(groupChange(e.target.value));
    }

    render() {
        let index = this.props.currentStateIndex;
        return (
            <div>
                <div>Menu</div>
                    <Collapsible trigger="Events">
                        <div>
                            <label for="#eventGroupBy">Group By:</label>
                            <select id="eventGroupBy" onChange={this.handleEventGroupChange}>
                                <option value="all">All</option>
                                <option value="type">Action Type</option>
                            </select>
                        </div>
                    </Collapsible>
                    <Collapsible trigger="Timeline">
                        <div>
                            <label for="#timelineRefreshRate">Refresh Rate:</label>
                            <input type="text" id="timelineRefreshRate" />
                        </div>
                        <div>
                            <label for="#timelineRange">Range:</label>
                            <input type="text" id="timelineRange" />
                        </div>
                    </Collapsible>
            </div>
        );
    }
}

export default Menu;
