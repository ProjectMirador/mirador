import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import { getCompanionWindow } from '../state/selectors';
import { CompanionWindowFactory } from '../components/CompanionWindowFactory';

/**
 * mapStateToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
const mapStateToProps = (state, { id }) => {
  const companionWindow = getCompanionWindow(state, { companionWindowId: id });

  return {
    content: companionWindow.content,
    id,
  };
};

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps),
  withPlugins('CompanionWindowFactory'),
);

export default enhance(CompanionWindowFactory);
