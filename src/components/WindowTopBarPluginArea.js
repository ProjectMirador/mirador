import React, { Component } from 'react';
import { PluginHook } from './PluginHook';

/**
 *
 */
export class WindowTopBarPluginArea extends Component {
  /** */
  render() {
    return (
      <>
        <PluginHook {...this.props} />
      </>
    );
  }
}
