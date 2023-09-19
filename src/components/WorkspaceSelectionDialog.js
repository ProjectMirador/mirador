import { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Card,
  CardContent,
  MenuList,
  MenuItem,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import WorkspaceTypeElasticIcon from './icons/WorkspaceTypeElasticIcon';
import WorkspaceTypeMosaicIcon from './icons/WorkspaceTypeMosaicIcon';
import ScrollIndicatedDialogContent from '../containers/ScrollIndicatedDialogContent';

const StyledDetails = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
/**
 */
export class WorkspaceSelectionDialog extends Component {
  /**
   * constructor
   */
  constructor(props) {
    super(props);

    this.handleWorkspaceTypeChange = this.handleWorkspaceTypeChange.bind(this);
  }

  /**
   * Propagate workspace type selection into the global state
   */
  handleWorkspaceTypeChange(workspaceType) {
    const { handleClose, updateWorkspace } = this.props;
    updateWorkspace({
      type: workspaceType,
    });
    handleClose();
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      container, handleClose, open, children, t, workspaceType,
    } = this.props;
    return (
      <Dialog
        aria-labelledby="workspace-selection-dialog-title"
        container={container}
        id="workspace-selection-dialog"
        onClose={handleClose}
        open={open}
      >
        <DialogTitle id="workspace-selection-dialog-title">
          <Typography variant="h2">{t('workspaceSelectionTitle')}</Typography>
        </DialogTitle>
        <ScrollIndicatedDialogContent>
          {children}
          <MenuList
            sx={{
              '&active': {
                outline: 'none',
              },
              '&focus': {
                outline: 'none',
              },
              outline: 'none',
            }}
            selected={workspaceType}
            autoFocusItem
          >
            <MenuItem
              sx={{
                height: 'auto',
                overflow: 'auto',
                whiteSpace: 'inherit',
              }}
              onClick={() => this.handleWorkspaceTypeChange('elastic')}
              selected={workspaceType === 'elastic'}
              value="elastic"
            >
              <Card sx={{
                backgroundColor: 'transparent',
                borderRadius: '0',
                boxShadow: '0 0 transparent',
                display: 'flex',
              }}
              >
                <WorkspaceTypeElasticIcon
                  sx={{
                    flexShrink: 0,
                    height: '90px',
                    width: '120px',
                  }}
                  viewBox="0 0 120 90"
                />
                <StyledDetails>
                  <CardContent
                    sx={{
                      '&.MuiCardContent-root': {
                        '&:last-child': {
                          paddingBottom: '12px',
                        },
                        paddingBottom: 0,
                        paddingTop: 0,
                        textAlign: 'left',
                      },
                      flex: '1 0 auto',
                    }}
                  >
                    <Typography sx={{ paddingBottom: '6px' }} component="p" variant="h3">{t('elastic')}</Typography>
                    <Typography variant="body1">{t('elasticDescription')}</Typography>
                  </CardContent>
                </StyledDetails>
              </Card>
            </MenuItem>
            <MenuItem
              sx={{
                height: 'auto',
                overflow: 'auto',
                whiteSpace: 'inherit',
              }}
              onClick={() => this.handleWorkspaceTypeChange('mosaic')}
              selected={workspaceType === 'mosaic'}
              value="mosaic"
            >
              <Card sx={{
                backgroundColor: 'transparent',
                borderRadius: '0',
                boxShadow: '0 0 transparent',
                display: 'flex',
              }}
              >
                <WorkspaceTypeMosaicIcon
                  sx={{
                    flexShrink: 0,
                    height: '90px',
                    width: '120px',
                  }}
                  viewBox="0 0 120 90"
                />
                <StyledDetails>
                  <CardContent
                    sx={{
                      '&.MuiCardContent-root': {
                        '&:last-child': {
                          paddingBottom: '12px',
                        },
                        paddingBottom: 0,
                        paddingTop: 0,
                        textAlign: 'left',
                      },
                      flex: '1 0 auto',
                    }}
                  >
                    <Typography sx={{ paddingBottom: '6px' }} component="p" variant="h3">{t('mosaic')}</Typography>
                    <Typography variant="body1">{t('mosaicDescription')}</Typography>
                  </CardContent>
                </StyledDetails>
              </Card>
            </MenuItem>
          </MenuList>
        </ScrollIndicatedDialogContent>
      </Dialog>
    );
  }
}

WorkspaceSelectionDialog.propTypes = {
  children: PropTypes.node,
  container: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  t: PropTypes.func,
  updateWorkspace: PropTypes.func.isRequired,
  workspaceType: PropTypes.string.isRequired,
};

WorkspaceSelectionDialog.defaultProps = {
  children: null,
  container: null,
  open: false,
  t: key => key,
};
