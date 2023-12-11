import { Component } from 'react';
import PropTypes from 'prop-types';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/AddSharp';
import CloseIcon from '@mui/icons-material/CloseSharp';
import { styled } from '@mui/material/styles';

const Root = styled(Fab, { name: 'WorkspaceAddButton', slot: 'root' })(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

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
        <Root
          size="medium"
          color="primary"
          id="addBtn"
          aria-label={
            isWorkspaceAddVisible
              ? t('closeAddResourceMenu')
              : ((useExtendedFab && t('startHere')) || t('addResource'))
          }
          variant={useExtendedFab ? 'extended' : 'circular'}
          onClick={() => { setWorkspaceAddVisibility(!isWorkspaceAddVisible); }}
        >
          {
            isWorkspaceAddVisible
              ? <CloseIcon />
              : <AddIcon />
          }
          { useExtendedFab && t('startHere') }
        </Root>
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
