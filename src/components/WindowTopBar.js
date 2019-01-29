import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import throttle from 'raf-throttle';
import { actions } from '../store';
import ConnectedWindowTopBarButtons from './WindowTopBarButtons';
import miradorWithPlugins from '../lib/miradorWithPlugins';
import ns from '../config/css-ns';

/**
  * handleDrag
  * @handleDrag
  * dispatches the action to update windowposition after
  * calculating inputs
  */
const handleDrag = throttle((event, windowId, updateWindowPosition) => {
  const x = event.clientX - 100;
  const y = event.clientY - 20;
  console.log(`${x}, ${x}`);
  console.log(event);
  updateWindowPosition(windowId, [x, y]);
});

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
    const {
      removeWindow,
      windowId,
      updateWindowPosition,
      classes,
    } = this.props;
    return (
      <AppBar
        draggable="true"
        onDragStart={(event) => {
          document.addEventListener('dragover', () => {
            // prevent default to allow drop
            event.preventDefault();
          }, false);

          const dragImg = new Image();
          dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
          event.dataTransfer.setDragImage(dragImg, 0, 0);
        }}
        onDrag={(event) => {
          event.persist();
          handleDrag(
            event,
            windowId,
            updateWindowPosition,
          );
        }}
        position="absolute"
      >
        <Toolbar disableGutters className={classNames(classes.reallyDense, ns('window-top-bar'))} variant="dense">
          <Typography variant="h3" noWrap color="inherit" className={classes.typographyBody}>
            {this.titleContent()}
          </Typography>
          <ConnectedWindowTopBarButtons windowId={windowId} />
          <Button color="inherit" className={ns('window-close')} aria-label="Close Window" onClick={() => removeWindow(windowId)}>&times;</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {
  removeWindow: actions.removeWindow,
  updateWindowPosition: actions.updateWindowPosition,
};

WindowTopBar.propTypes = {
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  removeWindow: PropTypes.func.isRequired,
  updateWindowPosition: PropTypes.func.isRequired,
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

const enhance = compose(
  connect(null, mapDispatchToProps),
  miradorWithPlugins,
  withStyles(styles),
  // further HOC go here
);

export default enhance(WindowTopBar);
