import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import CollapsibleSection from '../containers/CollapsibleSection';
import SanitizedHtml from '../containers/SanitizedHtml';
import { LabelValueMetadata } from './LabelValueMetadata';
import { PluginHook } from './PluginHook';

/**
 * ManifestInfo
 */
export function ManifestInfo({
  manifestDescription = null, manifestLabel = null, manifestMetadata = [], manifestSummary = null, id, t = k => k,
}) {
  const pluginProps = {
    id, manifestDescription, manifestLabel, manifestMetadata, manifestSummary,
  };

  return (
    <CollapsibleSection
      id={`${id}-resource`}
      label={t('resource')}
    >
      {manifestLabel && (
        <Typography
          aria-labelledby={`${id}-resource ${id}-resource-heading`}
          id={`${id}-resource-heading`}
          variant="h4"
          component="h5"
        >
          {manifestLabel}
        </Typography>
      )}

      {manifestDescription && (
        <Typography variant="body1">
          <SanitizedHtml htmlString={manifestDescription} ruleSet="iiif" />
        </Typography>
      )}

      {manifestSummary && (
        <Typography variant="body1">
          <SanitizedHtml htmlString={manifestSummary} ruleSet="iiif" />
        </Typography>
      )}

      {manifestMetadata.length > 0 && (
        <LabelValueMetadata labelValuePairs={manifestMetadata} />
      )}

      <PluginHook {...pluginProps} />
    </CollapsibleSection>
  );
}

ManifestInfo.propTypes = {
  id: PropTypes.string.isRequired,
  manifestDescription: PropTypes.string,
  manifestLabel: PropTypes.string,
  manifestMetadata: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  manifestSummary: PropTypes.string,
  t: PropTypes.func,
};
