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

var mapStateToProps = function mapStateToProps(state, _ref) {
  var id = _ref.id;
  var companionWindow = getCompanionWindow(state, {
    companionWindowId: id
  });
  return {
    content: companionWindow.content,
    id: id
  };
};

var enhance = compose(withTranslation(), connect(mapStateToProps), withPlugins('CompanionWindowFactory'));
export default enhance(CompanionWindowFactory);