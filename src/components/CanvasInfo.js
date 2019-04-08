import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { SanitizedHtml } from './SanitizedHtml';
import { LabelValueMetadata } from './LabelValueMetadata';


/**
 * CanvasInfo
 */
export class CanvasInfo extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      canvasDescription,
      canvasLabel,
      canvasMetadata,
      id,
      t,
    } = this.props;

    return (
      <>
        {canvasLabel && (
          <>
            <Typography variant="overline" id={`${id}-currentItem`}>{t('currentItem')}</Typography>
            <Typography aria-labelledby={`${id}-currentItem`} variant="h4">
              {canvasLabel}
            </Typography>
          </>
        )}

        {canvasDescription && (
          <Typography variant="body1">
            <SanitizedHtml htmlString={canvasDescription} ruleSet="iiif" />
          </Typography>
        )}

        {canvasMetadata.length > 0 && (
          <LabelValueMetadata labelValuePairs={canvasMetadata} />
        )}
      </>
    );
  }
}

CanvasInfo.propTypes = {
  canvasDescription: PropTypes.string,
  canvasLabel: PropTypes.string,
  canvasMetadata: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.string.isRequired,
  t: PropTypes.func,
};

CanvasInfo.defaultProps = {
  canvasDescription: null,
  canvasLabel: null,
  canvasMetadata: [],
  t: key => key,
};
