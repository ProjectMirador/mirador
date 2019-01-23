import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import ConnectedManifestForm from './ManifestForm';
import ConnectedManifestListItem from './ManifestListItem';
import Display from './Display';
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
        <span className={ns('svg-plus')}>
          <CSvgPlus clickHandler={(e) => { console.log('TODO: a manifest selection possibility should appear'); }}/>
        </span>
        <br />
        <br />
        <span className={ns('svg-dots')}>
          <CSvgDots clickHandler={(e) => { console.log('TODO: a menu should appear'); }} />
        </span>
        <br />
        <span>
          <CSvgFrame />
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
