import React from 'react';
import { shallow } from 'enzyme';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import WindowSideBarCanvasPanel from '../../../src/components/WindowSideBarCanvasPanel';

describe('WindowSideBarCanvasPanel', () => {
  let wrapper;
  const canvasesIdAndLabel = [
    {
      id: 'testid1',
      label: 'testLabel',
    },
    {
      id: 'testid2',
      label: 'testLabel2',
    },
  ];

  beforeEach(() => {
    wrapper = shallow(
      <WindowSideBarCanvasPanel
        canvasesIdAndLabel={canvasesIdAndLabel}
        classes={{}}
        t={key => key}
        windowId="xyz"
      />,
    ).dive();
  });

  it('renders all needed elements', () => {
    expect(wrapper.find(Typography).at(0).render().text()).toBe('canvasIndex');
    expect(wrapper.find(List).length).toBe(1);
    expect(wrapper.find(ListItem).length).toBe(canvasesIdAndLabel.length);
    expect(wrapper.find(List).find(Typography).length).toBe(canvasesIdAndLabel.length);
  });

  it('should set the correct labels', () => {
    expect(wrapper
      .find(List)
      .find(Typography)
      .at(0)
      .render()
      .text()).toBe(canvasesIdAndLabel[0].label);

    expect(wrapper
      .find(List)
      .find(Typography)
      .at(1)
      .render()
      .text()).toBe(canvasesIdAndLabel[1].label);
  });
});
