import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { IIIFResourceLabel } from './IIIFResourceLabel';

const Label = styled('span', { name: 'ThumbnailLabel', slot: 'root' })(({ theme }) => ({
  ...theme.typography.caption,
}));

/**
 * A caption for a thumbnail, falling back to the resource's IIIF label when no explicit label is given.
 */
export function ThumbnailLabel({ label = undefined, resource, variant = undefined }) {
  return <Label ownerState={{ variant }}>{label || <IIIFResourceLabel resource={resource} />}</Label>;
}

ThumbnailLabel.propTypes = {
  label: PropTypes.string,
  resource: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(['gallery', 'navigation']),
};
