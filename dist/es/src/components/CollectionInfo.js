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
import Typography from '@material-ui/core/Typography';
import ViewListIcon from '@material-ui/icons/ViewListSharp';
import CollapsibleSection from '../containers/CollapsibleSection';
/**
 * ManifestInfo
 */

export var CollectionInfo = /*#__PURE__*/function (_Component) {
  _inherits(CollectionInfo, _Component);

  var _super = _createSuper(CollectionInfo);

  /** */
  function CollectionInfo(props) {
    var _this;

    _classCallCheck(this, CollectionInfo);

    _this = _super.call(this, props);
    _this.openCollectionDialog = _this.openCollectionDialog.bind(_assertThisInitialized(_this));
    return _this;
  }
  /** */


  _createClass(CollectionInfo, [{
    key: "openCollectionDialog",
    value: function openCollectionDialog() {
      var _this$props = this.props,
          collectionPath = _this$props.collectionPath,
          showCollectionDialog = _this$props.showCollectionDialog,
          windowId = _this$props.windowId;
      var manifestId = collectionPath[collectionPath.length - 1];
      showCollectionDialog(manifestId, collectionPath.slice(0, -1), windowId);
    }
    /**
     * render
     * @return
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          collectionLabel = _this$props2.collectionLabel,
          collectionPath = _this$props2.collectionPath,
          id = _this$props2.id,
          t = _this$props2.t;
      if (collectionPath.length === 0) return null;
      return /*#__PURE__*/React.createElement(CollapsibleSection, {
        id: "".concat(id, "-collection"),
        label: t('collection')
      }, collectionLabel && /*#__PURE__*/React.createElement(Typography, {
        "aria-labelledby": "".concat(id, "-resource ").concat(id, "-resource-heading"),
        id: "".concat(id, "-resource-heading"),
        variant: "h4"
      }, collectionLabel), /*#__PURE__*/React.createElement(Button, {
        color: "primary",
        onClick: this.openCollectionDialog,
        startIcon: /*#__PURE__*/React.createElement(ViewListIcon, null)
      }, t('showCollection')));
    }
  }]);

  return CollectionInfo;
}(Component);
CollectionInfo.defaultProps = {
  collectionLabel: null,
  collectionPath: [],
  t: function t(key) {
    return key;
  },
  windowId: null
};