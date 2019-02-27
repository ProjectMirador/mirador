import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Fab from '@material-ui/core/Fab';
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
      <ListItem>
        <Fab
          color="secondary"
          id="addBtn"
          aria-label={isWorkspaceAddVisible ? t('closeWindow') : t('add')}
          className={classes.fab}
          onClick={() => { setWorkspaceAddVisibility(!isWorkspaceAddVisible); }}
        >
          {
            isWorkspaceAddVisible
              ? <CloseIcon />
              : <AddIcon />
          }
        </Fab>
      </ListItem>
    );
  }
}

WorkspaceAddButton.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
  setWorkspaceAddVisibility: PropTypes.func.isRequired,
  isWorkspaceAddVisible: PropTypes.bool,
};

WorkspaceAddButton.defaultProps = {
  t: key => key,
  isWorkspaceAddVisible: false,
};
