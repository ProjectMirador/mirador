import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import withStyles from '@mui/styles/withStyles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { withPlugins } from '../extend/withPlugins';
import * as actions from '../state/actions';
import { getWindowIds, getWorkspace } from '../state/selectors';
import { WorkspaceAddButton } from '../components/WorkspaceAddButton';

/**
 * Be careful using this hook. It only works because the number of
 * breakpoints in theme is static. It will break once you change the number of
 * breakpoints. See https://legacy.reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level
 */
function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

/**
 * withWidth
 * @memberof WorkspaceControlPanel
 * @private
 */
const withWidth = () => (WrappedComponent) => (props) => <WrappedComponent {...props} width={useWidth()} />;

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceControlPanel
 * @private
 */
const mapStateToProps = (state, { width }) => {
  const { isWorkspaceAddVisible } = getWorkspace(state);
  return {
    isWorkspaceAddVisible,
    useExtendedFab: (
      (width !== 'xs')
        && !isWorkspaceAddVisible
        && getWindowIds(state).length === 0
    ),
  };
};

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = { setWorkspaceAddVisibility: actions.setWorkspaceAddVisibility };

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
const styles = theme => ({
  fab: {
    margin: theme.spacing(1),
  },
  fabPrimary: {
    '&:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  fabSecondary: {
    '&:focus': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withWidth({ initialWidth: 'xs' }),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceAddButton'),
);

export default enhance(WorkspaceAddButton);
