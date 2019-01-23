import React, { Component } from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Display from './Display';
import ConnectedManifestForm from './ManifestForm';
import ConnectedManifestListItem from './ManifestListItem';
import SvgAddManifestButton from './SvgAddButton';
import ns from '../config/css-ns';
import SvgMenuDots from './SvgMenuDotsVertical';
import SvgFrameButton from './SvgFrame';

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
    };

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
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const { manifests } = this.props;
    const { lastRequested } = this.state;
    const manifestList = Object.keys(manifests).map(manifest => (
      <ConnectedManifestListItem
        key={manifest}
        manifest={manifest}
      />
    ));
    return (
      <div className={ns('workspace-control-panel')}>
        <span className={ns('plus-button')}>
          <SvgAddManifestButton clickHandler={(e) => { console.log('TODO: a manifest selection possibility should appear'); }} />
        </span>
        <br />
        <br />
        <span className={ns('menu-dots')}>
          <SvgMenuDots clickHandler={(e) => { console.log('TODO: a menu should appear'); }} />
        </span>
        <br />
        <span>
          <SvgFrameButton />
        </span>


        <ConnectedManifestForm setLastRequested={this.setLastRequested} />
        <ul>{manifestList}</ul>

        <Display
          manifest={manifests[lastRequested]}
        />
      </div>
    );
  }
}

WorkspaceControlPanel.propTypes = {
  manifests: PropTypes.instanceOf(Object).isRequired,
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

const enhance = compose(
  connect(mapStateToProps),
  // further HOC go here
);

export default enhance(WorkspaceControlPanel);
