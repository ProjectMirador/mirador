import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/** */
export class AudioViewer extends Component {
  /* eslint-disable jsx-a11y/media-has-caption */
  /** */
  render() {
    const {
      captions, classes, audioOptions, audioResources,
    } = this.props;

    return (
      <div className={classes.container}>
        <audio className={classes.audio} {...audioOptions}>
          {audioResources.map(audio => (
            <Fragment key={audio.id}>
              <source src={audio.id} type={audio.getFormat()} />
            </Fragment>
          ))}
          {captions.map(caption => (
            <Fragment key={caption.id}>
              <track src={caption.id} label={caption.getDefaultLabel()} srcLang={caption.getProperty('language')} />
            </Fragment>
          ))}
        </audio>
      </div>
    );
  }
  /* eslint-enable jsx-a11y/media-has-caption */
}

AudioViewer.propTypes = {
  audioOptions: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  audioResources: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  captions: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

AudioViewer.defaultProps = {
  audioOptions: {},
  audioResources: [],
  captions: [],
};
