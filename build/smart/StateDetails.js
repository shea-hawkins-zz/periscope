'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactCollapsible = require('react-collapsible');

var _reactCollapsible2 = _interopRequireDefault(_reactCollapsible);

var _reactJsonTree = require('react-json-tree');

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

var _Header = require('../stateless/Header');

var _Header2 = _interopRequireDefault(_Header);

var _styles = require('../styles.js');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StateDetails = function (_React$Component) {
    _inherits(StateDetails, _React$Component);

    function StateDetails() {
        _classCallCheck(this, StateDetails);

        return _possibleConstructorReturn(this, (StateDetails.__proto__ || Object.getPrototypeOf(StateDetails)).apply(this, arguments));
    }

    _createClass(StateDetails, [{
        key: 'render',
        value: function render() {
            var index = this.props.currentStateIndex;
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: _styles2.default.title },
                    'Active State Index: ',
                    index
                ),
                _react2.default.createElement(
                    _reactCollapsible2.default,
                    { transitionTime: 100, trigger: _react2.default.createElement(_Header2.default, { open: false, value: 'Action Data' }), triggerWhenOpen: _react2.default.createElement(_Header2.default, { open: true, value: 'Action Data' }) },
                    _react2.default.createElement(
                        'div',
                        { style: _styles2.default.panel },
                        _react2.default.createElement(_reactJsonTree2.default, { data: this.props.actionsById[index].action })
                    )
                ),
                _react2.default.createElement(
                    _reactCollapsible2.default,
                    { transitionTime: 100, trigger: _react2.default.createElement(_Header2.default, { open: false, value: 'State Data' }), triggerWhenOpen: _react2.default.createElement(_Header2.default, { open: true, value: 'State Data' }) },
                    _react2.default.createElement(
                        'div',
                        { style: _styles2.default.panel },
                        _react2.default.createElement(_reactJsonTree2.default, { data: this.props.computedStates[index].state })
                    )
                )
            );
        }
    }]);

    return StateDetails;
}(_react2.default.Component);

StateDetails.propTypes = {
    // toggleAction: PropTypes.func.isRequired,
    actionsById: _react.PropTypes.object,

    // reset: PropTypes.func.isRequired,
    // commit: PropTypes.func.isRequired,
    // rollback: PropTypes.func.isRequired,
    // sweep: PropTypes.func.isRequired,

    dispatch: _react.PropTypes.func
};
exports.default = StateDetails;