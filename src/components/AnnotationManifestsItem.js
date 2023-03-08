import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {
  Card, CardActionArea, CardActions, CardContent, CardMedia, Fab,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

/**
 * AnnotationManifestsItem
 */
export class AnnotationManifestsItem extends Component {
  /**
   * constructor
   */
  constructor(props) {
    super(props);
    this.handleOpenManifestSideToSide = this.handleOpenManifestSideToSide.bind(this);
  }

  /** */
  handleOpenManifestSideToSide(e, manifestId) {
    const { addResource, addWindow } = this.props;
    addResource(manifestId);
    addWindow({ manifestId });
  }

  /** */
  componentDidMount() {
    const {
      fetchManifest, manifestId, ready, isFetching, error, provider,
    } = this.props;

    if (!ready && !error && !isFetching && provider !== 'file') fetchManifest(manifestId);
  }

  /** */
  render() {
    const {
      classes, t, language, manifest,
    } = this.props;

    return (
      <Typography>
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography>
                { manifest.label ? manifest.label[language] : manifest.id }
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Tooltip title={t('openManifestInOtherWindow', { manifest: manifest.id })}>
              <Button
                size="small"
                color="primary"
                onClick={(e) => {
                  this.handleOpenManifestSideToSide(e, manifest.id);
                }}
              >
                {t('open')}
              </Button>
            </Tooltip>
          </CardActions>
        </Card>
      </Typography>
    );
  }
}

AnnotationManifestsItem.propsTypes = {
  addResource: PropTypes.func.isRequired,
  addWindow: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  fetchManifest: PropTypes.func.isRequired,
  manifests: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
};

AnnotationManifestsItem.defaultProps = {
  classes: {},
};
