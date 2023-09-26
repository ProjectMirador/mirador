import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import WorkspaceAddButton from '../containers/WorkspaceAddButton';
import WorkspaceControlPanelButtons from '../containers/WorkspaceControlPanelButtons';
import Branding from '../containers/Branding';
import ns from '../config/css-ns';

const StyledWorkspaceButtons = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const StyledBranding = styled(Branding)(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  [theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [theme.breakpoints.up('sm')]: {
    bottom: 0,
    display: 'block',
    float: 'none',
    right: 'auto',
    width: '100%',
  },
  right: 0,
}));

/**
 * Provides the panel responsible for controlling the entire workspace
 */
export class WorkspaceControlPanel extends Component {
  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const { t, variant } = this.props;
    return (
      <AppBar
        sx={(theme) => ({
          height: 64,
          [theme.breakpoints.up('sm')]: {
            height: '100%',
            left: 0,
            right: 'auto',
            width: variant === 'wide' ? 'auto' : 64,
          },
          ...(variant === 'wide' && {
            width: 'auto',
          }),
        })}
        className={classNames(ns('workspace-control-panel'))}
        color="default"
        enableColorOnDark
        position="absolute"
        component="nav"
        aria-label={t('workspaceNavigation')}
      >
        <Toolbar
          disableGutters
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',
            [theme.breakpoints.up('sm')]: {
              flexDirection: 'column',
              justifyContent: 'flex-start',
              minHeight: 0,
            },
          })}
        >
          <WorkspaceAddButton />
          <StyledWorkspaceButtons>
            <WorkspaceControlPanelButtons />
          </StyledWorkspaceButtons>
        </Toolbar>
        <StyledBranding t={t} variant={variant} />
      </AppBar>
    );
  }
}

WorkspaceControlPanel.propTypes = {
  t: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['default', 'wide']),
};

WorkspaceControlPanel.defaultProps = {
  variant: 'default',
};
