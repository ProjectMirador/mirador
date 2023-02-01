import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreSharp';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PropTypes from 'prop-types';
import {
  Card, CardActionArea, CardActions, CardContent, CardMedia, Fab,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';

/**
 * AnnotationManifestsAccordion
 */
export class AnnotationManifestsAccordion extends Component {
  /**
   * constructor
   */
  constructor(props) {
    super(props);
    this.handleOpenManifestSideToSide = this.handleOpenManifestSideToSide.bind(this);
    this.handleOpenAccordion = this.handleOpenAccordion.bind(this);

    /** */
    function searchManifest(text) {
      return text.match(
        /((http|https)\:\/\/[a-z0-9\/:%_+.,#?!@&=-]+)#manifest/g,
      );
    }

    const { annotation } = this.props;
    annotation.manifests = searchManifest(annotation.content.concat(annotation.id));

    if (annotation.manifests) {
      annotation.manifests = annotation.manifests.map(id => ({ id }));
    } else {
      annotation.manifests = [];
    }
    this.state = { annotation };
  }

  /** */
  handleOpenManifestSideToSide(e, manifestId) {
    const { addResource, addWindow } = this.props;
    addResource(manifestId);
    addWindow({ manifestId });
  }

  /** */
  // eslint-disable-next-line class-methods-use-this,require-jsdoc
  async handleOpenAccordion(e, manifestClicked) {
    const { annotation } = this.state;
    const manifestFound = annotation.manifests.find(manifest => manifest.id === manifestClicked.id);

    const fetchResult = await fetch(manifestFound.id)
      .then((response) => response.json())
      .then((jsonData) => {
        if (jsonData.type === 'Manifest') {
          return jsonData;
        }
        return null;
      }).then((jsonStr) => {
        console.log(this.annotation.id);
      });

    e.stopPropagation();
  }

  async function loadManifest(manifests) {
    return Promise.all(requestsArray.map((request) => {
      return fetch(request).then((response) => {
        return response.json();
      }).then((data) => {
        if (data.type === 'Manifest') {
          return data;
        }
        return null;
      });
    }));
  }

  /** */
  componentDidMount() {
    const { annotation } = this.state;
    searchManifestAndAddButton(annotation.manifests)
      .then((values) => {
        if (values) {
          this.setState({
            manifests: valuesFlat,
          });
        }
      });
  }

  /** */
  render() {
    const {
      classes, t,
    } = this.props;

    const { annotation } = this.state;

    if (annotation.manifests === null) {
      return null;
    }

    return (
      <div>
        {annotation.manifests.map(manifestId => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              onClick={(e) => this.handleOpenAccordion(e, manifestId)}
            >
              <Typography className={classes.heading}>Manifests found:</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="100"
                      width="100%"
                      image="https://www.tetras-libre.fr/themes/tetras/img/logo.svg"
                      title="Tetras tooltip"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Label de mon manifest
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Description de mon manifest
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={(e) => {
                        this.handleOpenManifestSideToSide(e, manifestId);
                      }}
                    >
                      Open in new panel
                    </Button>
                  </CardActions>
                </Card>
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    );
  }
}

AnnotationManifestsAccordion.propsTypes = {
  addResource: PropTypes.func.isRequired,
  addWindow: PropTypes.func.isRequired,
  annotation: PropTypes.shape(
    {
      content: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      manifests: PropTypes.arrayOf(PropTypes.string),
    },
  ),
  classes: PropTypes.objectOf(PropTypes.string),
  t: PropTypes.func.isRequired,
};

AnnotationManifestsAccordion.defaultProps = {
  classes: {},
  htmlSanitizationRuleSet: 'iiif',
  listContainerComponent: 'li',
};
