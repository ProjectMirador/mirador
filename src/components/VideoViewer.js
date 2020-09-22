import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** */
export class VideoViewer extends Component {
  /* eslint-disable jsx-a11y/media-has-caption */
  /** */
  render() {
    const { classes, videoResources } = this.props;
    const video = videoResources && videoResources[0];
    if (!video) return <></>;

    return (
      <div className={classes.container}>
        <video controls className={classes.video}>
          <source src={video.id} type={video.getFormat()} />
        </video>
      </div>
    );
  }
  /* eslint-enable jsx-a11y/media-has-caption */
}

VideoViewer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  videoResources: PropTypes.arrayOf(PropTypes.object).isRequired,
};
