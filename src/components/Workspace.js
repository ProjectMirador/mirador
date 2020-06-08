import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { v4 as uuid } from 'uuid';
import Typography from '@material-ui/core/Typography';
import Window from '../containers/Window';
import WorkspaceMosaic from '../containers/WorkspaceMosaic';
import WorkspaceElastic from '../containers/WorkspaceElastic';
import ns from '../config/css-ns';
import { IIIFDropTarget } from './IIIFDropTarget';

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
export class Workspace extends React.Component {
  /** */
  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
  }

  /** */
  handleDrop(props, monitor) {
    const { addWindow } = this.props;

    const item = monitor.getItem();
    console.log(item);
    if (item.urls) {
      item.urls.forEach((str) => {
        const url = new URL(str);
        const manifestId = url.searchParams.get('manifest');
        const canvasId = url.searchParams.get('canvas');

        if (manifestId) addWindow({ canvasId, manifestId });
      });
    }

    if (item.files) {
      item.files.filter(f => f.type === 'application/json').forEach((file) => {
        if (file.type === 'application/json') {
          file.text().then(manifest => addWindow({ manifest }));
        }
      });

      const imageFiles = item.files.filter(({ type }) => type.startsWith('image/'));

      if (imageFiles.length > 0) {
        const id = uuid();
        const imageData = imageFiles.map(file => (
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              const image = new Image();
              image.src = reader.result;
              image.addEventListener('load', () => {
                resolve({
                  height: image.height,
                  name: file.name,
                  type: file.type,
                  url: reader.result,
                  width: image.width,
                });
              });
            });
            reader.readAsDataURL(file);
          })
        ));

        Promise.all(imageData).then((images) => {
          const manifest = {
            '@context': 'http://iiif.io/api/presentation/3/context.json',
            id,
            items: images.map(({
              name, type, width, height, url,
            }, index) => ({
              height,
              id: `${id}/canvas/${index}`,
              items: [
                {
                  id: `${id}/canvas/${index}/1`,
                  items: [{
                    body: {
                      format: type,
                      id: url,
                      type: 'Image',
                    },
                    height,
                    id: `${id}/canvas/${index}/1/image`,
                    motivation: 'painting',
                    target: `${id}/canvas/${index}/1`,
                    type: 'Annotation',
                    width,
                  }],
                  type: 'AnnotationPage',
                },
              ],
              label: name,
              type: 'Canvas',
              width,
            })),
            label: images[0].name,
            type: 'Manifest',
          };
          addWindow({ manifest });
        });
      }
    }
  }

  /**
   * Determine which workspace to render by configured type
   */
  workspaceByType() {
    const { workspaceId, workspaceType, windowIds } = this.props;
    if (this.maximizedWindows()) {
      return this.maximizedWindows();
    }

    if (windowIds.length === 0) return this.zeroWindows();

    switch (workspaceType) {
      case 'elastic':
        return <WorkspaceElastic />;
      case 'mosaic':
        return <WorkspaceMosaic />;
      default:
        return windowIds.map(windowId => (
          <Window
            key={`${windowId}-${workspaceId}`}
            windowId={windowId}
          />
        ));
    }
  }

  /** */
  zeroWindows() {
    const { t } = this.props;

    return (
      <Grid
        alignItems="center"
        container
        style={{
          height: '100%',
        }}
      >
        <Grid
          xs={12}
          item
        >
          <Typography
            variant="h1"
            component="div"
            align="center"
          >
            {t('welcome')}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  /**
   * Determine whether or not there are maximized windows
   */
  maximizedWindows() {
    const { maximizedWindowIds, workspaceId } = this.props;

    if (maximizedWindowIds.length > 0) {
      return maximizedWindowIds.map(windowId => (
        <Window
          key={`${windowId}-${workspaceId}`}
          windowId={windowId}
          className={classNames(ns('workspace-maximized-window'))}
        />
      ));
    }
    return false;
  }

  /**
   * render
   */
  render() {
    const { classes, isWorkspaceControlPanelVisible, t } = this.props;

    return (
      <IIIFDropTarget onDrop={this.handleDrop}>
        <div
          className={
            classNames(
              ns('workspace-viewport'),
              (isWorkspaceControlPanelVisible && ns('workspace-with-control-panel')),
              (isWorkspaceControlPanelVisible && classes.workspaceWithControlPanel),
              classes.workspaceViewport,
            )
          }
        >
          <Typography variant="srOnly" component="h1">{t('miradorViewer')}</Typography>
          {this.workspaceByType()}
        </div>
      </IIIFDropTarget>
    );
  }
}

Workspace.propTypes = {
  addWindow: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isWorkspaceControlPanelVisible: PropTypes.bool.isRequired,
  maximizedWindowIds: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
  windowIds: PropTypes.arrayOf(PropTypes.string),
  workspaceId: PropTypes.string.isRequired,
  workspaceType: PropTypes.string.isRequired,
};

Workspace.defaultProps = {
  addWindow: () => {},
  maximizedWindowIds: [],
  windowIds: [],
};
