import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreSharp';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import PropTypes from 'prop-types';
import { MiradorMenuButton } from './MiradorMenuButton';

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
      classes, annotation, t,
    } = this.props;

    /** */
    function searchManifest(text) {
      return text.match(
        /((http|https)\:\/\/[a-z0-9\/:%_+.,#?!@&=-]+)#manifest/g,
      );
    }

    console.log(annotation);
    annotation.idIsManifest = !!searchManifest(annotation.id);
    annotation.manifestsInContent = searchManifest(annotation.content);

    if (annotation.manifestsInContent === null && annotation.idIsManifest) {
      return null;
    }

    return (
      (annotation.idIsManifest || annotation.manifestsInContent) && (
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography className={classes.heading}>Manifests found :</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {annotation.idIsManifest && (
                  <div className={classes.manifestOpeningWrapper}>
                    <div>{annotation.id}</div>
                    <MiradorMenuButton
                      aria-haspopup="true"
                      aria-label={t('openManifestInOtherWindow', { manifest: annotation.id })}
                      titleAccess={t('openManifestInOtherWindow', { manifest: annotation.id })}
                      onClick={(e) => {
                        this.handleOpenManifestSideToSide(e, annotation.id);
                      }}
                      className={classes.manifestOpeningButton}
                    >
                      <PlaylistAddIcon />
                    </MiradorMenuButton>
                  </div>
                )}
                {annotation.manifestsInContent && annotation.manifestsInContent.map(manifestId => (
                  <div className={classes.manifestOpeningWrapper}>
                    <div>{manifestId}</div>
                    <MiradorMenuButton
                      aria-haspopup="true"
                      aria-label={t('openManifestInOtherWindow')}
                      titleAccess={t('openManifestInOtherWindow')}
                      onClick={(e) => {
                        this.handleOpenManifestSideToSide(e, manifestId);
                      }}
                      className={classes.manifestOpeningButton}
                    >
                      <PlaylistAddIcon />
                    </MiradorMenuButton>
                  </div>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      )
    );
  }
}

AnnotationManifestsAccordion.propsTypes = {
  addResource: PropTypes.func.isRequired,
  addWindow: PropTypes.func.isRequired,
  annotation: PropTypes.objectOf(
    {
      id: PropTypes.string.isRequired,
      idIsManifest: PropTypes.bool,
      manifestsInContent: PropTypes.arrayOf(PropTypes.string),
    },
  ),
  classes: PropTypes.objectOf(PropTypes.string),
  t: PropTypes.func.isRequired,
};

AnnotationManifestsAccordion.defaultProps = {
  annotation: {},
  classes: {},
  htmlSanitizationRuleSet: 'iiif',
  listContainerComponent: 'li',
};
