import { ActionTypes } from './actions';
const { EVENT_GROUP_CHANGE, TIMELINE_RANGE_CHANGE, TIMELINE_REFRESH_CHANGE } = ActionTypes;

function groupBy(props, state = 'all', action) {
    return action.type === EVENT_GROUP_CHANGE ?
        action.groupBy :
        state;
}

function xRange(props, state = 90000, action) {
    return action.type === TIMELINE_RANGE_CHANGE ?
        action.xRange :
        state;
}

function refreshRate(props, state = 3000, action) {
    return action.type === TIMELINE_REFRESH_CHANGE ?
        action.refreshRate :
        state;
}

function reducer(props, state = {}, action) {
    return {
        groupBy: groupBy(props, state.groupBy, action),
        xRange: xRange(props, state.xRange, action),
        refreshRate: refreshRate(props, state.refreshRate, action)
    };
}

export default reducer;