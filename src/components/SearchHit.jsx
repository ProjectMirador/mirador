import { useCallback, useEffect, useMemo } from 'react';
import { useEffectEvent } from 'use-effect-event';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { withPlugins } from '../extend/withPlugins';
import TruncatedHit from '../lib/TruncatedHit';
import * as actions from '../state/actions';
import {
  getCanvasLabel,
  getResourceAnnotationForSearchHit,
  getResourceAnnotationLabel,
  getSelectedAnnotationId,
  getSelectedContentSearchAnnotationIds,
  getVisibleCanvasIds,
} from '../state/selectors';
import SearchHitItem from './SearchHitItem';

/** */
export function SearchHit({
  annotationId = undefined,
  announcer = undefined,
  companionWindowId = undefined,
  containerRef = undefined,
  focused = false,
  hit = { annotations: [] },
  index = undefined,
  showDetails = () => {},
  total = undefined,
  windowId,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const realAnnoId = annotationId || hit.annotations[0];
  const annotation = useSelector((state) =>
    getResourceAnnotationForSearchHit(state, {
      annotationUri: realAnnoId,
      companionWindowId,
      windowId,
    }),
  );
  const annotationLabelList = useSelector((state) =>
    getResourceAnnotationLabel(state, {
      annotationUri: realAnnoId,
      companionWindowId,
      windowId,
    }),
  );
  const selectedCanvasIds = useSelector((state) => getVisibleCanvasIds(state, { windowId }));
  const selectedContentSearchAnnotationIds = useSelector((state) =>
    getSelectedContentSearchAnnotationIds(state, {
      companionWindowId,
      windowId,
    }),
  );
  const windowSelectedAnnotationId = useSelector((state) => getSelectedAnnotationId(state, { windowId }));
  const canvasLabel = useSelector(
    (state) =>
      annotation &&
      getCanvasLabel(state, {
        canvasId: annotation.targetId,
        windowId,
      }),
  );

  const annotationLabel = annotationLabelList[0];
  const allAnnoIds = [annotationId, ...hit.annotations];
  const adjacent = selectedCanvasIds.includes(annotation?.targetId);
  const selected = Boolean(selectedContentSearchAnnotationIds[0] && allAnnoIds.includes(selectedContentSearchAnnotationIds[0]));
  const windowSelected = Boolean(windowSelectedAnnotationId && allAnnoIds.includes(windowSelectedAnnotationId));

  const selectAnnotation = useCallback((...args) => dispatch(actions.selectAnnotation(windowId, ...args)), [dispatch, windowId]);

  /** */
  const handleClick = () => {
    if (annotation && realAnnoId) selectAnnotation(realAnnoId);
  };

  const truncatedHit = useMemo(() => hit && hit.match && new TruncatedHit(hit, annotation), [hit, annotation]);

  /**
   * Pass content describing the hit to the announcer prop (intended for screen readers)
   */
  const announceHit = useEffectEvent(() => {
    if (!announcer || !truncatedHit) return;

    announcer(
      [
        t('pagination', { current: index + 1, total }),
        canvasLabel,
        annotationLabel,
        truncatedHit.before,
        truncatedHit.match,
        truncatedHit.after,
      ].join(' '),
      'polite',
    );
  });

  useEffect(() => {
    if (selected) {
      announceHit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  if (focused && !selected) return null;

  return (
    <SearchHitItem
      adjacent={adjacent}
      annotation={annotation}
      annotationLabel={annotationLabel}
      canvasLabel={canvasLabel}
      containerRef={containerRef}
      focused={focused}
      hit={hit}
      index={index}
      onMoreClick={showDetails}
      onSelect={handleClick}
      renderedHit={focused ? hit : truncatedHit}
      selected={selected}
      windowSelected={windowSelected}
    />
  );
}

SearchHit.propTypes = {
  annotationId: PropTypes.string,
  announcer: PropTypes.func,
  companionWindowId: PropTypes.string,
  containerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.instanceOf(Element) })]),
  focused: PropTypes.bool,
  hit: PropTypes.shape({
    after: PropTypes.string,
    annotations: PropTypes.arrayOf(PropTypes.string),
    before: PropTypes.string,
    match: PropTypes.string,
  }),
  index: PropTypes.number,
  showDetails: PropTypes.func,
  total: PropTypes.number,
  windowId: PropTypes.string.isRequired,
};

export default withPlugins('SearchHit')(SearchHit);
