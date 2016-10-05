'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _d3Timeline = require('../lib/d3-timeline/src/d3-timeline.js');

var _d3Timeline2 = _interopRequireDefault(_d3Timeline);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Package is not published on NPM and is included manually


// Libary modified to decorate passed in d3 object
(0, _d3Timeline2.default)(d3);

var Timeline = function (_React$Component) {
    _inherits(Timeline, _React$Component);

    function Timeline() {
        _classCallCheck(this, Timeline);

        return _possibleConstructorReturn(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).apply(this, arguments));
    }

    _createClass(Timeline, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initTime = Date.now();
            this.appStates = this.timestampStates([], this.props.computedStates, this.initTime);
            this.renderChart(this.appStates, this.initTime);
            this.renderLoop();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.appStates = this.timestampStates(this.appStates, nextProps.computedStates, this.initTime);
            // Set the active state to active color
            // @PERF - Track previously active state and mutate array to avoid this map
            this.appStates = this.appStates.map(function (state, i) {
                state.type = nextProps.actionsById[i].action.type;
                state.times[0].ind === nextProps.currentStateIndex ? state.times[0].visibilityState = 'active' : state.times[0].visibilityState = 'inactive';
                return state;
            });
            this.renderChart(this.appStates, this.initTime);
        }
    }, {
        key: 'renderLoop',
        value: function renderLoop() {
            var _this2 = this;

            this.renderChart(this.appStates, this.initTime);
            setTimeout(function () {
                return _this2.renderLoop();
            }, this.props.refreshRate);
        }
    }, {
        key: 'timestampStates',
        value: function timestampStates(currentStates, nextStates, initTime) {
            var i = currentStates.length;

            // If we have committed a jump back in time, erase all subsequent states.
            if (i > nextStates.length) {
                currentStates = currentStates.slice(0, nextStates.length);
            }

            // Otherwise we timestamp and add subsequent states
            for (i; i < nextStates.length; i++) {

                var nextState = {
                    times: [{
                        'ind': i,
                        'starting_time': Date.now(),
                        'ending_time': Date.now() + 1,
                        'display': 'circle'
                    }]
                };
                currentStates[i] = nextState;
            };
            return currentStates;
        }

        // @PERF - Group states as they are timestamped to improve performance on renders

    }, {
        key: 'groupStates',
        value: function groupStates(states, field) {
            // Groups states together on specified field
            return states.reduce(function (mem, state) {
                for (var i = 0; i < mem.length; i++) {
                    if (mem[i].label === state[field]) {
                        mem[i].times.push(state.times[0]);
                        return mem;
                    }
                }
                mem.push({ label: state[field], times: [state.times[0]] });
                return mem;
            }, []);
        }
    }, {
        key: 'renderChart',
        value: function renderChart(states, initTime) {
            var _this3 = this;

            var colorScale = d3.scale.ordinal().range(['#FF4081', '#ef9b0f', '#3F51B5']).domain(['active', 'hover', 'inactive']);
            var xEnd = Date.now();
            var xRange = this.props.xRange;
            var xStart = xEnd - xRange;

            // Must redeclare chart each render. Otherwise it runs into issues -- it must contain state of the previous data.
            var chart = d3.timeline().tickFormat({
                format: d3.time.format('%S'),
                tickTime: d3.time.seconds,
                tickInterval: 5,
                tickSize: 3
            }).relativeTime().beginning(xStart).ending(xEnd).colors(colorScale).colorProperty('visibilityState').click(function (d, i, datum) {
                _this3.props.jumpToState(d.ind);
            });

            if (this.props.groupBy !== 'all' && this.props.groupBy !== undefined) {
                chart.stack(true);
                states = this.groupStates(states, this.props.groupBy);
            }

            d3.select("#timeline").select('svg').remove();
            chart(d3.select("#timeline").append("svg").attr("width", document.getElementById('timeline').offsetWidth).datum(states));
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            // The rendering of this component is handled by D3
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement('div', { id: 'timeline' })
            );
        }
    }]);

    return Timeline;
}(_react2.default.Component);

Timeline.propTypes = {
    computedStates: _react.PropTypes.array.isRequired,
    jumpToState: _react.PropTypes.func.isRequired,
    currentStateIndex: _react.PropTypes.number.isRequired
};
;

exports.default = Timeline;