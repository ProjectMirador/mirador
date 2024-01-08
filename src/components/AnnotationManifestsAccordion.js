import { Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import PropTypes from 'prop-types';
import AnnotationManifestsItem from '../containers/AnnotationManifestsItem';

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

    // eslint-disable-next-line react/prop-types
    const { annotation } = props;

    // eslint-disable-next-line react/prop-types
    annotation.manifestsOpen = false;
    // eslint-disable-next-line react/prop-types
    annotation.manifests = searchManifestInID(annotation.id);
    // eslint-disable-next-line react/prop-types
    annotation.manifests = annotation.manifests?.map(id => ({ id })) ?? [];

    this.state = { annotation };
  }

  /** */
  // eslint-disable-next-line class-methods-use-this,require-jsdoc
  handleOpenAccordion(e) {
    const { annotation } = this.state;
    annotation.manifestsOpen = true;
    e.stopPropagation();
    this.state = { annotation };
  }

  /** */
  render() {
    const {
      // eslint-disable-next-line react/prop-types
      t,
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
            <Typography>{t('manifestFound')}</Typography>
          </AccordionSummary>
          {
            annotation.manifestsOpen && (
            <AccordionDetails sx={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              gap: '10px',
            }}
            >
              {annotation.manifests.map(manifest => (
                <AnnotationManifestsItem
                  manifestId={manifest.id}
                  key={manifest}
                  t={t}
                />
              ))}
            </AccordionDetails>
            )
          }
        </Accordion>
      </div>
    );
  }
}

AnnotationManifestsAccordion.propsTypes = {
  annotation: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string,
    manifests: PropTypes.arrayOf(PropTypes.string),
    manifestsOpen: PropTypes.bool,
  }),
  htmlSanitizationRuleSet: PropTypes.string,
  t: PropTypes.func.isRequired,
};

AnnotationManifestsAccordion.defaultProps = {
  annotation: undefined,
  htmlSanitizationRuleSet: 'iiif',
  t: key => key,
};
