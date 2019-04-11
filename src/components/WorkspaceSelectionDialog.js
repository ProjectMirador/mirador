import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Card,
  CardContent,
  CardMedia,
  ListItem,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { ListKeyboardNavigation } from '../lib/ListKeyboardNavigation';

/**
 */
export class WorkspaceSelectionDialog extends Component {
  /**
   * constructor
   */
  constructor(props) {
    super(props);

    this.handleworkspaceTypeChange = this.handleworkspaceTypeChange.bind(this);
  }

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
      classes, container, handleClose, open, children, t, workspaceType,
    } = this.props;
    return (
      <Dialog
        aria-labelledby="workspace-selection-dialog-title"
        container={container}
        id="workspace-selection-dialog"
        onClose={handleClose}
        onEscapeKeyDown={handleClose}
        open={open}
      >
        <DialogTitle id="workspace-selection-dialog-title" disableTypography>
          <Typography variant="h2">{t('workspaceSelectionTitle')}</Typography>
        </DialogTitle>
        <DialogContent>
          {children}
          <ListKeyboardNavigation
            className={classes.list}
            onChange={this.handleworkspaceTypeChange}
            selected={workspaceType}
          >
            <ListItem
              className={classes.listItem}
              value="elastic"
            >
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="/src/images/icon_workspace_elastic.svg"
                  title={t('elastic')}
                />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="p" variant="h3">{t('elastic')}</Typography>
                    <Typography variant="body1">{t('elasticDescription')}</Typography>
                  </CardContent>
                </div>
              </Card>
            </ListItem>
            <ListItem
              className={classes.listItem}
              value="mosaic"
            >
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="/src/images/icon_workspace_mosaic.svg"
                  title={t('mosaic')}
                />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="p" variant="h3">{t('mosaic')}</Typography>
                    <Typography variant="body1">{t('mosaicDescription')}</Typography>
                  </CardContent>
                </div>
              </Card>
            </ListItem>
          </ListKeyboardNavigation>
        </DialogContent>
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
  updateConfig: PropTypes.func.isRequired,
  workspaceType: PropTypes.string.isRequired,
};

WorkspaceSelectionDialog.defaultProps = {
  children: null,
  container: null,
  open: false,
  t: key => key,
};
