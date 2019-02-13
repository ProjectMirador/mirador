import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import WindowIcon from './WindowIcon';
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
class ManifestListItem extends React.Component {
  /** */
  render() {
    const {
      manifestId, title, thumbnail, logo, addWindow, handleClose, classes,
    } = this.props;

    return (
      <Card className={classNames(classes.card, ns('manifest-list-item'))}>
        <CardHeader
          avatar={
            <WindowIcon manifestLogo={logo} />
          }
          title={title || manifestId}
        />

        {
          thumbnail && (
            <CardMedia
              className={classes.media}
              image={thumbnail}
            />
          )
        }
        <CardContent>
          <Button
            color="primary"
            onClick={
              (event) => { handleOpenButtonClick(event, manifestId, addWindow); handleClose(); }
            }
          >
            {title || manifestId}
          </Button>
        </CardContent>
      </Card>
    );
  }
}

ManifestListItem.propTypes = {
  manifestId: PropTypes.string.isRequired,
  addWindow: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  logo: PropTypes.string,
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

ManifestListItem.defaultProps = {
  handleClose: () => {},
  logo: null,
  classes: {},
  thumbnail: null,
  title: null,
};

/** */
const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 192,
  },
});

export default withStyles(styles)(ManifestListItem);
