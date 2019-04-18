import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import WorkspaceTypeElasticIcon from './icons/WorkspaceTypeElasticIcon';
import WorkspaceTypeMosaicIcon from './icons/WorkspaceTypeMosaicIcon';

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
          <List className={classes.list}>
            <ListItem
              button
              className={classes.listItem}
              component="li"
              onClick={() => this.handleworkspaceTypeChange('elastic')}
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
            </ListItem>
            <ListItem
              button
              className={classes.listItem}
              component="li"
              onClick={() => this.handleworkspaceTypeChange('mosaic')}
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
            </ListItem>
          </List>
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
