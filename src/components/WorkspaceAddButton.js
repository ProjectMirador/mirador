import { Component } from 'react';
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/AddSharp';
import CloseIcon from '@mui/icons-material/CloseSharp';

/**
 */
export class WorkspaceAddButton extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      t, setWorkspaceAddVisibility, isWorkspaceAddVisible, useExtendedFab,
    } = this.props;
    return (
      <Tooltip title={isWorkspaceAddVisible ? t('closeAddResourceMenu') : t('addResource')}>
        <Fab
          size="medium"
          color="primary"
          id="addBtn"
          disableRipple
          aria-label={
            isWorkspaceAddVisible
              ? t('closeAddResourceMenu')
              : ((useExtendedFab && t('startHere')) || t('addResource'))
          }
          sx={{
            '&:focus': {
              backgroundColor: 'primary.dark',
            },
            margin: 1,
          }}
          variant={useExtendedFab ? 'extended' : 'circular'}
          onClick={() => { setWorkspaceAddVisibility(!isWorkspaceAddVisible); }}
        >
          {
            isWorkspaceAddVisible
              ? <CloseIcon />
              : <AddIcon />
          }
          { useExtendedFab && t('startHere') }
        </Fab>
      </Tooltip>
    );
  }
}

WorkspaceAddButton.propTypes = {
  isWorkspaceAddVisible: PropTypes.bool,
  setWorkspaceAddVisibility: PropTypes.func.isRequired,
  t: PropTypes.func,
  useExtendedFab: PropTypes.bool.isRequired,
};

WorkspaceAddButton.defaultProps = {
  isWorkspaceAddVisible: false,
  t: key => key,
};
