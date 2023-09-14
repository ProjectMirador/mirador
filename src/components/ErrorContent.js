import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PluginHook } from './PluginHook';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
  color: '#fff',
  fontWeight: theme.typography.fontWeightMedium,
}));

const StyledAccordionDetails = styled(AccordionDetails)({
  '& pre': {
    height: '100px',
    overflowY: 'scroll',
  },
  flexDirection: 'column',
}));

/** */
export class ErrorContent extends Component {
  /** */
  render() {
    const {
      error,
      metadata,
      showJsError,
      t,
    } = this.props;

    if (!showJsError) return null;

    return (
      <>
        <Alert elevation={6} variant="filled" severity="error">
          {t('errorDialogTitle')}
        </Alert>

      {showJsError && (
        <StyledAccordion square>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{t('jsError', { message: error.message, name: error.name })}</Typography>
          </AccordionSummary>
          <StyledAccordionDetails>
            <pre>{t('jsStack', { stack: error.stack })}</pre>
            {metadata && <pre>{JSON.stringify(metadata, null, 2)}</pre>}
          </StyledAccordionDetails>
        </StyledAccordion>
      )}
      <PluginHook {...this.props} />
    </>
    );
  }
}

ErrorContent.propTypes = {
  error: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  metadata: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  showJsError: PropTypes.bool,
  t: PropTypes.func,
};

ErrorContent.defaultProps = {
  metadata: null,
  showJsError: true,
  t: key => key,
};
