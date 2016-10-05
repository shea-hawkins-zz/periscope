'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var EVENT_GROUP_CHANGE = '@@periscope/EVENT_GROUP_CHANGE';
var TIMELINE_RANGE_CHANGE = '@@periscope/TIMELINE_RANGE_CHANGE';
var TIMELINE_REFRESH_CHANGE = '@@periscope/TIMELINE_REFRESH_CHANGE';

var ActionTypes = {
    EVENT_GROUP_CHANGE: EVENT_GROUP_CHANGE,
    TIMELINE_RANGE_CHANGE: TIMELINE_RANGE_CHANGE,
    TIMELINE_REFRESH_CHANGE: TIMELINE_REFRESH_CHANGE
};

exports.ActionTypes = ActionTypes;


var groupChange = function groupChange(group) {
    return {
        type: EVENT_GROUP_CHANGE,
        groupBy: group
    };
};

var refreshChange = function refreshChange(rate) {
    return {
        type: TIMELINE_REFRESH_CHANGE,
        refreshRate: rate
    };
};

var rangeChange = function rangeChange(range) {
    return {
        type: TIMELINE_RANGE_CHANGE,
        xRange: range
    };
};

var ActionCreators = {
    groupChange: groupChange,
    rangeChange: rangeChange,
    refreshChange: refreshChange
};

exports.ActionCreators = ActionCreators;