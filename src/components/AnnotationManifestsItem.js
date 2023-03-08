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

   /*  const {
      fetchManifest, manifestId, ready, isFetching, error, provider,
    } = props;

    if (!ready && !error && !isFetching && provider !== 'file') fetchManifest(manifestId); */
  }

  /** */
  handleOpenManifestSideToSide(e, manifestId) {
    const { addResource, addWindow } = this.props;
    addResource(manifestId);
    addWindow({ manifestId });
  }

  /** */
  render() {
    const {
      classes, t, language, manifestId,
    } = this.props;

    return (
      <Typography>
        <Card className={classes.root}>
          <CardActionArea>
            <CardContent>
              <Typography>
                { manifestId }
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Tooltip title={t('openManifestInOtherWindow', { manifestId })}>
              <Button
                size="small"
                color="primary"
                onClick={(e) => {
                  this.handleOpenManifestSideToSide(e, manifestId);
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
  manifestLogo: PropTypes.string,
  provider: PropTypes.string,
  ready: PropTypes.bool,
  isFetching: PropTypes.bool,
  error: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
};

AnnotationManifestsItem.defaultProps = {
  classes: {},
  error: null,
  isFetching: false,
  manifestLogo: null,
  provider: null,
  ready: false,
  thumbnail: null,
  title: null,
};
