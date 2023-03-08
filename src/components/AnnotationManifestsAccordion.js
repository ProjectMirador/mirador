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
import { AnnotationManifestsItem } from './AnnotationManifestsItem';

/**
 * AnnotationManifestsAccordion
 */
export class AnnotationManifestsAccordion extends Component {
  /**
   * constructor
   */
  constructor(props) {
    super(props);
    this.handleOpenAccordion = this.handleOpenAccordion.bind(this);


    /** Search if the annotation is a manifest. URL must be resolvable for the annotation. So the manifest url is added at the end of the id */
    function searchManifestInID(id) {
      const match = id.match(
        /((http|https)\:\/\/[a-z0-9\/:%_+.,#?!@&=-]+)#((http|https)\:\/\/[a-z0-9\/:%_+.,#?!@&=-]+)/gi,
      );

      return match ? match[0].split('#').slice(-1) : null;
    }

    const { annotation } = this.props;

    annotation.manifests = searchManifestInID(annotation.id);
    if (annotation.manifests) {
      annotation.manifests = annotation.manifests.map(id => ({ id }));
    } else {
      annotation.manifests = [];
    }

    this.state = { annotation };
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

    const { annotation } = this.state;

    if (annotation.manifests === null || annotation.manifests.length === 0) {
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
            {annotation.manifests.map(manifest => (
              <AnnotationManifestsItem
                manifestId={manifest.id}
                language={i18n.language}
                key={manifest}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

AnnotationManifestsAccordion.propsTypes = {

  annotation: PropTypes.shape(
    {
      content: PropTypes.string,
      id: PropTypes.string,
      manifests: PropTypes.arrayOf(PropTypes.string),
    },
  ),
  classes: PropTypes.objectOf(PropTypes.string),
  fetchManifest: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

AnnotationManifestsAccordion.defaultProps = {
  classes: {},
  htmlSanitizationRuleSet: 'iiif',
  listContainerComponent: 'li',
};
