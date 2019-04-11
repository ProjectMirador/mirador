import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { RectShape } from 'react-placeholder/lib/placeholders';
import Img from 'react-image';
import CompanionWindow from '../containers/CompanionWindow';
import { LabelValueMetadata } from './LabelValueMetadata';
import ns from '../config/css-ns';


/**
 * WindowSideBarInfoPanel
 */
export class AttributionPanel extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      manifestLogo,
      requiredStatement,
      rights,
      windowId,
      id,
      classes,
      t,
    } = this.props;

    return (
      <CompanionWindow
        title={t('attributionTitle')}
        paperClassName={ns('attribution-panel')}
        windowId={windowId}
        id={id}
      >
        <div className={classes.section}>
          { requiredStatement && (
            <LabelValueMetadata labelValuePairs={requiredStatement} defaultLabel={t('attribution')} />
          )}
          {
            rights && (
              <>
                <Typography variant="subtitle2" component="dt">{t('rights')}</Typography>
                { rights.map(v => (
                  <Typography variant="body1" component="dd">
                    <a target="_blank" rel="noopener noreferrer" href={v}>{v}</a>
                  </Typography>
                )) }
              </>
            )
          }
        </div>

        { manifestLogo && (
          <div className={classes.section}>
            <Img
              src={[manifestLogo]}
              alt=""
              role="presentation"
              className={classes.logo}
              unloader={
                <RectShape className={classes.placeholder} style={{ height: 60, width: 60 }} />
              }
            />
          </div>
        )}
      </CompanionWindow>
    );
  }
}

AttributionPanel.propTypes = {
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.string.isRequired,
  manifestLogo: PropTypes.string,
  requiredStatement: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  rights: PropTypes.arrayOf(PropTypes.string),
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

AttributionPanel.defaultProps = {
  classes: {},
  manifestLogo: null,
  requiredStatement: null,
  rights: null,
  t: key => key,
};
