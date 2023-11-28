import { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/**
 * CollapsableSection ~
*/
export class CollapsibleSection extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { open: true };
    this.handleChange = this.handleChange.bind(this);
  }

  /** Control the accordion state so we can provide aria labeling */
  handleChange(event, isExpanded) {
    this.setState({ open: isExpanded });
  }

  /**
   * Returns the rendered component
  */
  render() {
    const {
      children, id, label, t,
    } = this.props;
    const { open } = this.state;

    return (
      <Accordion id={id} elevation={0} expanded={open} onChange={this.handleChange} disableGutters square variant="compact">
        <AccordionSummary id={`${id}-header`} aria-controls={`${id}-content`} aria-label={t(open ? 'collapseSection' : 'expandSection', { section: label })} expandIcon={<ExpandMoreIcon />}>
          <Typography variant="overline" component="h4">
            {label}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    );
  }
}

CollapsibleSection.propTypes = {
  children: PropTypes.node.isRequired,

  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};
