import { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import AnnotationSettings from '../containers/AnnotationSettings';
import CanvasAnnotations from '../containers/CanvasAnnotations';
import CompanionWindow from '../containers/CompanionWindow';
import ns from '../config/css-ns';

const Section = styled('div')(({ theme }) => ({
  borderBottom: `.5px solid ${theme.palette.section_divider}`,
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(2),
}));
/**
 * WindowSideBarAnnotationsPanel ~
*/
export class WindowSideBarAnnotationsPanel extends Component {
  /** */
  constructor(props) {
    super(props);

    this.containerRef = createRef();
  }

  /**
   * Returns the rendered component
  */
  render() {
    const {
      annotationCount, canvasIds, t, windowId, id,
    } = this.props;
    return (
      <CompanionWindow
        title={t('annotations')}
        paperClassName={ns('window-sidebar-annotation-panel')}
        windowId={windowId}
        id={id}
        ref={this.containerRef}
        otherRef={this.containerRef}
        titleControls={<AnnotationSettings windowId={windowId} />}
      >
        <Section>
          <Typography component="p" variant="subtitle2">{t('showingNumAnnotations', { count: annotationCount, number: annotationCount })}</Typography>
        </Section>

        {canvasIds.map((canvasId, index) => (
          <CanvasAnnotations
            canvasId={canvasId}
            containerRef={this.containerRef}
            key={canvasId}
            index={index}
            totalSize={canvasIds.length}
            windowId={windowId}
          />
        ))}
      </CompanionWindow>
    );
  }
}

WindowSideBarAnnotationsPanel.propTypes = {
  annotationCount: PropTypes.number.isRequired,
  canvasIds: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.string.isRequired,
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
};

WindowSideBarAnnotationsPanel.defaultProps = {
  canvasIds: [],
  t: key => key,
};
