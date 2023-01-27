import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreSharp';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { MiradorMenuButton } from './MiradorMenuButton';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';


export class AnnotationManifestsAccordion extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {
      classes,
      annotation
    } = this.props;

    return (
      (annotation.idIsManifest || annotation.manifestsInContent) && (
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon/>}
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
                      <PlaylistAddIcon/>
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
                      <PlaylistAddIcon/>
                    </MiradorMenuButton>
                  </div>
                ))}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

      )
    )
  }

}
