import { compose } from 'redux';
import { connect } from 'react-redux';
import { CompanionWindowFactory } from '../components/CompanionWindowFactory';

/**
 * mapStateToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
const mapStateToProps = (state, { id }) => {
  const companionWindow = state.companionWindows[id];

  return {
    ...companionWindow,
    isDisplayed: companionWindow
                  && companionWindow.content
                  && companionWindow.content.length > 0,
  };
};

const enhance = compose(
  connect(mapStateToProps),
);

export default enhance(CompanionWindowFactory);
