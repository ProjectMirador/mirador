import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../../extend';
import { getCompanionWindow } from '../../state/selectors';
import { CompanionWindowFactory } from '../../components/window/CompanionWindowFactory';

/**
 * mapStateToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
const mapStateToProps = (state, { id }) => {
  const companionWindow = getCompanionWindow(state, { companionWindowId: id });

  return {
    ...companionWindow,
    isDisplayed: companionWindow
                  && companionWindow.content
                  && companionWindow.content.length > 0,
  };
};

const enhance = compose(
  connect(mapStateToProps),
  withPlugins('CompanionWindowFactory'),
);

export default enhance(CompanionWindowFactory);
