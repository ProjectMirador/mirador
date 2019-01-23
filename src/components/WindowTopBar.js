import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../store';
import ConnectedWindowTopBarButtons from './WindowTopBarButtons';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import ns from '../config/css-ns';

/**
 * WindowTopBar
 */
export class WindowTopBar extends Component {
  /**
   * titleContent
   *
   * @return {String}
   */
  titleContent() {
    const { manifest } = this.props;
    if (manifest && manifest.manifestation) {
      return manifest.manifestation.getLabel().map(label => label.value)[0];
    }
    return '';
  }

  /**
   * render
   * @return
   */
  render() {
    const { removeWindow, windowId } = this.props;
    return (
      <div className={ns('window-top-bar')}>
        <h3>{this.titleContent()}</h3>
        <ConnectedWindowTopBarButtons windowId={windowId} />
        <button type="button" className={ns('window-close')} aria-label="Close Window" onClick={() => removeWindow(windowId)}>&times;</button>
      </div>
    );
  }
}

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = { removeWindow: actions.removeWindow };

WindowTopBar.propTypes = {
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  removeWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

WindowTopBar.defaultProps = {
  manifest: null,
};

const enhance = compose(
  connect(null, mapDispatchToProps),
  miradorWithPlugins,
  // further HOC go here
);

export default enhance(WindowTopBar);
