import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/** */
export class AudioViewer extends Component {
  /* eslint-disable jsx-a11y/media-has-caption */
  /** */
  render() {
    const { classes, audioResources } = this.props;

    return (
      <div className={classes.container}>
        <audio controls className={classes.audio}>
          {audioResources.map(audio => (
            <Fragment key={audio.id}>
              <source src={audio.id} type={audio.getFormat()} />
            </Fragment>
          ))}
        </audio>
      </div>
    );
  }
  /* eslint-enable jsx-a11y/media-has-caption */
}

AudioViewer.propTypes = {
  audioResources: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

AudioViewer.defaultProps = {
  audioResources: [],
};
