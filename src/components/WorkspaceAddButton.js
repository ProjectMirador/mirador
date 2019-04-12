import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
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
      classes, emptyWorkspace, t, setWorkspaceAddVisibility, isWorkspaceAddVisible,
    } = this.props;
    return (
      <Tooltip title={isWorkspaceAddVisible ? t('closeAddResourceMenu') : t('addResource')}>
        <Fab
          size="medium"
          color="secondary"
          id="addBtn"
          aria-label={isWorkspaceAddVisible ? t('closeAddResourceMenu') : t('addResource')}
          className={classes.fab}
          variant={!isWorkspaceAddVisible && emptyWorkspace ? 'extended' : null}
          onClick={() => { setWorkspaceAddVisibility(!isWorkspaceAddVisible); }}
        >
          {
            isWorkspaceAddVisible
              ? <CloseIcon />
              : <AddIcon />
          }
          { !isWorkspaceAddVisible && emptyWorkspace && <Typography color="inherit">{t('startHere')}</Typography> }
        </Fab>
      </Tooltip>
    );
  }
}

WorkspaceAddButton.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  emptyWorkspace: PropTypes.bool,
  isWorkspaceAddVisible: PropTypes.bool,
  setWorkspaceAddVisibility: PropTypes.func.isRequired,
  t: PropTypes.func,
};

WorkspaceAddButton.defaultProps = {
  emptyWorkspace: false,
  isWorkspaceAddVisible: false,
  t: key => key,
};
