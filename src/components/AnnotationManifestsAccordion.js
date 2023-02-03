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

    /** Search manifest directly in content. We consider all the links with #manifest at the end are manifest */
    function searchManifestInContent(text) {
      return text.match(
        /((http|https)\:\/\/[a-z0-9\/:%_+.,#?!@&=-]+)#manifest/gi,
      );
    }

    /** Search if the annotation is a manifest. URL must be resolvable for the annotation. So the manifest url is added at the end of the id */
    function searchManifestInID(id) {
      const match = id.match(
        /((http|https)\:\/\/[a-z0-9\/:%_+.,#?!@&=-]+)#((http|https)\:\/\/[a-z0-9\/:%_+.,#?!@&=-]+)/gi,
      );

      return match ? match[0].split('#').slice(-1) : null;
    }

    const { annotation } = this.props;

    /** Merge array even if some are null) */
    const concat = (...arrays) => [].concat(...arrays.filter(Array.isArray));

    annotation.manifests = concat(searchManifestInContent(annotation.content), searchManifestInID(annotation.id));
    if (annotation.manifests) {
      annotation.manifests = annotation.manifests.map(id => ({ id }));
    } else {
      annotation.manifests = [];
    }
    this.state = { annotation };
  }

  /** */
  componentDidMount() {
    const { annotation } = this.state;

    /** */
    async function loadManifest(manifests) {
      return Promise.all(manifests.map((manifest) => fetch(manifest.id)
        .then((response) => response.json())
        .then((data) => {
          if (data.type === 'Manifest') {
            return data;
          }
          return null;
        })));
    }

    loadManifest(annotation.manifests)
      .then((values) => {
        if (values) {
          annotation.manifests = values;
          this.setState({ annotation });
        }
      });
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
      classes, t, i18n,
    } = this.props;

    const language = i18n.language;

    const { annotation } = this.state;

    if (annotation.manifests === null) {
      return null;
    }

    return (
      <div>
        {annotation.manifests.map(manifest => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              onClick={(e) => this.handleOpenAccordion(e)}
            >
              <Typography className={classes.heading}>{t('manifestsFound')}</Typography>
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
                        {manifest.label ? manifest.label.en : manifest.id}
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
                        {t('openInCompanionWindow')}
                      </Button>
                    </Tooltip>
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
      content: PropTypes.string,
      id: PropTypes.string,
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
