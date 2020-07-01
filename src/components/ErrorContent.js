import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PluginHook } from './PluginHook';

/** */
export class ErrorContent extends Component {
  /** */
  render() {
    const {
      classes,
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
          <Accordion square className={classes.alert}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>{t('jsError', { message: error.message, name: error.name })}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <pre>{ t('jsStack', { stack: error.stack }) }</pre>
              { metadata && (
                <pre>{JSON.stringify(metadata, null, 2)}</pre>
              )}
            </AccordionDetails>
          </Accordion>
        )}
        <PluginHook {...this.props} />
      </>
    );
  }
}

ErrorContent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
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
