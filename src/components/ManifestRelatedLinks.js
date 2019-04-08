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
      homepage,
      manifestUrl,
      renderings,
      seeAlso,
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
          { homepage && (
            <>
              <Typography variant="subtitle2" component="dt">{t('iiif_homepage')}</Typography>
              {
                homepage.map(page => (
                  <Typography key={page.value} variant="body1" component="dd">
                    <a target="_blank" rel="noopener noreferrer" href={page.value}>{page.label || page.value}</a>
                  </Typography>
                ))
              }
            </>
          )}
          { renderings && renderings.length > 0 && (
            <>
              <Typography variant="subtitle2" component="dt">{t('iiif_renderings')}</Typography>
              {
                renderings.map(rendering => (
                  <Typography key={rendering.value} variant="body1" component="dd">
                    <a target="_blank" rel="noopener noreferrer" href={rendering.value}>{rendering.label || rendering.value}</a>
                  </Typography>
                ))
              }
            </>
          )}
          { seeAlso && (
            <>
              <Typography variant="subtitle2" component="dt">{t('iiif_seeAlso')}</Typography>
              {
                seeAlso.map(related => (
                  <Typography key={related.value} variant="body1" component="dd">
                    <a target="_blank" rel="noopener noreferrer" href={related.value}>{related.label || related.value}</a>
                    { related.format && (
                      <Typography variant="body2" component="span">{`(${related.format})`}</Typography>
                    )}
                  </Typography>
                ))
              }
            </>
          )}
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
  homepage: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  id: PropTypes.string.isRequired,
  manifestUrl: PropTypes.string,
  renderings: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  seeAlso: PropTypes.arrayOf(PropTypes.shape({
    format: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  t: PropTypes.func,
};

ManifestRelatedLinks.defaultProps = {
  homepage: null,
  manifestUrl: null,
  renderings: null,
  seeAlso: null,
  t: key => key,
};
