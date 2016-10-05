'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCollapsible = require('react-collapsible');

var _reactCollapsible2 = _interopRequireDefault(_reactCollapsible);

var _Header = require('../stateless/Header');

var _Header2 = _interopRequireDefault(_Header);

var _actions = require('../actions');

var _styles = require('../styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var groupChange = _actions.ActionCreators.groupChange;
var rangeChange = _actions.ActionCreators.rangeChange;
var refreshChange = _actions.ActionCreators.refreshChange;

var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu(props) {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

        _this.handleEventGroupChange = _this.handleEventGroupChange.bind(_this);
        _this.handleRefreshChange = _this.handleRefreshChange.bind(_this);
        _this.handleRangeChange = _this.handleRangeChange.bind(_this);
        return _this;
    }

    _createClass(Menu, [{
        key: 'handleEventGroupChange',
        value: function handleEventGroupChange(e) {
            this.props.dispatch(groupChange(e.target.value));
        }
    }, {
        key: 'handleRefreshChange',
        value: function handleRefreshChange(e) {
            //@TODO: Throttle and validate with RXJS
            if (e.target.value > 0) {
                this.props.dispatch(refreshChange(e.target.value));
            }
        }
    }, {
        key: 'handleRangeChange',
        value: function handleRangeChange(e) {
            //@TODO: Throttle and validate with RXJS
            if (e.target.value > 0) {
                this.props.dispatch(rangeChange(e.target.value));
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var index = this.props.currentStateIndex;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: _styles2.default.title },
                    'Menu'
                ),
                _react2.default.createElement(
                    _reactCollapsible2.default,
                    { transitionTime: 100, trigger: _react2.default.createElement(_Header2.default, { open: false, value: 'Events' }), triggerWhenOpen: _react2.default.createElement(_Header2.default, { open: true, value: 'Events' }) },
                    _react2.default.createElement(
                        'div',
                        { style: _styles2.default.panel },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'label',
                                { htmlFor: '#eventGroupBy' },
                                'Group By:'
                            ),
                            _react2.default.createElement(
                                'select',
                                { id: 'eventGroupBy', onChange: this.handleEventGroupChange },
                                _react2.default.createElement(
                                    'option',
                                    { value: 'all' },
                                    'All'
                                ),
                                _react2.default.createElement(
                                    'option',
                                    { value: 'type' },
                                    'Action Type'
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    _reactCollapsible2.default,
                    { transitionTime: 100, trigger: _react2.default.createElement(_Header2.default, { open: false, value: 'Timeline' }), triggerWhenOpen: _react2.default.createElement(_Header2.default, { open: true, value: 'Timeline' }) },
                    _react2.default.createElement(
                        'div',
                        { style: _styles2.default.panel },
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'label',
                                { htmlFor: '#timelineRefreshRate' },
                                'Refresh Rate:'
                            ),
                            _react2.default.createElement('input', { type: 'text', id: 'timelineRefreshRate', onChange: this.handleRefreshChange, defaultValue: this.props.state.refreshRate })
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'label',
                                { htmlFor: '#timelineRange' },
                                'Range:'
                            ),
                            _react2.default.createElement('input', { type: 'text', id: 'timelineRange', onChange: this.handleRangeChange, defaultValue: this.props.state.xRange })
                        )
                    )
                )
            );
        }
    }]);

    return Menu;
}(_react2.default.Component);

Menu.propTypes = {
    actionsById: _react.PropTypes.object,
    dispatch: _react.PropTypes.func
};
exports.default = Menu;