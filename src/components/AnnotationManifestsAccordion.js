import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreSharp';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import PropTypes from 'prop-types';
import {
  Card, CardActionArea, CardActions, CardContent, CardMedia, Fab,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

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
    const { annotation } = this.state;
    /** */
   /*  async function load(manifests) {
      return Promise.all(manifests.map((manifest) => fetch(manifest.id)
        .then((response) => response.json())
        .then((data) => {
          if (data.type === 'Manifest') {
            return data;
          }
          return null;
        })));
    }

    load(annotation.manifests)
      .then((values) => {
        if (values) {
          annotation.manifests = values;
          this.setState({ annotation });
        }
      });
    e.stopPropagation(); */

    // We work onlu on the first manifest

 /*    const {
      fetchManifest
    } = this.props;
    fetchManifest(annotation.manifests[0]); */

  }

  /** */
  render() {
    const {
      classes, t, i18n, manifests
    } = this.props;

    const language = i18n.language;


    if (manifests === null || manifests.length === 0) {
      return null;
    }

    return (
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={(e) => this.handleOpenAccordion(e)}
          >
            <Typography className={classes.heading}>{t('manifestFound')}</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.manifestContainer}>
            {manifests.map(manifest => (
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
            ))}
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
      content: PropTypes.string,
      id: PropTypes.string,

    },
  ),
  classes: PropTypes.objectOf(PropTypes.string),
  fetchManifest: PropTypes.func.isRequired,
  manifests: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func.isRequired,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
};

AnnotationManifestsAccordion.defaultProps = {
  classes: {},
  htmlSanitizationRuleSet: 'iiif',
  listContainerComponent: 'li',
  manifests: [],
};
