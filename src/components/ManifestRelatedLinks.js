import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ns from '../config/css-ns';


/**
 * ManifestRelatedLinks
 */
export class ManifestRelatedLinks extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      manifestUrl,
      id,
      t,
    } = this.props;

    return (
      <>
        <Typography variant="overline" id={`${id}-related`}>{t('related')}</Typography>
        <Typography aria-labelledby={`${id}-related`} variant="h4">
          {t('links')}
        </Typography>
        <dl className={ns('label-value-metadata')}>
          { manifestUrl && (
            <>
              <Typography variant="subtitle2" component="dt">{t('iiif_manifest')}</Typography>
              <Typography variant="body1" component="dd">
                <a target="_blank" rel="noopener noreferrer" href={manifestUrl}>{manifestUrl}</a>
              </Typography>
            </>
          )}
        </dl>
      </>
    );
  }
}

ManifestRelatedLinks.propTypes = {
  id: PropTypes.string.isRequired,
  manifestUrl: PropTypes.string,
  t: PropTypes.func,
};

ManifestRelatedLinks.defaultProps = {
  manifestUrl: null,
  t: key => key,
};
