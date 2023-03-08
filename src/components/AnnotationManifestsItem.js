import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {
  Card, CardActionArea, CardActions, CardContent, CardMedia, Fab,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import ns from '../config/css-ns';
import ErrorIcon from '@material-ui/icons/ErrorOutlineSharp';

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
  componentDidMount() {
    const {
      fetchManifest, manifestId, ready, isFetching, error, provider,
    } = this.props;

    if (!ready && !error && !isFetching && provider !== 'file') fetchManifest(manifestId);
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
      classes, t, manifestId, thumbnail, title, description, error, ready
    } = this.props;

    if (error) {
      return (
        <Typography>{t('resourceError', { manifestId })}</Typography>
      );
    }

    if (!ready) {
      return (
        <Typography>
          <Typography>{t('resourceLoading')}</Typography>
        </Typography>
      );
    }

    return (
      <Card className={classes.root}>
        <CardActionArea>
          {
            thumbnail && (
              <CardMedia
                className={classes.thumbnail}
                component="img"
                height="140"
                image={thumbnail}
                alt="green iguana"
              />
            )
          }
          <CardContent>
            <Typography>
              { title || manifestId }
            </Typography>
            {
              description && (
                <Typography>
                  { description }
                </Typography>
              )
}
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
    );
  }
}

AnnotationManifestsItem.propsTypes = {
  addResource: PropTypes.func.isRequired,
  addWindow: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.string,
  error: PropTypes.string,
  fetchManifest: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  manifestLogo: PropTypes.string,
  manifests: PropTypes.arrayOf(PropTypes.string),
  provider: PropTypes.string,
  ready: PropTypes.bool,
  t: PropTypes.func.isRequired,
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
