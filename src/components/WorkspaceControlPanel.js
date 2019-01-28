import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ConnectedManifestForm from './ManifestForm';
import ConnectedManifestListItem from './ManifestListItem';
import ConnectedWorkspaceControlPanelButtons from './WorkspaceControlPanelButtons';
import CSvgDots from './SvgDots';
import CSvgPlus from './SvgPlus';
import CSvgFrame from './SvgFrame';
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
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
  handleClick(event) {
    this.setState({
      anchorEl: event.currentTarget,
    });
  }

  /**
   * @private
   */
  handleClose() {
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
        handleClose={this.handleClose}
      />
    ));
    return (
      <Drawer
        className={classNames(classes.drawer, ns('workspace-control-panel'))}
        variant="permanent"
        classes={{ paper: classNames(classes.drawer) }}
        open
      >
        <Menu id="add-form" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <div className={ns('svg-plus')}>
            <CSvgPlus clickHandler={(e) => { console.log('TODO: a manifest selection possibility should appear'); }} />
          </div>
          <div className={ns('svg-dots')}>
            <CSvgDots clickHandler={(e) => { console.log('TODO: a menu should appear'); }} />
          </div>
          <div>
            <CSvgFrame />
          </div>
          <ConnectedManifestForm id="add-form" setLastRequested={this.setLastRequested} />
          <ul>{manifestList}</ul>
          {lastRequested}
        </Menu>

        <List>
          <Fab
            color="primary"
            id="addBtn"
            aria-label="Add"
            className={classes.fab}
            aria-owns={anchorEl ? 'add-form' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <AddIcon />
          </Fab>
          <ConnectedWorkspaceControlPanelButtons />
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
  fab: {
    margin: theme.spacing.unit,
  },
});


const enhance = compose(
  connect(mapStateToProps),
  withStyles(styles),
  // further HOC go here
);

export default enhance(WorkspaceControlPanel);
