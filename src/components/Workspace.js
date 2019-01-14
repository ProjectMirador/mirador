import React from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Window from '../containers/Window';
import ns from '../config/css-ns';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
class Workspace extends React.Component {
  /**
   * render
   */
  render() {
    const { windows } = this.props;
    const numWindows = Object.keys(windows).length;
    return (
      <div className={ns('workspace')}>
        <ResponsiveGridLayout
          margin={[0, 0]}
          compactType={null}
        >
          {
            Object.values(windows).map((window, index) => (
              <div
                key={`${window.id}-div`}
                data-grid={{
                  x: (12 / numWindows) * index, y: 0, w: 12 / numWindows, h: 3,
                }}
              >
                <Window
                  id={window.id}
                  key={window.id}
                  window={window}
                  tabindex="0"
                />
              </div>
            ))
          }
        </ResponsiveGridLayout>
      </div>
    );
  }
}

Workspace.propTypes = {
  windows: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default Workspace;
