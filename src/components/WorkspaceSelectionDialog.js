import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { keys, chars } from '../lib/KeyHelper';

/**
 */
export class WorkspaceSelectionDialog extends Component {
  /** */
  constructor(props) {
    super(props);
    const { workspaceType } = this.props;
    this.state = {
      selected: workspaceType,
    };

    this.selectPreviousItem = this.selectPreviousItem.bind(this);
    this.selectNextItem = this.selectNextItem.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.workspaceTypes = ['elastic', 'mosaic'];
  }

  /**
   * Propagate workspace type selection into the global state
   */
  handleworkspaceTypeChange(workspaceType) {
    const { handleClose, updateConfig } = this.props;
    this.setState({ selected: workspaceType });
    updateConfig({
      workspace: {
        type: workspaceType,
      },
    });
    handleClose();
  }

  /** */
  selectPreviousItem() {
    const { selected } = this.state;
    const selectedIndex = this.workspaceTypes.indexOf(selected);
    const newIndex = selectedIndex > 0 ? selectedIndex - 1 : this.workspaceTypes.length - 1;
    this.setState({ selected: this.workspaceTypes[newIndex] });
  }

  /** */
  selectNextItem() {
    const { selected } = this.state;
    const selectedIndex = this.workspaceTypes.indexOf(selected);
    const newIndex = selectedIndex + 1 < this.workspaceTypes.length ? selectedIndex + 1 : 0;
    this.setState({ selected: this.workspaceTypes[newIndex] });
  }

  /** */
  keyDownHandler(event) {
    const { handleClose } = this.props;
    if (event.key === keys.up || event.which === chars.up) {
      event.preventDefault();
      return this.selectPreviousItem(event.target);
    }
    if (event.key === keys.down || event.which === chars.down) {
      event.preventDefault();
      return this.selectNextItem(event.target);
    }
    if (event.key === keys.enter || event.which === chars.enter) {
      event.preventDefault();
      const { selected } = this.state;
      this.handleworkspaceTypeChange(selected);
    }
    if (event.key === keys.esc || event.which === chars.esc) {
      event.preventDefault();
      handleClose();
    }
    return event;
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      classes, container, open, children, t,
    } = this.props;
    return (
      <Dialog
        aria-labelledby="workspace-selection-dialog-title"
        container={container}
        id="workspace-settings"
        onKeyDown={event => this.keyDownHandler(event)}
        open={open}
      >
        <DialogTitle id="workspace-selection-dialog-title" disableTypography>
          <Typography variant="h2">{t('workspaceSelectionTitle')}</Typography>
        </DialogTitle>
        <DialogContent>
          {children}
          <List>
            <ListItem
              className={classes.listItem}
              key="elastic"
              onClick={() => this.handleworkspaceTypeChange('elastic')}
              // eslint-disable-next-line react/destructuring-assignment
              selected={this.state.selected === 'elastic'}
            >
              <img src="/src/images/elastic.jpg" alt={t('elastic')} />
              <ListItemText
                primaryTypographyProps={{ variant: 'h3' }}
                secondaryTypographyProps={{ color: 'default', variant: 'body1' }}
                primary={t('elastic')}
                secondary={t('elasticDescription')}
              />
            </ListItem>
            <ListItem
              className={classes.listItem}
              key="mosaic"
              onClick={() => this.handleworkspaceTypeChange('mosaic')}
              // eslint-disable-next-line react/destructuring-assignment
              selected={this.state.selected === 'mosaic'}
            >
              <img src="/src/images/mosaic.jpg" alt={t('mosaic')} />
              <ListItemText
                primaryTypographyProps={{ variant: 'h3' }}
                secondaryTypographyProps={{ color: 'default', variant: 'body1' }}
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
