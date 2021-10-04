import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import SingleIcon from '@material-ui/icons/CropOriginalSharp';
import ScrollViewIcon from '@material-ui/icons/ViewColumn';
import PropTypes from 'prop-types';
import BookViewIcon from './icons/BookViewIcon';
import GalleryViewIcon from './icons/GalleryViewIcon';
import ShiftBookViewIcon from './icons/ShiftBookViewIcon';

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
    const { setWindowViewType } = this.props;

    setWindowViewType(value);
  }

  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    const {
      classes, setShiftBookView, handleClose, shiftBookView, t, windowViewType, viewTypes,
    } = this.props;

    const iconMap = {
      book: BookViewIcon,
      gallery: GalleryViewIcon,
      scroll: ScrollViewIcon,
      single: SingleIcon,
    };

    /** Suspiciously similar to a component, yet if it is invoked through JSX
        none of the click handlers work? */
    const menuItem = ({ value, Icon }) => (
      <MenuItem
        key={value}
        className={classes.MenuItem}
        autoFocus={windowViewType === value}
        onClick={() => { this.handleChange(value); handleClose(); }}
      >
        <FormControlLabel
          value={value}
          classes={{ label: windowViewType === value ? classes.selectedLabel : classes.label }}
          control={<Icon color={windowViewType === value ? 'secondary' : undefined} />}
          label={t(value)}
          labelPlacement="bottom"
        />
      </MenuItem>
    );

    if (viewTypes.length === 0) return null;
    return (
      <>
        <ListSubheader role="presentation" disableSticky tabIndex="-1">{t('view')}</ListSubheader>
        { viewTypes.map(value => menuItem({ Icon: iconMap[value], value })) }
        {windowViewType === 'book' && (
          <>
            <ListSubheader role="presentation" disableSticky tabIndex="-1">{t('viewOptions')}</ListSubheader>
            <MenuItem
              onClick={() => setShiftBookView(!shiftBookView)}
            >
              <FormControlLabel
                classes={{
                  label: shiftBookView ? classes.selectedLabel : classes.label,
                  root: classes.shiftToggle,
                }}
                label={t('shiftPages')}
                control={(
                  <ShiftBookViewIcon
                    classes={{
                      fontSizeLarge: classes.shiftToggleIcon,
                    }}
                    color={shiftBookView ? 'secondary' : undefined}
                    fontSize="large"
                  />
                )}
              />
            </MenuItem>
          </>
        )}
      </>
    );
  }
}

WindowViewSettings.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleClose: PropTypes.func,
  setShiftBookView: PropTypes.func,
  setWindowViewType: PropTypes.func.isRequired,
  shiftBookView: PropTypes.bool,
  t: PropTypes.func,
  viewTypes: PropTypes.arrayOf(PropTypes.string),
  windowViewType: PropTypes.string.isRequired,
};
WindowViewSettings.defaultProps = {
  handleClose: () => {},
  setShiftBookView: () => {},
  shiftBookView: false,
  t: key => key,
  viewTypes: [],
};
