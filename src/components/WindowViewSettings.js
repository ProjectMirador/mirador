import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import SingleIcon from '@material-ui/icons/CropOriginalSharp';
import PropTypes from 'prop-types';
import BookViewIcon from './icons/BookViewIcon';

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
  handleChange(value) {
    const { windowId, setWindowViewType } = this.props;

    setWindowViewType(windowId, value);
  }

  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    const {
      classes, handleClose, t, windowViewType,
    } = this.props;

    return (
      <>
        <ListSubheader role="presentation" tabIndex="-1">{t('view')}</ListSubheader>

        <MenuItem className={classes.MenuItem} onClick={() => { this.handleChange('single'); handleClose(); }}>
          <FormControlLabel
            value="single"
            classes={{ label: windowViewType === 'single' ? classes.selectedLabel : undefined }}
            control={<SingleIcon color={windowViewType === 'single' ? 'secondary' : undefined} />}
            label={t('single')}
            labelPlacement="bottom"
          />
        </MenuItem>
        <MenuItem className={classes.MenuItem} onClick={() => { this.handleChange('book'); handleClose(); }}>
          <FormControlLabel
            value="book"
            classes={{ label: windowViewType === 'book' ? classes.selectedLabel : undefined }}
            control={<BookViewIcon color={windowViewType === 'book' ? 'secondary' : undefined} />}
            label={t('book')}
            labelPlacement="bottom"
          />
        </MenuItem>
      </>
    );
  }
}

WindowViewSettings.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func,
  windowId: PropTypes.string.isRequired,
  setWindowViewType: PropTypes.func.isRequired,
  windowViewType: PropTypes.string.isRequired,
  t: PropTypes.func,
};
WindowViewSettings.defaultProps = {
  handleClose: () => {},
  t: key => key,
};
