import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ButtonBase from '@mui/material/ButtonBase';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useTranslation } from 'react-i18next';
import { Img } from 'react-image';
import ManifestListItemError from '../containers/ManifestListItemError';
import ns from '../config/css-ns';

const Root = styled(ListItem, { name: 'ManifestListItem', slot: 'root' })(({ ownerState, theme }) => ({
  '&:hover,&:focus-within': {
    backgroundColor: theme.palette.action.hover,
    borderLeftColor: ownerState?.active ? theme.palette.primary.main : theme.palette.action.hover,
  },
  borderLeft: '4px solid',
  borderLeftColor: ownerState?.active ? theme.palette.primary.main : 'transparent',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

const StyledThumbnail = styled(Img, { name: 'ManifestListItem', slot: 'thumbnail' })(({ theme }) => ({
  maxWidth: '100%',
  objectFit: 'contain',
}));

const StyledLogo = styled(Img, { name: 'ManifestListItem', slot: 'logo' })(({ theme }) => ({
  height: '2.5rem',
  maxWidth: '100%',
  objectFit: 'contain',
  paddingRight: 1,
}));

/** */
const Placeholder = () => (
  <Grid container className={ns('manifest-list-item')}>
    <Grid size={{ sm: 2, xs: 3 }}>
      <Skeleton sx={{ bgcolor: 'grey[300]' }} variant="rectangular" height={80} width={120} />
    </Grid>
    <Grid size={{ sm: 6, xs: 9 }}>
      <Skeleton sx={{ bgcolor: 'grey[300]' }} variant="text" />
    </Grid>
    <Grid size={{ sm: 2, xs: 8 }}>
      <Skeleton sx={{ bgcolor: 'grey[300]' }} variant="text" />
      <Skeleton sx={{ bgcolor: 'grey[300]' }} variant="text" />
    </Grid>
    <Grid size={{ sm: 2, xs: 4 }}>
      <Skeleton sx={{ bgcolor: 'grey[300]' }} variant="rectangular" height={60} width={60} />
    </Grid>
  </Grid>
);

/**
 * Represents an item in a list of currently-loaded or loading manifests
 * @param {object} props
 * @param {object} [props.manifest = string]
 */
export function ManifestListItem({
  fetchManifest,
  isFetching = false,
  addWindow,
  handleClose = () => { },
  active = false,
  buttonRef = undefined,
  manifestId,
  ready = false,
  title = null,
  thumbnail = null,
  manifestLogo = null,
  size = 0,
  provider = null,
  error = null,
  isCollection = false,
  isMultipart = false,
}) {
  const { t } = useTranslation();
  useEffect(() => {
    if (!ready && !error && !isFetching && provider !== 'file') fetchManifest(manifestId);
  }, [manifestId, provider, fetchManifest, ready, error, isFetching]);

  const ownerState = arguments[0]; // eslint-disable-line prefer-rest-params

  /** */
  const handleOpenButtonClick = () => {
    addWindow({ manifestId });
    handleClose();
  };

  if (error) {
    return (
      <Root
        ownerState={ownerState}
        divider
        selected={active}
        className={active ? 'active' : ''}
        data-manifestid={manifestId}
      >
        <ManifestListItemError manifestId={manifestId} />
      </Root>
    );
  }

  return (
    <Root
      divider
      selected={active}
      className={active ? 'active' : ''}
      data-manifestid={manifestId}
      data-active={active}
    >
      {ready ? (
        <Grid container className={ns('manifest-list-item')}>
          <Grid size={{ sm: 6, xs: 12 }} sx={{ flex: '0 0 50%' }}>
            <ButtonBase
              ref={buttonRef}
              className={ns('manifest-list-item-title')}
              onClick={handleOpenButtonClick}
            >
              <Grid
                container
                sx={{
                  textAlign: 'left',
                  textTransform: 'initial',
                }}
                component="div"
              >
                <Grid size={{ sm: 3, xs: 4 }} component="div">
                  {thumbnail
                    ? (
                      <StyledThumbnail
                        className={[ns('manifest-list-item-thumb')]}
                        src={[thumbnail]}
                        alt=""
                        height="80"
                        unloader={(
                          <Skeleton
                            variant="rectangular"
                            animation={false}
                            sx={{ bgcolor: 'grey[300]' }}
                            height={80}
                            width={120}
                          />
                        )}
                      />
                    )
                    : <Skeleton sx={{ bgcolor: 'grey[300]' }} variant="rectangular" height={80} width={120} />}
                </Grid>
                <Grid size={{ sm: 9, xs: 8 }} component="div" paddingLeft={2}>
                  {isCollection && (
                    <Typography component="div" variant="overline">
                      {t(isMultipart ? 'multipartCollection' : 'collection')}
                    </Typography>
                  )}
                  <Typography component="div" variant="h6">
                    {title || manifestId}
                  </Typography>
                </Grid>
              </Grid>
            </ButtonBase>
          </Grid>

          <Grid size={{ sm: 4, xs: 8 }} sx={{ flex: 1 }}>
            <Typography className={ns('manifest-list-item-provider')}>{provider}</Typography>
            <Typography>{t('numItems', { count: size, number: size })}</Typography>
          </Grid>

          <Grid size={{ sm: 2, xs: 4 }} sx={{ flex: 1 }}>
            {manifestLogo
              && (
                <StyledLogo
                  src={[manifestLogo]}
                  alt=""
                  role="presentation"
                  unloader={(
                    <Skeleton
                      variant="rectangular"
                      animation={false}
                      sx={{ bgcolor: 'grey[300]' }}
                      height={60}
                      width={60}
                    />
                  )}
                />
              )}
          </Grid>
        </Grid>
      ) : (
        <Placeholder />
      )}
    </Root>
  );
}

ManifestListItem.propTypes = {
  active: PropTypes.bool,
  addWindow: PropTypes.func.isRequired,
  buttonRef: PropTypes.elementType,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.oneOf([null]), // for null
  ]),
  fetchManifest: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  isCollection: PropTypes.bool,
  isFetching: PropTypes.bool,
  isMultipart: PropTypes.bool,
  manifestId: PropTypes.string.isRequired,
  manifestLogo: PropTypes.string,
  provider: PropTypes.string,
  ready: PropTypes.bool,
  size: PropTypes.number,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
};
