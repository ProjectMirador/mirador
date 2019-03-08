import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { SanitizedHtml } from './SanitizedHtml';
import { LabelValueMetadata } from './LabelValueMetadata';
import CompanionWindow from '../containers/CompanionWindow';
import ns from '../config/css-ns';


/**
 * WindowSideBarInfoPanel
 */
export class WindowSideBarInfoPanel extends Component {
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
      windowId,
      id,
      t,
    } = this.props;

    return (
      <CompanionWindow title={t('aboutThisItem')} paperClassName={ns('window-sidebar-info-panel')} windowId={windowId} id={id}>
        {canvasLabel && (
          <>
            <Typography variant="overline" id={`${id}-currentItem`}>{t('currentItem')}</Typography>
            <Typography aria-labelledby={`${id}-currentItem`} variant="h4" className={classes.windowSideBarHeading}>
              {canvasLabel}
            </Typography>
          </>
        )}

        {canvasDescription && (
          <Typography variant="body2">
            <SanitizedHtml htmlString={canvasDescription} ruleSet="iiif" />
          </Typography>
        )}

        {canvasMetadata.length > 0 && (
          <LabelValueMetadata labelValuePairs={canvasMetadata} />
        )}

        <Divider />

        {manifestLabel && (
          <>
            <Typography variant="overline" id={`${id}-resource`} component="p" className={classes.sectionHeading}>{t('resource')}</Typography>
            <Typography aria-labelledby={`${id}-resource`} variant="h4" className={classes.windowSideBarHeading}>
              {manifestLabel}
            </Typography>
          </>
        )}

        {manifestDescription && (
          <Typography variant="body2">
            <SanitizedHtml htmlString={manifestDescription} ruleSet="iiif" />
          </Typography>
        )}

        {manifestMetadata.length > 0 && (
          <LabelValueMetadata labelValuePairs={manifestMetadata} />
        )}

      </CompanionWindow>
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
  windowId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
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
