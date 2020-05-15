import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import SingleIcon from '@material-ui/icons/CropOriginalSharp';
import ScrollViewIcon from '@material-ui/icons/ViewColumn';
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
      classes, handleClose, t, windowViewType, viewTypes,
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
        ref={windowViewType === value && (ref => this.handleSelectedRef(ref))}
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
      </>
    );
  }
}

WindowViewSettings.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleClose: PropTypes.func,
  setWindowViewType: PropTypes.func.isRequired,
  t: PropTypes.func,
  viewTypes: PropTypes.arrayOf(PropTypes.string),
  windowId: PropTypes.string.isRequired,
  windowViewType: PropTypes.string.isRequired,
};
WindowViewSettings.defaultProps = {
  handleClose: () => {},
  t: key => key,
  viewTypes: [],
};
