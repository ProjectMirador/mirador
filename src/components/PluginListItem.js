import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import ExtensionIcon from '@material-ui/icons/ExtensionOutlined';

/** */
function PluginListItem(props) {
  const { onClick, icon, title } = props;
  return (
    <MenuItem onClick={onClick}>
      { icon || <ExtensionIcon /> }
      <Typography inline style={{ paddingLeft: '12px' }}>
        { title }
      </Typography>
    </MenuItem>
  );
}

PluginListItem.propTypes = {
  icon: PropTypes.node,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

PluginListItem.defaultProps = {
  icon: null,
  onClick: null,
  title: 'Plugin without title',
};

export default PluginListItem;
