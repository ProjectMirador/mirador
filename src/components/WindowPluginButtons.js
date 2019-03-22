import React from 'react';
import PropTypes from 'prop-types';
import ListSubheader from '@material-ui/core/ListSubheader';

/** */
export function WindowPluginButtons(props) {
  const {
    PluginComponent,
    t,
  } = props;

  return PluginComponent && (
    <>
      <ListSubheader role="presentation" tabIndex="-1">{t('windowPluginButtons')}</ListSubheader>
      <PluginComponent {...props} />
    </>
  );
}

WindowPluginButtons.propTypes = {
  PluginComponent: PropTypes.func,
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};

WindowPluginButtons.defaultProps = {
  PluginComponent: null,
};
