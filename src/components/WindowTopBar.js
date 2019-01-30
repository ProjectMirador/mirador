import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import ConnectedWindowTopBarButtons from './WindowTopBarButtons';
import ns from '../config/css-ns';

/**
 * WindowTopBar
 */
class WindowTopBar extends Component {
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
    const { removeWindow, windowId, classes } = this.props;
    return (
      <Toolbar disableGutters className={classNames(classes.reallyDense, ns('window-top-bar'))} variant="dense">
        <Typography variant="h3" noWrap color="inherit" className={classes.typographyBody}>
          {this.titleContent()}
        </Typography>
        <ConnectedWindowTopBarButtons windowId={windowId} />
        <Button color="inherit" className={ns('window-close')} aria-label="Close Window" onClick={() => removeWindow(windowId)}>&times;</Button>
      </Toolbar>
    );
  }
}

WindowTopBar.propTypes = {
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  removeWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

WindowTopBar.defaultProps = {
  manifest: null,
};

const styles = {
  typographyBody: {
    flexGrow: 1,
    fontSize: '1em',
  },
  reallyDense: {
    minHeight: 32,
    paddingLeft: 4,
  },
};

export default withStyles(styles)(WindowTopBar);
