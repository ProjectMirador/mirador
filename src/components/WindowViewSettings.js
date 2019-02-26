import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import PhotoIcon from '@material-ui/icons/Photo';
import ViewAgendaIcon from '@material-ui/icons/ViewAgenda';
import PropTypes from 'prop-types';

/**
 *
 */
export class WindowViewSettings extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @private
   */
  handleChange(event) {
    const { windowId, setWindowViewType } = this.props;

    setWindowViewType(windowId, event.target.value);
  }

  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    const { windowViewType, t } = this.props;

    return (
      <>
        <Typography>{t('view')}</Typography>
        <RadioGroup aria-label={t('position')} name="position" value={windowViewType} onChange={this.handleChange} row>
          <FormControlLabel
            value="single"
            control={<Radio color="primary" icon={<PhotoIcon />} checkedIcon={<PhotoIcon />} />}
            label={t('single')}
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="book"
            control={<Radio color="primary" icon={<ViewAgendaIconRotated />} checkedIcon={<ViewAgendaIconRotated />} />}
            label={t('book')}
            labelPlacement="bottom"
          />
        </RadioGroup>
      </>
    );
  }
}

/**
 * @private
 */
function ViewAgendaIconRotated(props) {
  return (
    <ViewAgendaIcon style={{ transform: 'rotate(-90deg)' }} />
  );
}

WindowViewSettings.propTypes = {
  windowId: PropTypes.string.isRequired,
  setWindowViewType: PropTypes.func.isRequired,
  windowViewType: PropTypes.string.isRequired,
  t: PropTypes.func,
};
WindowViewSettings.defaultProps = {
  t: key => key,
};
