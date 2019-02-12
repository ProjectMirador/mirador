import React from 'react';
import ns from '../config/css-ns';

/**
 * CompanionWindow
 * @returns {*}
 * @constructor
 */
function CompanionWindow() {
  return (
    <div className={ns('window-companion-side')} style={{ display: 'none' }} />
  );
}


export default CompanionWindow;
