import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Img from 'react-image';
import ManifestListItemError from '../containers/ManifestListItemError';
import ns from '../config/css-ns';

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
      active,
      manifestId,
      ready,
      title,
      thumbnail,
      manifestLogo,
      addWindow,
      handleClose,
      size,
      classes,
      provider,
      t,
      error,
    } = this.props;

    const placeholder = (
      <Grid container className={ns('manifest-list-item')} spacing={2}>
        <Grid item xs={3} sm={2}>
          <Skeleton className={classes.placeholder} variant="rect" height={80} width={120} />
        </Grid>
        <Grid item xs={9} sm={6}>
          <Skeleton className={classes.placeholder} variant="text" />
        </Grid>
        <Grid item xs={8} sm={2}>
          <Skeleton className={classes.placeholder} variant="text" />
          <Skeleton className={classes.placeholder} variant="text" />
        </Grid>
        <Grid item xs={4} sm={2}>
          <Skeleton className={classes.placeholder} variant="rect" height={60} width={60} />
        </Grid>
      </Grid>
    );

    if (error) {
      return (
        <ListItem divider elevation={1} className={classes.root} data-manifestid={manifestId}>
          <ManifestListItemError manifestId={manifestId} />
        </ListItem>
      );
    }

    return (
      <ListItem divider elevation={1} className={[classes.root, active ? classes.active : ''].join(' ')} data-manifestid={manifestId}>
        {ready ? (
          <Grid container className={ns('manifest-list-item')} spacing={2}>
            <Grid item xs={12} sm={6} className={classes.buttonGrid}>
              <ButtonBase
                className={ns('manifest-list-item-title')}
                style={{ width: '100%' }}
                onClick={
                  (event) => { handleOpenButtonClick(event, manifestId, addWindow); handleClose(); }
                }
              >
                <Grid container spacing={2} className={classes.label}>
                  <Grid item xs={4} sm={3}>
                    <Img
                      className={ns('manifest-list-item-thumb')}
                      src={[thumbnail]}
                      alt=""
                      height="80"
                      unloader={(
                        <Skeleton
                          variant="rect"
                          disableAnimate
                          className={classes.placeholder}
                          height={80}
                          width={120}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={8} sm={9}>
                    <Typography component="span" variant="h6">
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
              <Img
                src={[manifestLogo]}
                alt=""
                role="presentation"
                className={classes.logo}
                unloader={(
                  <Skeleton
                    variant="rect"
                    disableAnimate
                    className={classes.placeholder}
                    height={60}
                    width={60}
                  />
                )}
              />
            </Grid>
          </Grid>
        ) : (
          placeholder
        )}
      </ListItem>
    );
  }
}

ManifestListItem.propTypes = {
  active: PropTypes.bool,
  addWindow: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  error: PropTypes.string,
  fetchManifest: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  isFetching: PropTypes.bool,
  manifestId: PropTypes.string.isRequired,
  manifestLogo: PropTypes.string,
  provider: PropTypes.string,
  ready: PropTypes.bool,
  size: PropTypes.number,
  t: PropTypes.func,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
};

ManifestListItem.defaultProps = {
  active: false,
  classes: {},
  error: null,
  handleClose: () => {},
  isFetching: false,
  manifestLogo: null,
  provider: null,
  ready: false,
  size: 0,
  t: key => key,
  thumbnail: null,
  title: null,
};
