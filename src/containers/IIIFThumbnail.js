import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { IIIFThumbnail } from '../components/IIIFThumbnail';
import getThumbnail from '../lib/ThumbnailFactory';

/** */
function getLabel(resource) {
  return resource.getLabel().length > 0
    ? resource.getLabel().map(label => label.value)[0]
    : String(resource.index + 1);
}

/** */
const mapStateToProps = (state, {
  label, labelled, maxHeight, maxWidth, resource, thumbnail,
}) => ({
  image: thumbnail || getThumbnail(resource, { maxHeight, maxWidth }),
  label: labelled && (label || getLabel(resource)),
});

const enhance = compose(
  connect(mapStateToProps),
  withTranslation(),
  withPlugins('IIIFThumbnail'),
);

export default enhance(IIIFThumbnail);
