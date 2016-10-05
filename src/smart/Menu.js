import React, { PropTypes } from 'react';
import Collapsible from 'react-collapsible';

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
    render() {
        let index = this.props.currentStateIndex;
        return (
            <div>
                <div>Active State Index: {index}</div>
                    <Collapsible trigger="Events">
                        <div>Group By: </div>
                        <div>Dropdown </div>
                    </Collapsible>
                    <Collapsible trigger="Timeline">
                        <div>Refresh Rate</div>
                        <div>Fillable</div>
                        <div>Range</div>
                        <div>Fillable</div>
                    </Collapsible>
            </div>
        );
    }
}

export default Menu;
