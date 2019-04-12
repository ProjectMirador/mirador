import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { SanitizedHtml } from './SanitizedHtml';
import ns from '../config/css-ns';


/**
 * Renders label/value pair metadata in a dl
 * @prop {object} labelValuePair
 */
export class LabelValueMetadata extends Component {
  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const { defaultLabel, labelValuePairs } = this.props;

    if (labelValuePairs.length === 0) {
      return (<></>);
    }

    /* eslint-disable react/no-array-index-key */
    // Disabling array index key for dt/dd elements as
    // they are intended to display metadata that will not
    // need to be re-rendered internally in any meaningful way
    return (
      <dl className={ns('label-value-metadata')}>
        {labelValuePairs.reduce((acc, labelValuePair, i) => acc.concat([
          <Typography component="dt" key={`label-${i}`} variant="subtitle2">{labelValuePair.label || defaultLabel}</Typography>,
          <Typography component="dd" key={`value-${i}`} variant="body1">
            <SanitizedHtml htmlString={labelValuePair.value} ruleSet="iiif" />
          </Typography>,
        ]), [])}
      </dl>
    );
    /* eslint-enable react/no-array-index-key */
  }
}

LabelValueMetadata.propTypes = {
  defaultLabel: PropTypes.string,
  labelValuePairs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
};

LabelValueMetadata.defaultProps = {
  defaultLabel: undefined,
};
