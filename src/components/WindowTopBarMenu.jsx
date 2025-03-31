import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/CloseSharp';
import classNames from 'classnames';
import ResizeObserver from 'react-resize-observer';
import { Portal } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WindowTopMenuButton from '../containers/WindowTopMenuButton';
import WindowTopBarPluginArea from '../containers/WindowTopBarPluginArea';
import WindowTopBarPluginMenu from '../containers/WindowTopBarPluginMenu';
import WindowTopBarTitle from '../containers/WindowTopBarTitle';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import FullScreenButton from '../containers/FullScreenButton';
import WindowMaxIcon from './icons/WindowMaxIcon';
import WindowMinIcon from './icons/WindowMinIcon';
import ns from '../config/css-ns';
import PluginContext from '../extend/PluginContext';

const IconButtonsWrapper = styled('div')({ display: 'flex' });
const InvisibleIconButtonsWrapper = styled(IconButtonsWrapper)({ visibility: 'hidden' });

/**
 * removeAttributes
 */
const removeAttributes = (attributes = [], node) => {
  if (!node) return;
  attributes.forEach(attr => node.removeAttribute?.(attr));
  node.childNodes?.forEach(child => removeAttributes(attributes, child));
};

/**
 * WindowTopBarMenu
 */
export function WindowTopBarMenu({
  removeWindow, windowId,
  maximizeWindow = () => {}, maximized = false, minimizeWindow = () => {},
  allowClose, allowMaximize, allowFullscreen, allowTopMenuButton,
}) {
  const { t } = useTranslation();
  const [outerW, setOuterW] = useState();
  const [visibleButtonsNum, setVisibleButtonsNum] = useState(0);
  const iconButtonsWrapperRef = useRef();
  const pluginMap = useContext(PluginContext);
  const portalRef = useRef();

  const buttons = [
    (pluginMap?.WindowTopBarPluginArea?.add?.length > 0 || pluginMap?.WindowTopBarPluginArea?.wrap?.length > 0)
      && <WindowTopBarPluginArea key={`WindowTopBarPluginArea-${windowId}`} windowId={windowId} />,
    allowTopMenuButton
      && <WindowTopMenuButton key={`WindowTopMenuButton-${windowId}`} windowId={windowId} className={ns('window-menu-btn')} />,
    allowMaximize
      && (
      <MiradorMenuButton
        key={`allowMaximizeMiradorMenuButton-${windowId}`}
        aria-label={t(maximized ? 'minimizeWindow' : 'maximizeWindow')}
        className={classNames(ns('window-maximize'), ns('window-menu-btn'))}
        onClick={maximized ? minimizeWindow : maximizeWindow}
      >
        {maximized ? <WindowMinIcon /> : <WindowMaxIcon />}
      </MiradorMenuButton>
      ),
    allowFullscreen
      && <FullScreenButton key={`FullScreenButton-${windowId}`} className={ns('window-menu-btn')} />,
  ].filter(Boolean);

  const visibleButtons = buttons.slice(0, visibleButtonsNum);
  const moreButtons = buttons.slice(visibleButtonsNum);
  const moreButtonAlwaysShowing = pluginMap?.WindowTopBarPluginMenu?.add?.length > 0
    || pluginMap?.WindowTopBarPluginMenu?.wrap?.length > 0;

  useEffect(() => {
    if (!portalRef.current || outerW === undefined) return;
    removeAttributes(['data-testid'], portalRef.current);
    const children = Array.from(portalRef.current.childNodes || []);
    let accWidth = 0;
    // sum widths of top bar elements until wider than half of the available space
    let newVisibleButtonsNum = children.reduce((count, child) => {
      const width = child?.offsetWidth || 0;
      accWidth += width;
      return accWidth <= outerW * 0.5 ? count + 1 : count;
    }, 0);

    if (!moreButtonAlwaysShowing && children.length - newVisibleButtonsNum === 1) {
      // when the WindowTopBarPluginMenu button is not always visible (== there are no WindowTopBarPluginMenu plugins)
      // and only the first button would be hidden away on the next render
      // (not changing the width, as the more button takes it's place), hide the first two buttons
      newVisibleButtonsNum = Math.max(children.length - 2, 0);
    }
    setVisibleButtonsNum(newVisibleButtonsNum);
  }, [outerW, moreButtonAlwaysShowing]);

  return (
    <>
      <Portal>
        <InvisibleIconButtonsWrapper ref={portalRef}>{buttons}</InvisibleIconButtonsWrapper>
      </Portal>
      <ResizeObserver
        // 96 to compensate for the burger menu button on the left and the close window button on the right
        onResize={({ width }) => setOuterW(Math.max(width - 96, 0))}
      />
      <WindowTopBarTitle windowId={windowId} />
      <IconButtonsWrapper ref={iconButtonsWrapperRef}>
        {visibleButtons}
        {(moreButtonAlwaysShowing || moreButtons.length > 0) && (
          <WindowTopBarPluginMenu windowId={windowId} moreButtons={moreButtons} />
        )}
        {allowClose && (
          <MiradorMenuButton
            aria-label={t('closeWindow')}
            className={classNames(ns('window-close'), ns('window-menu-btn'))}
            onClick={removeWindow}
          >
            <CloseIcon />
          </MiradorMenuButton>
        )}
      </IconButtonsWrapper>
    </>
  );
}

WindowTopBarMenu.propTypes = {
  allowClose: PropTypes.bool.isRequired,
  allowFullscreen: PropTypes.bool.isRequired,
  allowMaximize: PropTypes.bool.isRequired,
  allowTopMenuButton: PropTypes.bool.isRequired,
  maximized: PropTypes.bool,
  maximizeWindow: PropTypes.func,
  minimizeWindow: PropTypes.func,
  removeWindow: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
};
