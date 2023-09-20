import { Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Skeleton from '@mui/material/Skeleton';
import { Img } from 'react-image';
import CompanionWindow from '../containers/CompanionWindow';
import { LabelValueMetadata } from './LabelValueMetadata';
import ns from '../config/css-ns';
import { PluginHook } from './PluginHook';

const StyledLogo = styled(Img)(() => ({
  maxWidth: '100%',
}));

const StyledPlaceholder = styled(Skeleton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
}));

const StyledSection = styled('div')(() => ({
  borderBottom: '.5px solid',
  borderBottomColor: 'section_divider',
  paddingBottom: 1,
  paddingLeft: 2,
  paddingRight: 1,
  paddingTop: 2,
}));

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
      t,
    } = this.props;

    return (
      <CompanionWindow
        title={t('attributionTitle')}
        paperClassName={ns('attribution-panel')}
        windowId={windowId}
        id={id}
      >
        <StyledSection>
          { requiredStatement && (
            <LabelValueMetadata labelValuePairs={requiredStatement} defaultLabel={t('attribution')} />
          )}
          {
            rights && rights.length > 0 && (
              <dl className={ns('label-value-metadata')}>
                <Typography variant="subtitle2" component="dt">{t('rights')}</Typography>
                { rights.map(v => (
                  <Typography variant="body1" component="dd" key={v.toString()}>
                    <Link target="_blank" rel="noopener noreferrer" href={v}>
                      {v}
                    </Link>
                  </Typography>
                )) }
              </dl>
            )
          }
        </StyledSection>

        { manifestLogo && (
          <StyledSection>
            <StyledLogo
              src={[manifestLogo]}
              alt=""
              role="presentation"
              unloader={
                <StyledPlaceholder variant="rectangular" height={60} width={60} />
              }
            />
          </StyledSection>
        )}

        <PluginHook {...this.props} />
      </CompanionWindow>
    );
  }
}

AttributionPanel.propTypes = {
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
  manifestLogo: null,
  requiredStatement: null,
  rights: null,
  t: key => key,
};
