import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreSharp';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PropTypes from 'prop-types';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Fab } from '@material-ui/core';
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
  }

  /** */
  handleOpenManifestSideToSide(e, manifestId) {
    const { addResource, addWindow } = this.props;
    addResource(manifestId);
    addWindow({ manifestId });
  }

  /** */
  // eslint-disable-next-line class-methods-use-this,require-jsdoc
  handleOpenAccordion(e) {
    e.stopPropagation();
  }

  /** */
  render() {
    const {
      classes, annotation, t,
    } = this.props;

    /** */
    function searchManifest(text) {
      return text.match(
        /((http|https)\:\/\/[a-z0-9\/:%_+.,#?!@&=-]+)#manifest/g,
      );
    }

    annotation.manifests = searchManifest(annotation.content.concat(annotation.id));

    if (annotation.manifests === null) {
      return null;
    }

    return (
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              onClick={(e) => this.handleOpenAccordion(e)}
            >
              <Typography className={classes.heading}>Manifests found :</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {annotation.manifests.map(manifestId => (
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="https://www.tetras-libre.fr/themes/tetras/img/logo.svg"
                        title="Tetras tooltip"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          Lizard
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                          across all continents except Antarctica
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button size="small" color="primary">
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
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
