import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import FrameIcon from '@material-ui/icons/CropFree';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import ConnectedManifestListItem from './ManifestListItem';
import ConnectedManifestForm from './ManifestForm';
import ns from '../config/css-ns';

/**
 * Provides the panel responsible for controlling the entire workspace
 */
class WorkspaceControlPanel extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      lastRequested: '',
      anchorEl: null,
    };

    this.setLastRequested = this.setLastRequested.bind(this);
    this.handleAddManifestClick = this.handleAddManifestClick.bind(this);
    this.handleAddManifestClose = this.handleAddManifestClose.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleCropClick = this.handleCropClick.bind(this);
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
  handleMenuClick() {
    const state = { ...this.state };
    this.setState(state);
  }

  /**
   * @private
   */
  handleCropClick() {
    const state = { ...this.state };
    this.setState(state);
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
   * @return {String} - HTML markup for the component
   */
  render() {
    const { manifests, classes } = this.props;
    const { lastRequested, anchorEl } = this.state;
    const manifestList = Object.keys(manifests).map(manifest => (
      <ConnectedManifestListItem
        key={manifest}
        manifest={manifest}
        handleClose={this.handleAddManifestClose}
      />
    ));
    return (
      <Drawer
        className={classNames(classes.drawer, ns('workspace-control-panel'))}
        variant="permanent"
        classes={{ paper: classNames(classes.drawer) }}
        open
      >
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
        <List>
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
          </ListItem>
          <Divider />
          <ListItem>
            <IconButton
              color="primary"
              id="menuBtn"
              aria-label="Menu"
              className={classNames(classes.ctrlBtn)}
              aria-haspopup="true"
              onClick={this.handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
          </ListItem>
          <ListItem>
            <IconButton
              color="primary"
              id="cropBtn"
              aria-label="Crop"
              className={classNames(classes.ctrlBtn)}
              aria-haspopup="true"
              onClick={this.handleCropClick}
            >
              <FrameIcon />
            </IconButton>
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

WorkspaceControlPanel.propTypes = {
  manifests: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceControlPanel
 * @private
 */
const mapStateToProps = state => (
  {
    manifests: state.manifests,
  }
);

/**
 * @private
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
});


const enhance = compose(
  connect(mapStateToProps),
  withStyles(styles),
  // further HOC go here
);

export default enhance(WorkspaceControlPanel);
