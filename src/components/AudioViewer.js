import React, { Component } from 'react';
import PropTypes from 'prop-types';

/** */
export class AudioViewer extends Component {
  /* eslint-disable jsx-a11y/media-has-caption */
  /** */
  render() {
    const { classes, audioResources } = this.props;
    const audio = audioResources && audioResources[0];
    if (!audio) return <></>;

    return (
      <div className={classes.container}>
        <audio controls className={classes.audio}>
          <source src={audio.id} type={audio.getFormat()} />
        </audio>
      </div>
    );
  }
  /* eslint-enable jsx-a11y/media-has-caption */
}

AudioViewer.propTypes = {
  audioResources: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
