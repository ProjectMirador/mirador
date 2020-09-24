import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/** */
export class VideoViewer extends Component {
  /* eslint-disable jsx-a11y/media-has-caption */
  /** */
  render() {
    const { captions, classes, videoResources } = this.props;
    return (
      <div className={classes.container}>
        <video controls className={classes.video}>
          {videoResources.map(video => (
            <Fragment key={video.id}>
              <source src={video.id} type={video.getFormat()} />
            </Fragment>
          ))}
          {captions.map(caption => (
            <Fragment key={caption.id}>
              <track src={caption.id} label={caption.getLabel()} srcLang={caption.getProperty('language')} />
            </Fragment>
          ))}
        </video>
      </div>
    );
  }
  /* eslint-enable jsx-a11y/media-has-caption */
}

VideoViewer.propTypes = {
  captions: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  videoResources: PropTypes.arrayOf(PropTypes.object),
};

VideoViewer.defaultProps = {
  captions: [],
  videoResources: [],
};
