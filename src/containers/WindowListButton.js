import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { WindowListButton } from '../components/WindowListButton';

/** */
const mapStateToProps = ({ windows, workspace }) => ({
  disabled: workspace.isWorkspaceAddVisible,
  windowCount: Object.keys(windows).length,
});

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, null),
  withPlugins('WindowListButton'),
);

export default enhance(WindowListButton);
