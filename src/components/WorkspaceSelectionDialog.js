import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Card,
  CardContent,
  MenuList,
  MenuItem,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import WorkspaceTypeElasticIcon from './icons/WorkspaceTypeElasticIcon';
import WorkspaceTypeMosaicIcon from './icons/WorkspaceTypeMosaicIcon';
import ScrollIndicatedDialogContent from '../containers/ScrollIndicatedDialogContent';

/**
 */
export class WorkspaceSelectionDialog extends Component {
  /**
   * Set the initial focus when the dialog enters
   * Find the selected item by using the current workspace type
   * in a selector on the value attribute (which we need to set)
  */
  static setInitialFocus(dialogElement, workspaceType) {
    const selectedListItem = dialogElement.querySelectorAll(`li[value="${workspaceType}"]`);
    if (!selectedListItem || selectedListItem.length === 0) return;

    selectedListItem[0].focus();
  }

  /**
   * constructor
   */
  constructor(props) {
    super(props);

    this.handleWorkspaceTypeChange = this.handleWorkspaceTypeChange.bind(this);
  }

  /**
   * Propagate workspace type selection into the global state
   */
  handleWorkspaceTypeChange(workspaceType) {
    const { handleClose, updateWorkspace } = this.props;
    updateWorkspace({
      type: workspaceType,
    });
    handleClose();
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      classes, container, handleClose, open, children, t, workspaceType,
    } = this.props;
    return (
      <Dialog
        aria-labelledby="workspace-selection-dialog-title"
        container={container}
        id="workspace-selection-dialog"
        onClose={handleClose}
        onEntered={dialog => WorkspaceSelectionDialog.setInitialFocus(dialog, workspaceType)}
        onEscapeKeyDown={handleClose}
        open={open}
      >
        <DialogTitle id="workspace-selection-dialog-title" disableTypography>
          <Typography variant="h2">{t('workspaceSelectionTitle')}</Typography>
        </DialogTitle>
        <ScrollIndicatedDialogContent>
          {children}
          <MenuList
            classes={{ root: classes.list }}
            selected={workspaceType}
          >
            <MenuItem
              className={classes.menuItem}
              onClick={() => this.handleWorkspaceTypeChange('elastic')}
              selected={workspaceType === 'elastic'}
              value="elastic"
            >
              <Card className={classes.card}>
                <WorkspaceTypeElasticIcon
                  className={classes.svgIcon}
                  viewBox="0 0 120 90"
                />
                <div className={classes.details}>
                  <CardContent
                    classes={{ root: classes.root }}
                    className={classes.content}
                  >
                    <Typography className={classes.headline} component="p" variant="h3">{t('elastic')}</Typography>
                    <Typography variant="body1">{t('elasticDescription')}</Typography>
                  </CardContent>
                </div>
              </Card>
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={() => this.handleWorkspaceTypeChange('mosaic')}
              selected={workspaceType === 'mosaic'}
              value="mosaic"
            >
              <Card className={classes.card}>
                <WorkspaceTypeMosaicIcon
                  className={classes.svgIcon}
                  viewBox="0 0 120 90"
                />
                <div className={classes.details}>
                  <CardContent
                    className={classes.content}
                    classes={{ root: classes.root }}
                  >
                    <Typography className={classes.headline} component="p" variant="h3">{t('mosaic')}</Typography>
                    <Typography variant="body1">{t('mosaicDescription')}</Typography>
                  </CardContent>
                </div>
              </Card>
            </MenuItem>
          </MenuList>
        </ScrollIndicatedDialogContent>
      </Dialog>
    );
  }
}

WorkspaceSelectionDialog.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  container: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  t: PropTypes.func,
  updateWorkspace: PropTypes.func.isRequired,
  workspaceType: PropTypes.string.isRequired,
};

WorkspaceSelectionDialog.defaultProps = {
  children: null,
  container: null,
  open: false,
  t: key => key,
};
