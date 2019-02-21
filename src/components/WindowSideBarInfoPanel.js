import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import LabelValueMetadata from './LabelValueMetadata';
import SanitizedHtml from './SanitizedHtml';
import ns from '../config/css-ns';


/**
 * WindowSideBarInfoPanel
 */
class WindowSideBarInfoPanel extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      canvasDescription,
      canvasLabel,
      canvasMetadata,
      classes,
      manifestDescription,
      manifestLabel,
      manifestMetadata,
      t,
    } = this.props;

    return (
      <div className={ns('window-sidebar-info-panel')}>

        <Typography variant="h2" className={classes.windowSideBarH2}>
          {t('aboutThisItem')}
        </Typography>

        {canvasLabel && (
          <Typography variant="h3" className={classes.windowSideBarH3}>
            {canvasLabel}
          </Typography>
        )}

        {canvasDescription && (
          <Typography variant="body2">
            <SanitizedHtml htmlString={canvasDescription} ruleSet="iiif" />
          </Typography>
        )}

        {canvasMetadata.length > 0 && (
          <Typography variant="body2">
            <LabelValueMetadata labelValuePairs={canvasMetadata} />
          </Typography>
        )}

        <Divider />

        {manifestLabel && (
          <Typography variant="h3" className={classes.windowSideBarH3}>
            {manifestLabel}
          </Typography>
        )}

        {manifestDescription && (
          <Typography variant="body2">
            <SanitizedHtml htmlString={manifestDescription} ruleSet="iiif" />
          </Typography>
        )}

        {manifestMetadata.length > 0 && (
          <Typography variant="body2">
            <LabelValueMetadata labelValuePairs={manifestMetadata} />
          </Typography>
        )}

      </div>
    );
  }
}

WindowSideBarInfoPanel.propTypes = {
  canvasDescription: PropTypes.string,
  canvasLabel: PropTypes.string,
  canvasMetadata: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  manifestLabel: PropTypes.string,
  manifestDescription: PropTypes.string,
  manifestMetadata: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

WindowSideBarInfoPanel.defaultProps = {
  canvasDescription: null,
  canvasLabel: null,
  canvasMetadata: [],
  classes: {},
  manifestLabel: null,
  manifestDescription: null,
  manifestMetadata: [],
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
