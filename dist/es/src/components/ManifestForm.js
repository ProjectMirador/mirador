function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
/**
 * Provides a form for user input of a manifest url
 * @prop {Function} fetchManifest
 */

export var ManifestForm = /*#__PURE__*/function (_Component) {
  _inherits(ManifestForm, _Component);

  var _super = _createSuper(ManifestForm);

  /**
   * constructor -
   */
  function ManifestForm(props) {
    var _this;

    _classCallCheck(this, ManifestForm);

    _this = _super.call(this, props);
    _this.state = {
      formValue: ''
    };
    _this.inputRef = /*#__PURE__*/React.createRef();
    _this.formSubmit = _this.formSubmit.bind(_assertThisInitialized(_this));
    _this.handleCancel = _this.handleCancel.bind(_assertThisInitialized(_this));
    _this.handleInputChange = _this.handleInputChange.bind(_assertThisInitialized(_this));
    return _this;
  }
  /**
   *
   * @param {*} prevProps
   * @param {*} prevState
   */


  _createClass(ManifestForm, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var addResourcesOpen = this.props.addResourcesOpen;

      if (this.inputRef && this.inputRef.current && addResourcesOpen) {
        this.inputRef.current.focus();
      }
    }
    /**
     * Reset the form state
     */

  }, {
    key: "handleCancel",
    value: function handleCancel() {
      var onCancel = this.props.onCancel;
      onCancel();
      this.setState({
        formValue: ''
      });
    }
    /**
     * handleInputChange - sets state based on input change.
     * @param  {Event} event
     * @private
     */

  }, {
    key: "handleInputChange",
    value: function handleInputChange(event) {
      var that = this;
      event.preventDefault();
      that.setState({
        formValue: event.target.value
      });
    }
    /**
     * formSubmit - triggers manifest update and sets lastRequested
     * @param  {Event} event
     * @private
     */

  }, {
    key: "formSubmit",
    value: function formSubmit(event) {
      var _this$props = this.props,
          addResource = _this$props.addResource,
          onSubmit = _this$props.onSubmit;
      var formValue = this.state.formValue;
      event.preventDefault();
      onSubmit();
      addResource(formValue);
      this.setState({
        formValue: ''
      });
    }
    /**
     * render
     * @return {String} - HTML markup for the component
     */

  }, {
    key: "render",
    value: function render() {
      var formValue = this.state.formValue;
      var _this$props2 = this.props,
          classes = _this$props2.classes,
          onCancel = _this$props2.onCancel,
          t = _this$props2.t;
      return /*#__PURE__*/React.createElement("form", {
        onSubmit: this.formSubmit
      }, /*#__PURE__*/React.createElement(Grid, {
        container: true,
        spacing: 2
      }, /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 12,
        sm: 8,
        md: 9
      }, /*#__PURE__*/React.createElement(TextField, {
        inputRef: this.inputRef,
        fullWidth: true,
        value: formValue,
        id: "manifestURL",
        type: "text",
        onChange: this.handleInputChange,
        variant: "filled",
        label: t('addManifestUrl'),
        helperText: t('addManifestUrlHelp'),
        InputLabelProps: {
          shrink: true
        },
        InputProps: {
          className: classes.input
        }
      })), /*#__PURE__*/React.createElement(Grid, {
        item: true,
        xs: 12,
        sm: 4,
        md: 3,
        className: classes.buttons
      }, onCancel && /*#__PURE__*/React.createElement(Button, {
        onClick: this.handleCancel
      }, t('cancel')), /*#__PURE__*/React.createElement(Button, {
        id: "fetchBtn",
        type: "submit",
        variant: "contained",
        color: "primary"
      }, t('fetchManifest')))));
    }
  }]);

  return ManifestForm;
}(Component);
ManifestForm.defaultProps = {
  classes: {},
  onCancel: null,
  onSubmit: function onSubmit() {},
  t: function t(key) {
    return key;
  }
};