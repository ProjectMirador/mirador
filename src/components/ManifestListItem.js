import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReactPlaceholder from 'react-placeholder';
import { TextBlock, TextRow, RectShape } from 'react-placeholder/lib/placeholders';
import ManifestListItemError from '../containers/ManifestListItemError';
import WindowIcon from './WindowIcon';
import ns from '../config/css-ns';
import 'react-placeholder/lib/reactPlaceholder.css';

/**
 * Handling open button click
 */
const handleOpenButtonClick = (event, manifest, addWindow) => {
  addWindow({ manifestId: manifest });
};
/**
 * Represents an item in a list of currently-loaded or loading manifests
 * @param {object} props
 * @param {object} [props.manifest = string]
 */

/** */
export class ManifestListItem extends React.Component {
  /** */
  componentDidMount() {
    const {
      fetchManifest, manifestId, ready, isFetching, error,
    } = this.props;

    if (!ready && !error && !isFetching) fetchManifest(manifestId);
  }

  /** */
  render() {
    const {
      manifestId,
      ready,
      title,
      thumbnail,
      logo,
      addWindow,
      handleClose,
      size,
      classes,
      provider,
      t,
      error,
    } = this.props;

    const placeholder = (
      <Grid container className={ns('manifest-list-item')} spacing={24}>
        <Grid item xs={3} sm={2}>
          <RectShape color="gray" style={{ width: 120, height: 80 }} />
        </Grid>
        <Grid item xs={9} sm={6}>
          <TextRow color="gray" />
        </Grid>
        <Grid item xs={8} sm={2}>
          <TextBlock rows={2} color="gray" />
        </Grid>
        <Grid item xs={4} sm={2}>
          <RectShape color="gray" style={{ width: 60, height: 60 }} />
        </Grid>
      </Grid>
    );

    if (error) {
      return (
        <Paper elevation={1} className={classes.root} data-manifestid={manifestId}>
          <ManifestListItemError manifestId={manifestId} />
        </Paper>
      );
    }

    return (
      <Paper elevation={1} className={classes.root} data-manifestid={manifestId}>
        <ReactPlaceholder
          showLoadingAnimation
          delay={500}
          ready={ready}
          customPlaceholder={placeholder}
        >
          <Grid container className={ns('manifest-list-item')} spacing={24}>
            <Grid item xs={12} sm={6}>
              <ButtonBase
                className={ns('manifest-list-item-title')}
                style={{ width: '100%' }}
                onClick={
                  (event) => { handleOpenButtonClick(event, manifestId, addWindow); handleClose(); }
                }
              >
                <Grid container spacing={24} className={classes.label}>
                  <Grid item xs={4} sm={3}>
                    {
                      thumbnail && (
                        <img
                          className={ns('manifest-list-item-thumb')}
                          src={thumbnail}
                          alt=""
                          height="80"
                        />
                      )
                    }
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography component="span" variant="subtitle1" color="primary">
                      {title || manifestId}
                    </Typography>
                  </Grid>
                </Grid>
              </ButtonBase>
            </Grid>
            <Grid item xs={8} sm={4}>
              <Typography className={ns('manifest-list-item-provider')}>{provider || t('addedFromUrl')}</Typography>
              <Typography>{t('numItems', { number: size })}</Typography>
            </Grid>

            <Grid item xs={4} sm={2}>
              <WindowIcon className={ns('manifest-list-item-logo')} manifestLogo={logo} />
            </Grid>
          </Grid>
        </ReactPlaceholder>
      </Paper>
    );
  }
}

ManifestListItem.propTypes = {
  manifestId: PropTypes.string.isRequired,
  addWindow: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  ready: PropTypes.bool,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  logo: PropTypes.string,
  size: PropTypes.number,
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  provider: PropTypes.string,
  t: PropTypes.func,
  fetchManifest: PropTypes.func.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
};

ManifestListItem.defaultProps = {
  handleClose: () => {},
  ready: false,
  logo: null,
  thumbnail: null,
  title: null,
  classes: {},
  size: 0,
  provider: null,
  t: key => key,
  error: null,
  isFetching: false,
};
