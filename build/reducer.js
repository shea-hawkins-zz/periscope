'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = require('./actions');

var EVENT_GROUP_CHANGE = _actions.ActionTypes.EVENT_GROUP_CHANGE;
var TIMELINE_RANGE_CHANGE = _actions.ActionTypes.TIMELINE_RANGE_CHANGE;
var TIMELINE_REFRESH_CHANGE = _actions.ActionTypes.TIMELINE_REFRESH_CHANGE;


function groupBy(props) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
    var action = arguments[2];

    return action.type === EVENT_GROUP_CHANGE ? action.groupBy : state;
}

function xRange(props) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 90000;
    var action = arguments[2];

    return action.type === TIMELINE_RANGE_CHANGE ? action.xRange : state;
}

function refreshRate(props) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
    var action = arguments[2];

    return action.type === TIMELINE_REFRESH_CHANGE ? action.refreshRate : state;
}

function reducer(props) {
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var action = arguments[2];

    return {
        groupBy: groupBy(props, state.groupBy, action),
        xRange: xRange(props, state.xRange, action),
        refreshRate: refreshRate(props, state.refreshRate, action)
    };
}

exports.default = reducer;