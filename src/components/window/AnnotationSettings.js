import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

/**
 * AnnotationSettings is a component to handle various annotation
 * display settings in the Annotation companion window
*/
export class AnnotationSettings extends Component {
  /**
   * Returns the rendered component
  */
  render() {
    const {
      displayAll, displayAllDisabled, t, toggleAnnotationDisplay,
    } = this.props;

    return (
      <FormControlLabel
        control={(
          <Switch
            checked={displayAll}
            disabled={displayAllDisabled}
            onChange={toggleAnnotationDisplay}
            value={displayAll ? 'all' : 'select'}
          />
        )}
        label={t('displayAllAnnotations')}
        labelPlacement="start"
      />
    );
  }
}

AnnotationSettings.propTypes = {
  displayAll: PropTypes.bool.isRequired,
  displayAllDisabled: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  toggleAnnotationDisplay: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
};
