import React, { Component } from 'react';
import { compose } from 'redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 */
export class WorkspaceMenuButton extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  /**
   * @private
   */
  handleMenuClick() {
    const state = { ...this.state };
    this.setState(state);
  }

  /**
   * render
   * @return
   */
  render() {
    const { classes } = this.props;
    return (
      <ListItem>
        <IconButton
          color="primary"
          id="menuBtn"
          aria-label="Menu"
          className={classes.ctrlBtn}
          aria-haspopup="true"
          onClick={this.handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
      </ListItem>
    );
  }
}

WorkspaceMenuButton.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestListItem
 * @private
 */
const mapDispatchToProps = {};

/**
 * @private
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
});


const enhance = compose(
  connect(null, mapDispatchToProps),
  withStyles(styles),
  // further HOC go here
);

export default enhance(WorkspaceMenuButton);
