import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { CanvasThumbnail } from './CanvasThumbnail';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import CompanionWindow from '../containers/CompanionWindow';

/**
 * a panel showing the manifests for a given collection
 */
export class WindowSideBarCollectionPanel extends Component {
  /** */

  /**
   * render
   */
  render() {
    const {
      t, windowId, id,
    } = this.props;

    return (
      <CompanionWindow
        title={t('canvasIndex')}
        id={id}
        windowId={windowId}
        titleControls={null}
      >
        collection
      </CompanionWindow>
    );
  }
}

WindowSideBarCollectionPanel.propTypes = {
  id: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarCollectionPanel.defaultProps = {

};
