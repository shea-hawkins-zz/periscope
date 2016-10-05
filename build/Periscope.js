'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxDevtools = require('redux-devtools');

var _function = require('react-pure-render/function');

var _function2 = _interopRequireDefault(_function);

var _reactDock = require('react-dock');

var _reactDock2 = _interopRequireDefault(_reactDock);

var _reducer = require('./reducer.js');

var _reducer2 = _interopRequireDefault(_reducer);

var _styles = require('./styles.js');

var _styles2 = _interopRequireDefault(_styles);

var _Menu = require('./smart/Menu.js');

var _Menu2 = _interopRequireDefault(_Menu);

var _Timeline = require('./smart/Timeline.js');

var _Timeline2 = _interopRequireDefault(_Timeline);

var _StateDetails = require('./smart/StateDetails.js');

var _StateDetails2 = _interopRequireDefault(_StateDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var reset = _reduxDevtools.ActionCreators.reset;
var rollback = _reduxDevtools.ActionCreators.rollback;
var commit = _reduxDevtools.ActionCreators.commit;
var sweep = _reduxDevtools.ActionCreators.sweep;
var toggleAction = _reduxDevtools.ActionCreators.toggleAction;
var _jumpToState = _reduxDevtools.ActionCreators.jumpToState;

// Component
// State Structure:
// [{state: {}}], at index


var Periscope = function (_React$Component) {
    _inherits(Periscope, _React$Component);

    function Periscope(props) {
        _classCallCheck(this, Periscope);

        var _this = _possibleConstructorReturn(this, (Periscope.__proto__ || Object.getPrototypeOf(Periscope)).call(this, props));

        _this.shouldComponentUpdate = _function2.default;

        _this.jumpToState = _this.jumpToState.bind(_this);
        return _this;
    }

    _createClass(Periscope, [{
        key: 'jumpToState',
        value: function jumpToState(index) {
            this.props.dispatch(_jumpToState(index));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactDock2.default,
                { position: 'bottom',
                    isVisible: true,
                    defaultSize: .5,
                    fluid: true,
                    dimMode: 'none' },
                _react2.default.createElement(
                    'div',
                    { style: _styles2.default.container },
                    _react2.default.createElement(
                        'div',
                        { style: _styles2.default.menu },
                        _react2.default.createElement(_Menu2.default, { dispatch: this.props.dispatch,
                            state: this.props.monitorState })
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: _styles2.default.timeline },
                        _react2.default.createElement(_Timeline2.default, { computedStates: this.props.computedStates,
                            actionsById: this.props.actionsById,
                            groupBy: this.props.monitorState.groupBy,
                            xRange: this.props.monitorState.xRange,
                            refreshRate: this.props.monitorState.refreshRate,
                            jumpToState: this.jumpToState,
                            currentStateIndex: this.props.currentStateIndex })
                    ),
                    _react2.default.createElement(
                        'div',
                        { style: _styles2.default.details },
                        _react2.default.createElement(_StateDetails2.default, { computedStates: this.props.computedStates,
                            actionsById: this.props.actionsById,
                            currentStateIndex: this.props.currentStateIndex })
                    )
                )
            );
        }
    }]);

    return Periscope;
}(_react2.default.Component);

Periscope.update = _reducer2.default;
Periscope.propTypes = {
    computedStates: _react.PropTypes.array.isRequired,
    currentStateIndex: _react.PropTypes.number.isRequired,
    actionsById: _react.PropTypes.object,
    dispatch: _react.PropTypes.func,
    monitorState: _react.PropTypes.shape({
        groupBy: _react.PropTypes.boolean
    })
};
exports.default = Periscope;