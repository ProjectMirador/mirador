import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ns from '../config/css-ns';

/**
 * WindowSideBarInfoPanel
 */
class WindowSideBarInfoPanel extends Component {
  /**
   * manifestLabel - get the label from the manifesto manifestation
   * @return String
   */
  manifestLabel() {
    const { manifest } = this.props;

    if (manifest.manifestation) {
      return manifest.manifestation.getLabel().map(label => label.value)[0];
    }
    return '';
  }

  /**
   * manifestDescription - get the description from the manifesto manifestation
   * @return String
   */
  manifestDescription() {
    const { manifest } = this.props;

    if (manifest.manifestation) {
      return manifest.manifestation.getDescription().map(label => label.value);
    }
    return '';
  }

  /**
   * render
   * @return
   */
  render() {
    const { classes, t } = this.props;
    return (
      <div className={ns('window-sidebar-info-panel')}>
        <Typography variant="h2" className={classes.windowSideBarH2}>{t('aboutThisItem')}</Typography>
        <Typography variant="h3" className={classes.windowSideBarH3}>{this.manifestLabel()}</Typography>
        <Typography variant="body2">{this.manifestDescription()}</Typography>
      </div>
    );
  }
}

WindowSideBarInfoPanel.propTypes = {
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  manifest: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};


WindowSideBarInfoPanel.defaultProps = {
  classes: {},
  manifest: {},
  t: key => key,
};

/**
 * @private
 */
const styles = theme => ({
  windowSideBarH2: theme.typography.h5,
  windowSideBarH3: theme.typography.h6,
});

export default withStyles(styles)(WindowSideBarInfoPanel);
