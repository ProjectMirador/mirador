import { render, screen, within } from '@testing-library/react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import { WindowThumbnailSettings } from '../../../src/components/WindowThumbnailSettings';

/** create wrapper */
function createWrapper(props) {
  return render(
    <WindowThumbnailSettings
      classes={{}}
      direction="ltr"
      windowId="xyz"
      setWindowThumbnailPosition={() => {}}
      thumbnailNavigationPosition="off"
      {...props}
    />,
  );
}

describe('WindowThumbnailSettings', () => {
  it('renders all elements correctly', () => {
    createWrapper();
    // eslint-disable-next-line
    screen.debug();
    expect(screen.getByRole('presentation', { selector: 'li' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /off/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /bottom/ })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: /right/ })).toBeInTheDocument();
  });
  it('for far-bottom it should set the correct label active (by setting the secondary color)', () => {
    createWrapper({ thumbnailNavigationPosition: 'far-bottom' });
    // eslint-disable-next-line
    screen.debug();
    expect(screen.getByRole('menuitem', { name: /bottom/ }).querySelector('svg')).toHaveClass('MuiSvgIcon-colorSecondary'); // eslint-disable-line testing-library/no-node-access
    expect(screen.getByRole('menuitem', { name: /right/ }).querySelector('svg')).not.toHaveClass('MuiSvgIcon-colorSecondary'); // eslint-disable-line testing-library/no-node-access
    expect(screen.getByRole('menuitem', { name: /off/ }).querySelector('svg')).not.toHaveClass('MuiSvgIcon-colorSecondary'); // eslint-disable-line testing-library/no-node-access
  });
  it('for far-right it should set the correct label active (by setting the secondary color)', () => {
    createWrapper({ thumbnailNavigationPosition: 'far-right' });
    // eslint-disable-next-line
    screen.debug();
    expect(screen.getByRole('menuitem', { name: /right/ }).querySelector('svg')).toHaveClass('MuiSvgIcon-colorSecondary'); // eslint-disable-line testing-library/no-node-access
    expect(screen.getByRole('menuitem', { name: /off/ }).querySelector('svg')).not.toHaveClass('MuiSvgIcon-colorSecondary'); // eslint-disable-line testing-library/no-node-access
    expect(screen.getByRole('menuitem', { name: /bottom/ }).querySelector('svg')).not.toHaveClass('MuiSvgIcon-colorSecondary'); // eslint-disable-line testing-library/no-node-access
  });
/*
  it('updates state when the thumbnail config selection changes', () => {
    const setWindowThumbnailPosition = jest.fn();
    const wrapper = createWrapper({ setWindowThumbnailPosition });

    wrapper.find(MenuItem).at(0).simulate('click');
    expect(setWindowThumbnailPosition).toHaveBeenCalledWith('xyz', 'off');
    wrapper.find(MenuItem).at(2).simulate('click');
    expect(setWindowThumbnailPosition).toHaveBeenCalledWith('xyz', 'far-right');
  });

  it('when rtl flips an icon', () => {
    const wrapper = createWrapper({ direction: 'rtl' });
    expect(wrapper.find(FormControlLabel).at(2).props().control.props.style).toEqual({ transform: 'rotate(180deg)' });
  });
  */
});
