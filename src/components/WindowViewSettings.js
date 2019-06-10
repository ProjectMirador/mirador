import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import SingleIcon from '@material-ui/icons/CropOriginalSharp';
import PropTypes from 'prop-types';
import BookViewIcon from './icons/BookViewIcon';
import GalleryViewIcon from './icons/GalleryViewIcon';

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
   * Take action when the component mounts for the first time
   */
  componentDidMount() {
    if (this.selectedRef) {
      // MUI uses ReactDOM.findDOMNode and refs for handling focus
      ReactDOM.findDOMNode(this.selectedRef).focus(); // eslint-disable-line react/no-find-dom-node
    }
  }

  /**
   * @private
   */
  handleSelectedRef(ref) {
    if (this.selectedRef) return;

    this.selectedRef = ref;
  }

  /**
   * @private
   */
  handleChange(event, value) {
    const { handleClose, windowId, setWindowViewType } = this.props;

    setWindowViewType(windowId, value);
    handleClose();
  }

  /**
   * render
   *
   * @return {type}  description
   */
  render() {
    const {
      classes, t, windowViewType,
    } = this.props;

    return (
      <>
        <ListSubheader role="presentation" disableSticky tabIndex="-1">{t('view')}</ListSubheader>

        <ToggleButtonGroup component="li" value={windowViewType} exclusive onChange={this.handleChange}>
          <ToggleButtonWithLabel classes={classes} t={t} value="single" control={<SingleIcon />} />
          <ToggleButtonWithLabel classes={classes} t={t} value="book" control={<BookViewIcon />} />
          <ToggleButtonWithLabel classes={classes} t={t} value="gallery" control={<GalleryViewIcon />} />
        </ToggleButtonGroup>
      </>
    );
  }
}


/** */
const ToggleButtonWithLabel = (props) => {
  const {
    classes, t, selected, value, control, ...other
  } = props;

  return (
    <ToggleButton
      value={value}
      className={
        clsx(
          classes.toggleButton,
          {
            [classes.selected]: selected,
          },
        )
      }
      {...other}
    >
      <FormControlLabel
        classes={{ label: classes.label }}
        control={React.cloneElement(control, { color: selected ? 'secondary' : undefined })}
        label={t(value)}
        labelPlacement="bottom"
      />
    </ToggleButton>
  );
};

ToggleButtonWithLabel.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  control: PropTypes.element.isRequired,
  selected: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

WindowViewSettings.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleClose: PropTypes.func,
  setWindowViewType: PropTypes.func.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
  windowViewType: PropTypes.string.isRequired,
};
WindowViewSettings.defaultProps = {
  handleClose: () => {},
  t: key => key,
};
