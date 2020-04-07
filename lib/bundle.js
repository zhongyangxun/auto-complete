'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));
var styled = _interopDefault(require('styled-components'));

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  border: solid #fff;\n  border-width: 4px 0;\n  box-shadow: 0 9px 28px 8px rgba(0, 0, 0, 0.15);\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  padding: 5px 10px;\n\n  &:hover {\n    background-color: #eee;\n  }\n\n  &.", " {\n    background-color: #e6f7ff;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var ACTIVE_CLASS = 'active';
var OptionItem = styled.div(_templateObject(), ACTIVE_CLASS);
var OptionsWrapper = styled.div(_templateObject2());

var SelectBox = function SelectBox(_ref) {
  var options = _ref.options,
      onSelect = _ref.onSelect,
      value = _ref.value;

  var onOptionSelect = function onOptionSelect(itemValue) {
    onSelect(itemValue);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: "select-box"
  }, /*#__PURE__*/React__default.createElement(OptionsWrapper, null, options.map(function (item, index) {
    var itemValue = item.value;
    var activeClass = itemValue === value ? ACTIVE_CLASS : '';
    return /*#__PURE__*/React__default.createElement(OptionItem, {
      onMouseDown: function onMouseDown() {
        onOptionSelect(itemValue);
      },
      className: "option ".concat(activeClass),
      key: index
    }, itemValue);
  })));
};

SelectBox.propTypes = {
  options: PropTypes.array,
  onSelect: PropTypes.func,
  value: PropTypes.string
};
SelectBox.defaultProps = {
  options: [],
  onSelect: function onSelect() {},
  value: ''
};

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  font-size: 16px;\n  padding: 5px 10px;\n  width: 100%;\n  box-sizing: border-box;\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var Input = styled.input(_templateObject$1());

var AutoComplete = function AutoComplete(_ref) {
  var value = _ref.value,
      options = _ref.options,
      onSelect = _ref.onSelect,
      onChange = _ref.onChange,
      onSearch = _ref.onSearch,
      onFocus = _ref.onFocus,
      onBlur = _ref.onBlur;

  var _useState = React.useState(value),
      _useState2 = _slicedToArray(_useState, 2),
      _value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      selectBoxOpen = _useState4[0],
      setSelectBoxOpen = _useState4[1];

  var onSelectBoxSelect = function onSelectBoxSelect(val) {
    setValue(val);
    onSelect(val);
  };

  var onValueUpdate = function onValueUpdate(event) {
    var valueHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    var val = event.target.value;
    valueHandler(val);
  };

  var onInputChange = function onInputChange(val) {
    onChange(val);
  };

  var _onInput = function onInput(val) {
    setValue(val);
    onSearch(val);
  };

  var onInputFocus = function onInputFocus() {
    setSelectBoxOpen(true);
    onFocus();
  };

  var onInputBlur = function onInputBlur() {
    setSelectBoxOpen(false);
    onBlur();
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: "auto-complete"
  }, /*#__PURE__*/React__default.createElement(Input, {
    type: "text",
    value: _value,
    onChange: function onChange(event) {
      onValueUpdate(event, onInputChange);
    },
    onInput: function onInput(event) {
      onValueUpdate(event, _onInput);
    },
    onFocus: function onFocus(event) {
      onValueUpdate(event, onInputFocus);
    },
    onBlur: function onBlur() {
      onInputBlur();
    }
  }), options.length > 0 && selectBoxOpen ? /*#__PURE__*/React__default.createElement(SelectBox, {
    value: _value,
    options: options,
    onSelect: function onSelect(val) {
      onSelectBoxSelect(val);
    }
  }) : null);
};

var funcType = PropTypes.func;
AutoComplete.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  onSelect: funcType,
  onChange: funcType,
  onSearch: funcType,
  onFocus: funcType,
  onBlur: funcType
};

var defaultEmptyFunc = function defaultEmptyFunc() {};

AutoComplete.defaultProps = {
  value: '',
  options: [],
  onSelect: defaultEmptyFunc,
  onChange: defaultEmptyFunc,
  onSearch: defaultEmptyFunc,
  onBlur: defaultEmptyFunc,
  onFocus: defaultEmptyFunc
};

module.exports = AutoComplete;
