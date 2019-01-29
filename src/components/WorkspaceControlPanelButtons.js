import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import miradorWithPlugins from '../lib/miradorWithPlugins';
/**
 *
 */
export class WorkspaceControlPanelButtons extends Component {
  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }
}

WorkspaceControlPanelButtons.propTypes = {
  children: PropTypes.node,
};

WorkspaceControlPanelButtons.defaultProps = {
  children: null,
};

export default miradorWithPlugins(WorkspaceControlPanelButtons);
