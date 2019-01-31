import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import ConnectedManifestForm from './ManifestForm';
import ConnectedManifestListItem from './ManifestListItem';

/**
 */
class WorkspaceAddButton extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      lastRequested: '',
      anchorEl: null,
    };

    this.handleAddManifestClick = this.handleAddManifestClick.bind(this);
    this.handleAddManifestClose = this.handleAddManifestClose.bind(this);
    this.setLastRequested = this.setLastRequested.bind(this);
  }

  /**
   * setLastRequested - Sets the state lastRequested
   *
   * @private
   */
  setLastRequested(requested) {
    this.setState({
      lastRequested: requested,
    });
  }

  /**
   * @private
   */
  handleAddManifestClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  /**
   * @private
   */
  handleAddManifestClose() {
    this.setState({
      anchorEl: null,
    });
  }

  /**
   * render
   * @return
   */
  render() {
    const { classes, manifests } = this.props;
    const { lastRequested, anchorEl } = this.state;

    const manifestList = Object.keys(manifests).map(manifest => (
      <ConnectedManifestListItem
        key={manifest}
        manifest={manifest}
        handleClose={this.handleAddManifestClose}
      />
    ));

    return (
      <ListItem>
        <Fab
          color="primary"
          id="addBtn"
          aria-label="Add"
          className={classes.fab}
          aria-owns={anchorEl ? 'add-form' : undefined}
          aria-haspopup="true"
          onClick={this.handleAddManifestClick}
        >
          <AddIcon />
        </Fab>
        <Menu
          id="ws-ctrl-pnl-mn"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleAddManifestClose}
        >
          <ConnectedManifestForm
            id="add-form"
            setLastRequested={this.setLastRequested}
          />
          <ul>{manifestList}</ul>
          {lastRequested}
        </Menu>
      </ListItem>
    );
  }
}

WorkspaceAddButton.propTypes = {
  manifests: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

/**
 * @private
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(WorkspaceAddButton);
