const EVENT_GROUP_CHANGE = '@@periscope/EVENT_GROUP_CHANGE';
const TIMELINE_RANGE_CHANGE = '@@periscope/TIMELINE_RANGE_CHANGE';
const TIMELINE_REFRESH_CHANGE = '@@periscope/TIMELINE_REFRESH_CHANGE';

let ActionTypes = {
    EVENT_GROUP_CHANGE,
    TIMELINE_RANGE_CHANGE,
    TIMELINE_REFRESH_CHANGE
};

export { ActionTypes };

const groupChange = function(group) {
    return {
        type: EVENT_GROUP_CHANGE,
        groupBy: group
    };
};

const rateChange = function(rate) {
    return {
        type: TIMELINE_REFRESH_CHANGE,
        refreshRate: rate
    };
};

const rangeChange = function(range) {
    return {
        type: TIMELINE_RANGE_CHANGE,
        xRange: range
    };
};

let ActionCreators = {
    groupChange,
    rangeChange,
    rateChange
};

export { ActionCreators };