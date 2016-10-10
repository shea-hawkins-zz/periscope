const EVENT_GROUP_CHANGE = '@@periscope/EVENT_GROUP_CHANGE';
const TIMELINE_RANGE_CHANGE = '@@periscope/TIMELINE_RANGE_CHANGE';
const TIMELINE_REFRESH_CHANGE = '@@periscope/TIMELINE_REFRESH_CHANGE';
const SLIDER_START_CHANGE = '@@periscope/TIMELINE_START_CHANGE';
const SLIDER_END_CHANGE = '@@periscope/TIMELINE_END_CHANGE';

let ActionTypes = {
    EVENT_GROUP_CHANGE,
    TIMELINE_RANGE_CHANGE,
    TIMELINE_REFRESH_CHANGE,
    SLIDER_START_CHANGE,
    SLIDER_END_CHANGE
};

export { ActionTypes };

const groupChange = function(group) {
    return {
        type: EVENT_GROUP_CHANGE,
        groupBy: group
    };
};

const refreshChange = function(rate) {
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

const timeStartChange = function(time) {
    return {
        type: SLIDER_START_CHANGE,
        timeStart: time
    };
};

const timeEndChange = function(time) {
    return {
        type: SLIDER_END_CHANGE,
        timeEnd: time
    };
};

let ActionCreators = {
    groupChange,
    rangeChange,
    refreshChange,
    timeStartChange,
    timeEndChange
};

export { ActionCreators };