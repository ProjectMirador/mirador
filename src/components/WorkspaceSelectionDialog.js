import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { List, ListItem, ListItemText } from '@material-ui/core';
import PropTypes from 'prop-types';

/**
 */
export class WorkspaceSelectionDialog extends Component {
  /**
   * Propagate workspace type selection into the global state
   */
  handleworkspaceTypeChange(workspaceType) {
    const { handleClose, updateConfig } = this.props;

    updateConfig({
      workspace: {
        type: workspaceType,
      },
    });
    handleClose();
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      classes, container, handleClose, open, children, t,
    } = this.props;
    return (
      <Dialog
        aria-labelledby="workspace-selection-dialog-title"
        container={container}
        id="workspace-settings"
        onClose={handleClose}
        open={open}
      >
        <DialogTitle id="workspace-selection-dialog-title">{t('workspaceSelectionTitle')}</DialogTitle>
        <DialogContent>
          {children}
          <List>
            <ListItem
              className={classes.listItem}
              onClick={() => this.handleworkspaceTypeChange('elastic')}
            >
              <img src="/src/images/elastic.jpg" alt={t('elastic')} />
              <ListItemText
                primary={t('elastic')}
                secondary={t('elasticDescription')}
              />
            </ListItem>
            <ListItem
              className={classes.listItem}
              onClick={() => this.handleworkspaceTypeChange('mosaic')}
            >
              <img src="/src/images/mosaic.jpg" alt={t('mosaic')} />
              <ListItemText
                primary={t('mosaic')}
                secondary={t('mosaicDescription')}
              />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    );
  }
}

WorkspaceSelectionDialog.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  container: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
  updateConfig: PropTypes.func.isRequired,
};

WorkspaceSelectionDialog.defaultProps = {
  children: null,
  container: null,
  open: false,
  t: key => key,
};
