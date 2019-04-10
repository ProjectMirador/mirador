import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CollapsibleSection from '../containers/CollapsibleSection';
import { SanitizedHtml } from './SanitizedHtml';
import { LabelValueMetadata } from './LabelValueMetadata';


/**
 * ManifestInfo
 */
export class ManifestInfo extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      manifestDescription,
      manifestLabel,
      manifestMetadata,
      id,
      t,
    } = this.props;

    return (
      <CollapsibleSection
        id={`${id}-resource`}
        label={t('resource')}
      >
        {manifestLabel && (
          <Typography aria-labelledby={`${id}-resource`} variant="h4">
            {manifestLabel}
          </Typography>
        )}

        {manifestDescription && (
          <Typography variant="body1">
            <SanitizedHtml htmlString={manifestDescription} ruleSet="iiif" />
          </Typography>
        )}

        {manifestMetadata.length > 0 && (
          <LabelValueMetadata labelValuePairs={manifestMetadata} />
        )}
      </CollapsibleSection>
    );
  }
}

ManifestInfo.propTypes = {
  id: PropTypes.string.isRequired,
  manifestDescription: PropTypes.string,
  manifestLabel: PropTypes.string,
  manifestMetadata: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
};

ManifestInfo.defaultProps = {
  manifestDescription: null,
  manifestLabel: null,
  manifestMetadata: [],
  t: key => key,
};
