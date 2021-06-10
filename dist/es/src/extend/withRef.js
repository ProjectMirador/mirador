import React, { forwardRef } from 'react';
/** */

export var withRef = function withRef() {
  return function (Component) {
    var WithRefs = /*#__PURE__*/forwardRef(function (props, ref) {
      return /*#__PURE__*/React.createElement(Component, Object.assign({
        innerRef: ref
      }, props));
    });
    return WithRefs;
  };
};