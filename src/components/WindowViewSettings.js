import { Component } from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import SingleIcon from '@mui/icons-material/CropOriginalSharp';
import ScrollViewIcon from '@mui/icons-material/ViewColumn';
import PropTypes from 'prop-types';
import BookViewIcon from './icons/BookViewIcon';
import GalleryViewIcon from './icons/GalleryViewIcon';

const ViewOption = styled(MenuItem, { name: 'WindowViewSettings', slot: 'option' })(({ selected, theme }) => ({
  '& .MuiFormControlLabel-label': {
    borderBottom: '2px solid transparent',
    ...(selected && {
      borderBottomColor: theme.palette.secondary.main,
    }),
  },
  backgroundColor: 'transparent !important',
  color: selected ? theme.palette.secondary.main : undefined,
  display: 'inline-block',
}));

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
      handleClose, t, windowViewType, viewTypes,
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
      <ViewOption
        selected={windowViewType === value}
        key={value}
        autoFocus={windowViewType === value}
        onClick={() => { this.handleChange(value); handleClose(); }}
      >
        <FormControlLabel
          value={value}
          control={<Icon fill="currentcolor" color={windowViewType === value ? 'secondary' : undefined} />}
          label={t(value)}
          labelPlacement="bottom"
        />
      </ViewOption>
    );

    if (viewTypes.length === 0) return null;
    return (
      <>
        <ListSubheader role="presentation" disableSticky tabIndex={-1}>{t('view')}</ListSubheader>
        { viewTypes.map(value => menuItem({ Icon: iconMap[value], value })) }
      </>
    );
  }
}

WindowViewSettings.propTypes = {
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
