import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/AddSharp';
import CloseIcon from '@material-ui/icons/CloseSharp';

/**
 */
export class WorkspaceAddButton extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      classes, t, setWorkspaceAddVisibility, isWorkspaceAddVisible,
    } = this.props;
    return (
      <Tooltip title={isWorkspaceAddVisible ? t('closeAddResourceMenu') : t('addResource')}>
        <Fab
          size="medium"
          color="secondary"
          id="addBtn"
          aria-label={isWorkspaceAddVisible ? t('closeAddResourceMenu') : t('addResource')}
          className={classes.fab}
          onClick={() => { setWorkspaceAddVisibility(!isWorkspaceAddVisible); }}
        >
          {
            isWorkspaceAddVisible
              ? <CloseIcon />
              : <AddIcon />
          }
        </Fab>
      </Tooltip>
    );
  }
}

WorkspaceAddButton.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isWorkspaceAddVisible: PropTypes.bool,
  setWorkspaceAddVisibility: PropTypes.func.isRequired,
  t: PropTypes.func,
};

WorkspaceAddButton.defaultProps = {
  isWorkspaceAddVisible: false,
  t: key => key,
};
