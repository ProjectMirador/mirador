import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SanitizedHtml from './SanitizedHtml';

/**
 * Renders label/value pair metadata in a dl
 * @prop {object} labelValuePair
 */
class LabelValueMetadata extends Component {
  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const { labelValuePairs } = this.props;

    if (labelValuePairs.length === 0) {
      return (<></>);
    }

    /* eslint-disable react/no-array-index-key */
    // Disabling array index key for dt/dd elements as
    // they are intended to display metadata that will not
    // need to be re-rendered internally in any meaningful way
    return (
      <dl>
        {labelValuePairs.reduce((acc, labelValuePair, i) => acc.concat([
          <dt key={`label-${i}`}>
            {labelValuePair.label}
          </dt>,
          <dd key={`value-${i}`}>
            <SanitizedHtml htmlString={labelValuePair.value} ruleSet="iiif" />
          </dd>,
        ]), [])}
      </dl>
    );
    /* eslint-enable react/no-array-index-key */
  }
}

LabelValueMetadata.propTypes = {
  labelValuePairs: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types,
};

export default LabelValueMetadata;
