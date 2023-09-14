import { Component } from 'react';
import PropTypes from 'prop-types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PluginHook } from './PluginHook';

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
        <Accordion
          square
          sx={{
            backgroundColor: 'error.main',
            color: '#fff',
            fontWeight: 'fontWeightMedium',
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{t('jsError', { message: error.message, name: error.name })}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{
            '& pre': {
              height: '100px',
              overflowY: 'scroll',
            },
            flexDirection: 'column',
          }}
          >
            <pre>{t('jsStack', { stack: error.stack })}</pre>
            {metadata && <pre>{JSON.stringify(metadata, null, 2)}</pre>}
          </AccordionDetails>
        </Accordion>
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
