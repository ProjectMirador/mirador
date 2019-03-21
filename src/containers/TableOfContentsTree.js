import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend';
import * as actions from '../state/actions';
import {
  getManifestStructures,
  getManifestoInstance,
  parentRangeIdsForCurrentCanvas,
} from '../state/selectors';
import { TableOfContentsTree } from '../components/TableOfContentsTree';

/**
 * mapDispatchToProps - to hook up connect
 * @memberof TableOfContentsTree
 * @private
 */
const mapDispatchToProps = {
  setCanvas: actions.setCanvas,
  toggleRange: actions.toggleRange,
};

/**
 * mapStateToProps - to hook up connect
 * @memberof TableOfContentsTree
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  manifesto: getManifestoInstance(state, { windowId }),
  manifestStructures: getManifestStructures(state, { windowId }),
  rangeStatuses: state.ranges[windowId],
  selectedRanges: parentRangeIdsForCurrentCanvas(state, { windowId }),
});

/**
 *
 * @param theme
 * @returns {label: {paddingLeft: number}}}
 */
const styles = theme => ({
  section: {
    borderBottom: '.5px solid rgba(0,0,0,0.25)',
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 2,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps, null),
  withPlugins('TableOfContentsTree'),
);

export default enhance(TableOfContentsTree);
